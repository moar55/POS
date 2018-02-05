// 'use strict'
//
// /*
// |--------------------------------------------------------------------------
// | OrderSeeder
// |--------------------------------------------------------------------------
// |
// | Make use of the Factory instance to seed database with dummy data or
// | make use of Lucid models directly.
// |
// */
//
// const Factory = use('Factory')
// const Manufacturer = use('App/Models/Manufacturer')
//
// class OrderSeeder {
//   async run () {
//     await Manufacturer.findOrCreate({name: 'Crocs'})
//     await Manufacturer.findOrCreate({name: 'Nike'})
//     await Manufacturer.findOrCreate({name: 'Zalat'})
//
//     const order = await Factory.model('App/Models/Order').create()
//     const items = await Factory.model('App/Models/StockItem').makeMany(100)
//     const res = await order.items().saveMany(items)
//     let cost = 0
//     for (let item of items) {
//       let product = await item.product().fetch()
//       cost += product.price
//     }
//     order.cost = cost
//     await order.save()
//   }
// }
//
// module.exports = OrderSeeder
