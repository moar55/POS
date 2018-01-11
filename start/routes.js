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

Route.on('/').render('landing')

Route.post('login', 'UserController.login')

Route.get('logout', ({auth, response}) => {
  auth.logout()
  response.redirect('/')
})

Route.get('api/stock', 'StockController.query')

Route.get('stock', 'StockController.fetch')
     .middleware('auth')
