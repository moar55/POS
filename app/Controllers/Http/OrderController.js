'use strict'

const Order = use('App/Models/Order')

class OrderController {

  async fetch({response, view, auth}) {
    let orders =  await Order.all();

    orders = orders
      .rows.map((order) => {
          order.items = JSON.parse(order.items)
          return order
      })
    return orders
  }
}

module.exports = OrderController
