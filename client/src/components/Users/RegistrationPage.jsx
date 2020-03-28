import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  ErrorMessage,
  Field,
  Form,
  Formik
} from 'formik';
import * as Yup from 'yup';
import { REGISTER_API } from '../../constants/api';

const validationSchema = Yup.object().shape({
  username: Yup.string().trim()
    .min(5, 'Username must be at least 5 characters.')
    .required('Please enter username.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Please enter password.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match.')
    .required('Please confirm your password.')
});

function RegistrationPage({ setCurrentUser }) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  const handleRegister = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const { username, password, confirmPassword } = values;

    const options = {
      method: 'POST',
      body: JSON.stringify({ username, password, confirmPassword }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    };

    try {
      const registrationResponse = await fetch(REGISTER_API, options);
      const body = await registrationResponse.json();

      if (registrationResponse.status === 200) {
        setCurrentUser(body.user);
        history.push('/');
      } else {
        setErrorMessage(body.message);
      }

      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div className='registration-page container'>
      <h3>Register</h3>

      <div>
        <Formik
          initialValues={{
            username: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {
            (props) => (
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
                  />
                  <ErrorMessage name='password' component='span' className='form-field-error' />
                </div>

                <div className='form-field'>
                  <Field
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm password'
                  />
                  <ErrorMessage name='confirmPassword' component='span' className='form-field-error' />
                </div>

                <button type='submit' disabled={props.isSubmitting}>
                  Register
                </button>
              </Form>
            )
          }
        </Formik>
      </div>

      { errorMessage && (
        <p className='form-field-error'>{errorMessage}</p>
      )}
    </div>
  );
}

RegistrationPage.propTypes = {
  setCurrentUser: PropTypes.func.isRequired
};

export default RegistrationPage;
