'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')
const Product = use('App/Models/Product')

const Hash = use('Hash')
  Factory.blueprint('App/Models/User', async (faker) => {
    return {
      username: 'dude',
      password: 'superman'
    }
  })

  function range(start, end) {
    start = Math.ceil(start);
    end = Math.floor(end);
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }

  Factory.blueprint('App/Models/Order', async (faker) => {
    return {
      manufacturer_id: range(1,4),
      cost: 0
    }
  })


Factory.blueprint('App/Models/StockItem', async (faker) => {
  const colors = [
    'blue',
    'green',
    'red',
    'black'
  ]

  const products =["0210","0219","0215","0217","0213","0211", "0218","0215","0214"]

    const product = await Product.findBy('R', products[range(0, products.length - 1)])
    return {
      R: product.id,
      color: colors[range(0, colors.length - 1)],
      size: range(17,37)
    }
})
