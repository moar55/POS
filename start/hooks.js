const { hooks } = require('@adonisjs/ignitor')
const Validator = use('Validator')

hooks.after.providersBooted(() => {
  const Exception = use('Exception')

  Exception.handle('InvalidSessionException', async (error, { response, session }) => {
    return response.status(401).json({status:'error', message: 'you need to be logged in!'})
  })

  const shoesizeFn =  (data, field, message, args, get) => {
    console.log('hello');
    if(value < 17 || value > 38)
      console.log('wow');
  }

  Validator.extend('shoe-size', shoesizeFn)

})
