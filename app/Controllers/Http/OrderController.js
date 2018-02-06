'use strict'

const Order = use('App/Models/Order')
const Manufacturer = use('App/Models/Manufacturer')
const {validateItems} = use('App/Helpers')
const Validator = use('Validator')

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
      items: 'required|array'
    }

    const validation = await Validator.validate(request.all(), rules)

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

    return  response.json({status: "success"})
  }

  async update({ request, response ,params }) {
    let params =  request.get()
    const updateObject = request.post()
    const order = Order.find(params.id)

  }
}

module.exports = OrderController
