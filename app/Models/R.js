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

}

module.exports = R
