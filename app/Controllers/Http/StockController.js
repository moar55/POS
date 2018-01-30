'use strict'

const StockItem = use('App/Models/StockItem')
const R = use('App/Models/R')
const Order = use('App/Models/Order')
const Manufacturer = use('App/Models/Manufacturer')

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
    const updateObject = request.all()

    const rParams= await R.findBy('R', updateObject.R)
    const rUpdate = await R.findBy('R', params.R)
    params.R = rParams.id;
    updateObject.R = rUpdate.id;
    delete params['manufacturer_id']; delete params['price'];

    const quantity = updateObject.quantity;
    delete updateObject['quantity']

  //  Update R related values
    if(updateObject.manufacturer_id || updateObject.price) {
      let updateObjectClone = Object.assign({}, updateObject)
      Object.keys(updateObjectClone).forEach((key) => { // remove manufacturer_id and price from updateObject and keep them only in case of the clone (to update the R attrs)
        (key != 'manufacturer_id' && key != 'price')?delete updateObjectClone[key]:delete updateObject[key]
      })
    const r = await R
        .query()
        .where({id: updateObject.R})
        .update(updateObjectClone)
    }

  //  Update stock
    await StockItem
      .query()
      .where(params)
      .update(updateObject)

  // add or delete items from stock
    const count = await StockItem
      .query()
      .where(updateObject)
      .count()

    const diff = quantity - count[0]['count(*)']
    if(diff != 0) {
      if(diff > 0) {
        const objects = []
        objects.fill(updateObject)
        await StockItem.createMany(objects)
      }
      else {
        await StockItem
          .query()
          .where(updateObject)
          .delete()
      }
    }

    return response.send();
  }
}

module.exports = StockController
