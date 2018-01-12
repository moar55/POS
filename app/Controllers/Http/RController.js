'use strict'

const R = use('App/Models/R')

class RController {

  async query({request, response}) {
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
}

module.exports = RController
