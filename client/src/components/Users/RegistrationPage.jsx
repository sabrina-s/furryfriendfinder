import React from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { REGISTER_API } from '../../api';

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

    return fetch(REGISTER_API, options)
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
    <div className='registration-page container'>
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
