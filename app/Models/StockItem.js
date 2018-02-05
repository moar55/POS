'use strict'

const Model = use('Model')
const Product = use('App/Models/Product')

class StockItem extends Model {

  static get table() {
    return 'stock'
  }

  product () {
    return this.belongsTo('App/Models/Product','R','id')
  }

  order () {
    return this.belongsTo('App/Models/Order')
  }

  static async fetchGroupBy(param) {
    let r
    try {
     r = await Product.findByOrFail('R', param)
    }
    catch(e) {
      if (e.constructor.name == "ModelNotFoundException")
         throw 'not found'
    }

    const price = r.price
    try {
      const manufacturer = await(await r.manufacturer().fetch()).name
      const groups = await this
        .query()
        .select( 'color', 'size')
        .innerJoin('products', 'stock.R', 'products.id')
        .innerJoin('manufacturers', 'products.manufacturer_id', 'manufacturers.id')
        .groupBy('products.R','color', 'size')
        .having('products.R','=',param)
        .count('* as quantity')

      let resp = {R: param, price: price, manufacturer: manufacturer, groups: groups}
      return resp
    } catch (e) {
        throw 'server error'
    } finally {

    }

  }

  static async fetch() {
    return await this
      .query()
      .select('products.R','price', 'manufacturers.name as manufacturer')
      .innerJoin('products', 'stock.R', 'products.id')
      .innerJoin('manufacturers', 'products.manufacturer_id', 'manufacturers.id')
      .groupBy('R','price','manufacturers.name')
      .count('* as quantity')
  }

}

module.exports = StockItem
