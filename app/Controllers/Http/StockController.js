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

  async query({request, resonse}) {
    let param = request.get().q
    return await R
      .query()
      .select('R')
      .where('R','LIKE',`${param}%`)
  }

  async fetchGroupBy({ request, response, params }) {
    return StockItem.fetchGroupBy(params.R)
  }
}

module.exports = StockController
