import React from 'react';

function LoginPage() {
  function handleLogin (e) {
    e.preventDefault()
    console.log('logging in...')

    const username = e.target.username.value
    const password = e.target.password.value

    const url = 'http://localhost:5000/api/users/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type:': 'application/json'
      },
      credentials: 'include'
    }

    e.target.reset()

    // TODO
    // fetch(url, options)
    //   .then(response => {
    //     console.log('response', response);
    //   })
    //   .catch(console.error)
  }

  return (
    <div className='login-page'>
      <h3>Login</h3>

      <div>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type='text'
              name='username'
              placeholder='Username'
            />
          </label>

          <label>
            Password:
            <input
              type='password'
              name='password'
              placeholder='Password'
            />
          </label>

          <input
            type='submit'
            value='Login'
            onClick={() => handleLogin}
          />
        </form>
      </div>
    </div>
  )
};

export default LoginPage;
