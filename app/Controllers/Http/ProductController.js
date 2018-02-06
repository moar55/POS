'use strict'

const Product = use('App/Models/Product')

class RController {

  async fetch({request, response}) {
    const products = await Product.query().with('manufacturer').fetch()
    return response.json({status: "success", data: products})
  }

  async query({request, response}) {

    let param = request.get().q

    if (!request.get().hasOwnProperty('q')) {
      return response.status(401).json({status: 'error', message: "wrong format, please add ?q=<query>"})
    }

    try {
        return await Product
        .query()
        .select('R')
        .where('R','LIKE',`${param}%`)
    } catch (e) {
      return response.status(500).json({status: 'error', message: "server error"})
    }
  }

async edit({ request, response, params }) {
    // /* HACK: */ const fields = JSON.parse(JSON.stringify(request.all().update).replace('manufacturer', 'manufacturer_id'))
    try {
      const product = await Product
        .query()
        .where('R', params.R)
        .update(request.all().update)
        console.log(product);
        if(product == 0) throw 'R. not found'
      return response.json({success: true})
    } catch (e) {
        if(e == 'R. not found')
          return response.status(404).json({success: false, message: e})
        return response.status(500).json({success: false, message: 'server error'})
    }
  }
}

module.exports = RController
