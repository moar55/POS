'use strict'

const Model = use('Model')
const R = use('App/Models/R')

class StockItem extends Model {

  static get table() {
    return 'stock'
  }

  r () {
    return this.belongsTo('App/Models/R','R','id')
  }

  static async fetchGroupBy(param) {
    let r
    try {
     r = await R.findByOrFail('R', param)
    }
    catch(e) {
      if (e.constructor.name == "ModelNotFoundException")
         throw 'not found'
    }

    const price = r.price
    try {
      const manufacturer = await (await r.manufacturer())[0].name

      const groups = await this
        .query()
        .select( 'color', 'size')
        .innerJoin('rtkls', 'stock.R', 'rtkls.id')
        .innerJoin('manufacturers', 'rtkls.manufacturer_id', 'manufacturers.id')
        .groupBy('rtkls.R','color', 'size')
        .having('rtkls.R','=',param)
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
      .select('rtkls.R','price', 'manufacturers.name as manufacturer')
      .innerJoin('rtkls', 'stock.R', 'rtkls.id')
      .innerJoin('manufacturers', 'rtkls.manufacturer_id', 'manufacturers.id')
      .groupBy('R','price','manufacturers.name')
      .count('* as quantity')
  }

}

module.exports = StockItem
