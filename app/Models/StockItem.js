'use strict'

const Model = use('Model')
const Database = use('Database')

class StockItem extends Model {

  static get table() {
    return 'stock'
  }

  r () {
    return this.belongsTo('App/Models/R','R','id')
  }

  static async  fetchGroupBy(param) {
    param = param || "*"
    return await this
    .query()
    .select('rtkls.R','price','manufacturers.name as manufacturer', 'color', 'size')
    .innerJoin('rtkls', 'stock.R', 'rtkls.id')
    .innerJoin('manufacturers', 'rtkls.manufacturer_id', 'manufacturers.id')
    .groupBy('rtkls.R','price','manufacturers.name', 'color', 'size')
    .having('rtkls.R','=',param)
    .count('* as quantity')
  }

  static async fetch() {
    return await this
      .query()
      .select('rtkls.R','price', 'manufacturers.name as manufacturer')
      .innerJoin('rtkls', 'stock.R', 'rtkls.id')
      .innerJoin('manufacturers', 'rtkls.manufacturer_id', 'manufacturers.id')
      .groupBy('R','price','manufacturers.name')
      .count('* as quantity')
  }

}

module.exports = StockItem
