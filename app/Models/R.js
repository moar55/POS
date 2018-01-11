'use strict'

const Model = use('Model')
const Database = use('Database')

class R extends Model {
  static get table() {
    return 'rtkls'
  }

  static async query(param) {
    return await Database
      .select('R')
      .from('rtkls')
      .where('R', 'LIKE', `${param}%`)
  }
}

module.exports = R
