'use strict'

const Order = use('App/Models/Order')
const Manufacturer = use('App/Models/Manufacturer')
const {validateItems} = use('App/Helpers')
const Validator = use('Validator')
const Product = use('App/Models/Product')
const StockItem = use('App/Models/StockItem')

class OrderController {

  async fetch({response, view, auth}) {

    let orders =
    await Order
      .query()
      .select('orders.*', 'manufacturers.name as manufacturer')
      .innerJoin('manufacturers', 'manufacturers.id', 'orders.manufacturer_id')

    orders = orders.map((order) => {
          order.items = undefined;
          return order
    })
    return orders
  }

  async fetchByID({ response, request, params}) {
    const order = await Order
      .query()
      .with('manufacturer')
      .with('items')
      .where('orders.id', '=', params.id)
      .fetch()
      response.json({status: "success", data: order})
  }

  async addOrder({ request, response, auth}) {

    const requestObject = request.all()

    const rules = {
      manufacturer_id: 'required|integer',
      cost: 'required',
      items: 'required|array',
    }

    const validation = await Validator.validate(request.post(), rules)

    if (validation.fails()){
      return response.status(400).json({status: "error", type: "validation", validation_error: validation.messages()})
    }

    const manufacturer_id = requestObject.manufacturer_id;
    const cost = requestObject.cost;
    const items = requestObject.items;
    const date = requestObject.date


    let notValid = await validateItems(items, response)

    if(notValid)
       return response.status(400).json(notValid)

    const order = new Order()
    order.manufacturer_id = manufacturer_id, order.cost = cost
    await order.save()


    for (let item of items) {
      for (var i = 0; i < item.quantity; i++) {
        const product = await Product.findOrCreate({R: item.R}, {R: item.R, manufacturer_id: order.manufacturer_id, price: item.price})  // add R. if it doesn't exist
        const sizes = item.sizes
        for (let size of sizes) {
          const stockItem = await StockItem.create({color: item.color, R: product.id, size: size, order_id: order.id})
        }
      }
    }
    return  response.json({status: "success"})
  }

  async update({ request, response ,params }) {
    let params =  request.get()
    const updateObject = request.post()
    const order = Order.find(params.id)
  }

  async delete ({request, response, params}) {
    const rules = {
      id: 'required|string'
    }

    const validation = await Validator.validate(params, rules)
    if (validation.fails()){
      return response.status(400).json({status: "error", message: "id required"})
    }
    try {
      const order = await Order.findOrFail(params.id)
      await order.delete()
      return response.json({status: "success"})
    } catch (e) {
      if(e.name =='ModelNotFoundException')
        return response.json({status: "error", message: "item not found"})
      return response.status(500).json({status: 'error', message: 'server error'})
      }
  }
}

module.exports = OrderController
