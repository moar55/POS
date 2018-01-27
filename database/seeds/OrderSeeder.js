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
    await Manufacturer.findOrCreate({name: 'Crocs'})
    await Manufacturer.findOrCreate({name: 'Nike'})
    await Manufacturer.findOrCreate({name: 'Zalat'})

    await Factory
    .model('App/Models/Order')
    .createMany('5')
  }
}

module.exports = OrderSeeder
