'use strict'

const Product = use('App/Models/Product')
const Validator = use('Validator')

class ProductController {

  async fetch({request, response}) {
    const products = await Product.query().with('manufacturer').fetch()
    return response.json({status: "success", data: products})
  }

  async fetchByID({request, response, params}) {
    const product = await Product.query().where('R',params.R).with('manufacturer').fetch()
    return response.json({data: product.rows[0]}) // TODO: vaildation! and add status
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
        .update(request.all())
        if(product == 0) throw 'R. not found'
      return response.json({success: true})
    } catch (e) {
        if(e == 'R. not found')
          return response.status(404).json({status: 'error', message: e})
        return response.status(500).json({status: 'error', message: 'server error'})
    }
  }

async delete({request, response, params}) {
  const rules = {
    R: 'required|string'
  }

  const validation = await Validator.validate(params, rules)

  if (validation.fails()){
    return response.status(400).json({status: "error", message: "R required"})
  }
  try {
    const product = await Product.findByOrFail('R', params.R)
    await product.delete()
    return response.json({status: "success"})

  } catch (e) {
    if(e.name =='ModelNotFoundException')
      return response.json({status: "error", message: "item not found"})
    return response.status(500).json({status: 'error', message: 'server error'})
    }
  }
}

module.exports = ProductController
