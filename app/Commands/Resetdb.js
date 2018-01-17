'use strict'

const ace = require('@adonisjs/ace')
const Command = ace.Command

class Resetdb extends Command {
  static get signature () {
    return 'resetdb'
  }

  static get description () {
    return 'Drops and Creates tables'
  }

  async handle (args, options) {
    ace.call('migration:run')
  }
}

module.exports = Resetdb
