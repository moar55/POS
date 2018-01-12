'use strict'

const StockItem = use('App/Models/StockItem')
const R = use('App/Models/R')

class StockController {

  async fetch({response, view}) {
    let items =  await StockItem.fetch()
    view.share({
      items: items
    })
    return view.render('stock')
  }

  async query({request, response}) {
    let param = request.get().q
    
    try {
      return await R
        .query()
        .select('R')
        .where('R','LIKE',`${param}%`)
    } catch (e) {
      return response.status(500).json({err: "server error"})
    }
  }

  async fetchGroupBy({ request, response, params }) {
       try {
         return await StockItem.fetchGroupBy(params.R)
       } catch (e) {
         if (e == "not found")
          return response.status(404).json({err: e})
         else
          return response.status(500).json({err: e})
       }
  }
}

module.exports = StockController
