'use strict'

const StockItem = use('App/Models/StockItem')
const R = use('App/Models/R')
const Order = use('App/Models/Order')
const Validator = use('Validator')


class StockController {

  async fetch({response, view}) {
    if(!auth.check())
      return await response.status(401).json({status: 'error', message: 'Unauthorized'})
    let items;
    try {
      items = await StockItem.fetch()
      return await response.json({status: 'success', data: items})
    } catch(e){
      return response.status(500).json({status: 'error', message: "server error" + e})
    }
  }

  static async validateItems(items, response) {
    const rules = {
      price: 'required',
      color: 'required|string',
      size: 'required|integer|range:16,38'
    }
    for (let item of items) {
      console.log(item);
      let validation = await Validator.validate(item, rules)
      if (validation.fails()){
        return  new Promise(function(resolve, reject) {
          resolve({status: "error", type: "validation", validation_error: validation.messages()})
        });
      }
    }
  }


  async fetchGroupBy({ request, response, params }) {
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

  async addItems({ request, response}) {
    const requestObject = request.all()

    const rules = {
      manufacturer: 'required|integer',
      cost: 'required',
      items: 'required|array'
    }

    const validation = await Validator.validate(request.all(), rules)

    if (validation.fails()){
      return response.status(400).json({status: "error", type: "validation", validation_error: validation.messages()})
    }

    const manufacturer = requestObject.manufacturer;
    const cost = requestObject.cost;
    const items = requestObject.items;

    let notValid = await  StockController.validateItems(items, response)

    if(notValid)
       return response.status(400).json(notValid)

    const order = new Order()
    order.manufacturer_id = manufacturer, order.cost = cost, order.items = JSON.stringify(items)
    await order.save()
    for (let item of items) {
        const r = await R.findOrCreate({R: item.R, manufacturer_id: manufacturer, price: item.price})  // add R. if it doesn't exist
        const stockItem = await StockItem.create({color: item.color, R: r.id, size: item.size, order_id: order.id})
      }
    return  response.json({status: "success"})
  }
}

module.exports = StockController
