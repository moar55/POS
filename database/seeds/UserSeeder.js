'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')
const Hash = use('Hash')

class UserSeeder {
  async run () {
    // await Factory
    // .model('App/Models/User')
    // .create()
    const user = new User();
    user.username = 'dude'
    user.password = await Hash.make('superman')
    await user.save()
  }
}

module.exports = UserSeeder
