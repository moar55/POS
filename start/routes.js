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

// Route.get('/*', ({ request, response}) => {
//   console.log(Helpers.resourcesPath(`../client/ngPOS/dist/index.html`))
//   response.download(Helpers.resourcesPath(`../client/ngPOS/dist/index.html`))
// })



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
Route.get('api/stock', 'StockController.fetch')
  .middleware('auth')

  /**
   * Add Items to stock
   *
   * @section Stock
   * @type post
   * @param {number} manufacturer
   * @param {string} password
   * @url /api/stock
   */
Route.post('api/stock', 'StockController.addItems')
  .middleware('auth')

Route.get('api/stock/:R', 'StockController.fetchGroupBy')
  .middleware('auth')


Route.get('api/r', 'RController.query')
  .middleware('auth')

  Route.get('/*', ({ request, response}) => {
    response.download(Helpers.resourcesPath(`../public/doc/index.html`))
  })
