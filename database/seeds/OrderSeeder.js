'use strict'

/*
|--------------------------------------------------------------------------
| OrderSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Manufacturer = use('App/Models/Manufacturer')

class OrderSeeder {
  async run () {
    const manufacturersParams = [{name: 'Crocs'}, {name: 'Nike'}, {name: 'Zalat'}]
    const manufacturers = await Manufacturer.createMany(manufacturersParams)

    await Factory
    .model('App/Models/Order')
    .create()
  }
}

module.exports = OrderSeeder
