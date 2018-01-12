'use strict'

const Model = use('Model')
const Database = use('Database')

class R extends Model {
  static get table() {
    return 'rtkls'
  }

  manufacturer() {
    return this.belongsTo('App/Models/Manufacturer')
  }

  static async q(param) {
    return await Database
      .select('R')
      .from('rtkls')
      .where('R', 'LIKE', `${param}%`)
  }
}

module.exports = R
