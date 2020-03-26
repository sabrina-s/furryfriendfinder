import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { LOGIN_API } from '../../api';

const validationSchema = Yup.object().shape({
  username: Yup.string().trim().required('Please enter username.'),
  password: Yup.string().required('Please enter password.')
})

function LoginPage({ setCurrentUser }) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  const handleLogin = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const username = values.username;
    const password = values.password;

    const options = {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }

    try {
      const loginResponse = await fetch(LOGIN_API, options);
      const body = await loginResponse.json();

      if (loginResponse.status === 200) {
        setCurrentUser(body.user);
        history.push('/');
      } else {
        setErrorMessage(body.message)
      }

      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
  }

  return (
    <div className='login-page'>
      <h3>Login</h3>

      <div>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {
            props => (
              <Form>
                <div className='form-field'>
                  <Field
                    type='text'
                    name='username'
                    placeholder='Username'
                    autoComplete='username'
                  />
                  <ErrorMessage name='username' component='span' className='form-field-error' />
                </div>

                <div className='form-field'>
                  <Field
                    type='password'
                    name='password'
                    placeholder='Password'
                    autoComplete='current-password'
                  />
                  <ErrorMessage name='password' component='span' className='form-field-error' />
                </div>

                <button type='submit' disabled={props.isSubmitting}>
                  Login
                </button>
              </Form>
            )
          }
        </Formik>
      </div>

      {
        errorMessage &&
        <p className='form-field-error'>{errorMessage}</p>
      }
    </div>
  )
};

export default LoginPage;
