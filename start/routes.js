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
const Helpers = use('Helpers')
const StockItem = use('App/Models/StockItem')
const Order = use('App/Models/Order')

// Route.get('/*', ({ request, response}) => {
//   console.log(Helpers.resourcesPath(`../client/ngPOS/dist/index.html`))
//   response.download(Helpers.resourcesPath(`../client/ngPOS/dist/index.html`))
// })


Route.get('/api', ({ request, response}) => {
  response.download(Helpers.resourcesPath(`../public/doc/index.html`))
})

/**
 * @api {post} /api/login
 * @apiDescription User Login
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 * @apiParamExample {json} Login Request-Example:
                 { "username": "7amo2a", password: "verysecretpass" }
 * @apiError Unauthorized {Object} 401
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
*     {
*       "status": "error",
*       "message": "wrong username or password"
*     }
* @apiSuccess {Object} status       Api status (success in this case).
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "status": "success"
*     }
 */

/**
 * User Login
 *
 * @section User
 * @type post
 * @url /api/login
 * @param {string} username
 * @param {string} password
 */
Route.post('api/login', 'UserController.login')


Route.get('api/manufacturers', 'ManufacturerController.fetch').middleware('auth')
Route.post('api/manufacturers', 'ManufacturerController.add').middleware('auth')

Route.get('/test', async ({response}) => {
  const items = await StockItem.
    query()
    .where('order_id', '=', 76)
    .fetch()//findBy('order_id', 76)
  const order = await Order.find(76)
  order.items = JSON.stringify(items)
  await order.save()
  response.send('hey')
})

Route.get('/test2', async ({response}) => {
    Order
      .query()
      .update({37: "nop"})
      .where('id',37)
  // response.send(order)
})


/**
 * User Logout
 *
 * @section User
 * @type post
 * @url /api/logout
 */
Route.post('api/logout', ({auth, response}) => {
  auth.logout()
  response.status(204).send()
})

/**
 * Get List of items in stock
 *
 * @section Stock
 * @type get
 * @url /api/stock
 */
Route.get('api/stock', 'StockController.fetch').middleware('auth')
Route.put('api/stock', 'StockController.update').middleware('auth')

// Route.put('api/stock/', 'StockController.edit')


Route.get('api/stock/:R', 'StockController.fetchGroupBy').middleware('auth')

Route.get('api/products', 'ProductController.query').middleware('auth')
Route.get('api/products/all', 'ProductController.fetch').middleware('auth')
Route.get('api/products/:R', 'ProductController.fetchByID').middleware('auth')
Route.put('api/products/:R', 'ProductController.edit').middleware('auth')
Route.delete('api/products/:R', 'ProductController.delete').middleware('auth')

Route.get('api/orders', 'OrderController.fetch').middleware('auth')
Route.get('api/orders/:id', 'OrderController.fetchByID').middleware('auth')

/**
 * Add a new order
 *
 * @section Orders
 * @type post
 * @param {number} manufacturer
 * @param {string} password
 * @url /api/stock
 */
Route.post('api/orders', 'OrderController.addOrder').middleware('auth')
Route.put('api/orders/:id', 'OrderController.update').middleware('auth')
Route.delete('api/orders/:id', 'OrderController.delete').middleware('auth')
