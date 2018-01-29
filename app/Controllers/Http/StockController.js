'use strict'

const StockItem = use('App/Models/StockItem')
const R = use('App/Models/R')
const Order = use('App/Models/Order')

class StockController {

  async fetch({response, view, auth}) {
    // try {
    //   await auth.check()
    // } catch(err) {
    //   return await response.status(401).json({status: 'error', message: 'Unauthorized'})
    // }
    let items;
    try {
      items = await StockItem.fetch()
      return await response.json({status: 'success', data: items})
    } catch(e){
      return response.status(500).json({status: 'error', message: "server error" + e})
    }
  }


  async fetchGroupBy({ request, response, params, auth}) {
    // try {
    //   await auth.check()
    // } catch(err) {
    //   return await response.status(401).json({status: 'error', message: 'Unauthorized'})
    // }
       try {
         const query =  await StockItem.fetchGroupBy(params.R)
         return await {status: 'success', data: query}
       } catch (e) {
         if (e == "not found")
          return response.status(404).json({status: 'error', message: e})
         else
          return response.status(500).json({status: 'error', message: e})
       }
  }

  async update({ request, response}) {
    let params = request.get()
    const reqParams = request.all()

    if (params.R != reqParams.R) {
      const r = await R.findBy('R', reqParams.R)
      const paramsTemp = Object.assign({}, params)
      delete paramsTemp['manufacturer']; delete paramsTemp['price'];
      await StockItem
        .query()
        .where(paramsTemp)
        .update()
    }


    let paramsClone =  Object.assign({}, params)
    Object.keys(paramsClone).forEach((key) => {
      paramsClone[`rtkls.${key}`] = paramsClone[key]
      delete paramsClone[key]
    })
    (params.R != reqParams.R)?paramsClone.R = reqParams.R: paramsClone = paramsClone
    delete paramsClone['manufacturer']; delete paramsClone['price'];

    const count = await StockItem
      .query()
      .innerJoin('rtkls', 'stock.R', 'rtkls.id')
      .where(paramsClone)
      .count()

    const diff = reqParams - count[0]['count(*)']
    if(diff != 0) {
      if(diff > 0) {
        const objects = []
        for (var i = 0; i < diff; i++) {
          objects.push({color: reqParams.color, size: reqParams.size, R: r.id})
        }
        await StockItem.createMany(objects)
      }
      else {
        await StockItem
          .query()
          .innerJoin('rtkls', 'stock.R', 'rtkls.id')
          .where(paramsClone)
          .delete()
      }
    }




    return response.send();
  }
}

module.exports = StockController
