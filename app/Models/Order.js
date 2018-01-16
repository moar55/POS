'use strict'

const Model = use('Model')

class Order extends Model {

  static get table() {
    return 'orders'
  }

}

module.exports = Order
