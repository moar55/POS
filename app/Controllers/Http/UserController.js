'use strict'

class UserController {

  async login ({ request, auth, response, session}) {
    const { username, password } = request.all()

    try {
      await auth.attempt(username, password)

    } catch (e) {
      session
          .withErrors({credentials: 'Wrong username or password'})
          .flashExcept()
    } finally {
      return response.redirect('back');
    }
  }
}

module.exports = UserController
