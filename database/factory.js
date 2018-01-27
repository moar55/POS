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
    let items = []
    const R =[
      {R: "0210", price: 500},
      {R: "0219", price: 600},
      {R: "0215", price: 700},
      {R: "0217", price: 800},
      {R: "0213", price: 900},
      {R: "0211", price: 1100},
      {R: "0218", price: 500},
      {R: "0215", price: 600},
      {R: "0214", price: 400}
    ]

    const colors = [
      'blue',
      'green',
      'red',
      'black'
    ]

    let cost = 0;
    for (var i = 0; i < 200; i++) {
      let r = R[range(0, R.length - 1)]
      items.push({R: r.R, price: r.price, color: colors[range(0, colors.length - 1)], size: range(17,37)})
      cost += r.price;
    }
    return {
      manufacturer_id: range(1,4),
      cost: cost,
      items: JSON.stringify(items)
    }
  })
