'use strict'

const StockItem = use('App/Models/StockItem')

class StockController {

  async fetch({response, view}) {
    let items;
    try {
      items = await StockItem.fetch()
      return await response.json({status: 'success', data: items})
    } catch(e){
      return response.status(500).json({status: 'error', message: "server error" + e})
    }
  }


  async fetchGroupBy({ request, response, params }) {
       try {
         const query =  await StockItem.fetchGroupBy(params.R)
         return await {status: 'success', data: query}
       } catch (e) {
         if (e == "not found")
          return response.status(404).json({status: 'error', message: e})
         else
          return response.status(500).json({status: 'error', message: e})
       }
  }
}

module.exports = StockController
