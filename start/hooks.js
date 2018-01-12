const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Exception = use('Exception')

  Exception.handle('InvalidSessionException', async (error, { response, session }) => {
    return response.status(401).json({status:'error', message: 'you need to be logged in!'})
  })
})
