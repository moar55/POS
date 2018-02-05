// 'use strict'
//
// const OrderHook = exports = module.exports = {}
// const StockItem = use('App/Models/StockItem')
// const Product = use('App/Models/Product')
//
//
// OrderHook.updateStock = async (modelInstance) => {
//   modelInstance = modelInstance.$attributes
//   let items = JSON.parse(modelInstance.items)
//   for (let item of items) {
//     console.log(item);
//       const product = await Product.findOrCreate({R: item.R}, {R: item.R, manufacturer_id: modelInstance.manufacturer_id, price: item.price})  // add R. if it doesn't exist
//       const stockItem = await StockItem.create({color: item.color, R: product.id, size: item.size, order_id: modelInstance.id})
//     }
// }
