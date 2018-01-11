'use strict'

const Model = use('Model')
const Database = use('Database')

class StockItem extends Model {

  static get table() {
    return 'stock'
  }

  r () {
    return this.hasOne('App/Models/R')
  }

  static async  fetchGroupBy() {
    return await Database
      .select('rtkls.R', 'color', 'size','rtkls.price')
      .from('stock')
      .innerJoin('rtkls', 'stock.R', 'rtkls.id')
      .groupBy('rtkls.R','size', 'color', 'rtkls.price')
      .count('* as quantity')
  }

  static async fetch() {
    return await  Database
      .select('rtkls.R','price', 'manufacturers.name as manufacturer')
      .from('stock')
      .innerJoin('rtkls', 'stock.R', 'rtkls.id')
      .innerJoin('manufacturers', 'rtkls.manufacturer', 'manufacturers.id')
      .groupBy('R','price','manufacturers.name')
      .count('* as quantity')
  }

}

module.exports = StockItem
