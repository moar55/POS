'use strict'
const Manufacturer = use('App/Models/Manufacturer')

class ManufacturerController {

  async add({ request, response}) {
    const manufacturer = new Manufacturer()
    if(!request.all().name)
      return response.status(400).json({status: "error", message: "name field required"})
    manufacturer.name = request.all().name
    try{
      await manufacturer.save()
      return response.json({status: "success", message: "success"})
    } catch(e) {
      response.status(500).json({status: "error", message: "server error" + e})
    }
  }
  async fetch({ request, response }) {
    const manufacturers =  await Manufacturer.all();
    return response.json({status: "success", data: manufacturers})
  }
}

module.exports = ManufacturerController
