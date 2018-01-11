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
    return await R.query(request.get().q)
  }
}

module.exports = StockController
