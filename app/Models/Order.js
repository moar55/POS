'use strict'

const Model = use('Model')

class Order extends Model {

  static boot () {
    super.boot()
    this.addHook('afterCreate', 'OrderHook.updateStock')
  }

  static get table() {
    return 'orders'
  }

  manufacturer () {
    return this.hasOne('App/Models/Manufacturer', 'orders.manufacturer_id', 'manufacturers.id')
  }

}

module.exports = Order
