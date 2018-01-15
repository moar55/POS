'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.post('api/login', 'UserController.login')

Route.post('api/logout', ({auth, response}) => {
  auth.logout()
  response.status(204).send()
})

Route.get('api/stock', 'StockController.fetch')
  .middleware('auth')

Route.post('api/stock', 'StockController.addItems')
  .middleware('auth')

Route.get('api/stock/:R', 'StockController.fetchGroupBy')
  .middleware('auth')


Route.get('api/r', 'RController.query')
  .middleware('auth')
