import React from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().trim().required('Please enter username.'),
  password: Yup.string().required('Please enter password.')
})

function RegistrationPage() {
  const history = useHistory();
  const handleRegister = (values, { setSubmitting }) => {
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

    const registerApi = () => {
      if (process.env.NODE_ENV === 'production') {
        return 'https://spotifind-sabrina.herokuapp.com/api/users/register';
      } else {
        return 'http://localhost:5000/api/users/register';
      }
    }

    return fetch(registerApi(), options)
      .then(response => {
        setSubmitting(false);
        history.push('/');
      })
      .catch(error => {
        setSubmitting(false);
        console.log(error);
      })
}

  return (
    <div className='registration-page'>
      <h3>Register</h3>

      <div>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
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
                  Register
                </button>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
};

export default RegistrationPage;
