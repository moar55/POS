'use strict'

const R = use('App/Models/R')

class RController {

  async query({request, response}) {
    // try {
    //   await auth.check()
    // } catch(err) {
    //   return await response.status(401).json({status: 'error', message: 'Unauthorized'})
    // }
    let param = request.get().q

    if (!request.get().hasOwnProperty('q')) {
      return response.status(401).json({status: 'error', message: "wrong format, please add ?q=<query>"})
    }

    try {
        return await R
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
      const r = await R
        .query()
        .where('R', params.R)
        .update(request.all().update)
        console.log(r);
        if(r == 0) throw 'R. not found'
      return response.json({success: true})
    } catch (e) {
        if(e == 'R. not found')
          return response.status(404).json({success: false, message: e})
        return response.status(500).json({success: false, message: 'server error'})
    }
  }
}

module.exports = RController
