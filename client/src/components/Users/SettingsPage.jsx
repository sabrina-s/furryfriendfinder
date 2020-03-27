import React from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CHANGE_PW_API } from '../../api';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Please enter password.')
})

function SettingsPage() {
  const history = useHistory();

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const password = values.password;

    const options = {
      method: 'PUT',
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }

    return fetch(CHANGE_PW_API, options)
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
    <div className='settings-page container'>
      <h3>Update password</h3>

      <div>
        <Formik
          initialValues={{
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {
            props => (
              <Form>
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
    </div>
  )
};

export default SettingsPage;
