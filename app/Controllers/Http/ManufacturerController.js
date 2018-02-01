'use strict'
const Manufacturer = use('App/Models/Manufacturer')

class ManufacturerController {
  async fetch({ request, response }) {
    const manufacturers =  await Manufacturer.all();
    return response.json({status: "success", data: manufacturers})
  }
}

module.exports = ManufacturerController
