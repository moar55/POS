'use strict'

const OrderHook = exports = module.exports = {}
const StockItem = use('App/Models/StockItem')
const R = use('App/Models/R')

const OrderHook = module.exports = {}


OrderHook.updateStock = async (modelInstance) => {
  console.log('helllllo');
  let items = JSON.parse(modelInstance.items)
  for (let item of items) {
      const r = await R.findOrCreate({R: item.R, manufacturer_id: manufacturer, price: item.price})  // add R. if it doesn't exist
      const stockItem = await StockItem.create({color: item.color, R: r.id, size: item.size, order_id: order.id})
    }
}
