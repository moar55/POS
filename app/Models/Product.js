'use strict'

const Model = use('Model')
const Database = use('Database')

class Product extends Model {

  manufacturer() {
    return this.belongsTo('App/Models/Manufacturer')
  }

}

module.exports = Product
