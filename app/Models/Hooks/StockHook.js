'use strict'

const StockHook = exports = module.exports = {}

const Product = use('App/Models/Product')
const Order = use('App/Models/Order')

// StockHook.updateOrderCost = async (modelInstance) => {
//   const product = await modelInstance.product()
//   const order = await modelInstance.order()
//   await Order
//     .query()
//     .where('id',order.id)
//     .update({cost: (order.price + product.price)})
// }
