'use strict'
const Manufacturer = use('App/Models/Manufacturer')

class ManufacturerController {
  async fetch({ request, response }) {
    return await Manufacturer.all();
  }
}

module.exports = ManufacturerController
