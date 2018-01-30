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

    console.log(orders);
    orders = orders.map((order) => {
          order.items = JSON.parse(order.items)
          return order
    })
    return orders
  }

  async addOrder({ request, response, auth}) {
    // try {
    //   await auth.check()
    // } catch(err) {
    //   return await response.status(401).json({status: 'error', message: 'Unauthorized'})
    // }
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

    const manufacturer = requestObject.manufacturer;
    const cost = requestObject.cost;
    const items = requestObject.items;

    let notValid = await validateItems(items, response)

    if(notValid)
       return response.status(400).json(notValid)

    const order = new Order()
    order.manufacturer_id = manufacturer_id, order.cost = cost, order.items = JSON.stringify(items)
    await order.save()

    return  response.json({status: "success"})
  }
}

module.exports = OrderController
