'use strict'

const Model = use('Model')

class Order extends Model {


  static get table() {
    return 'orders'
  }

  manufacturer () {
    return this.belongsTo('App/Models/Manufacturer')
  }

  items() {
    return this.hasMany('App/Models/StockItem')
  }

}

module.exports = Order
