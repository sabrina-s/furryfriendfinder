import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { CHANGE_PW_API } from "../../constants/api";
import axios from "axios";
import "./SettingsPage.css";
import Separator from "../common/Separator";
import AdoptedDogs from "./AdoptedDogs";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Please enter password."),
});

function SettingsPage() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);

  const handlePasswordChange = ({ password }) => {
    setSubmitting(true);

    axios
      .put(CHANGE_PW_API, { password }, { withCredentials: true })
      .then((res) => {
        setSubmitting(false);
        flashMessage("success", res.data.message);
      })
      .catch((error) => {
        setSubmitting(false);
        flashMessage("failure", "Update failed");
      });
  };

  const flashMessage = (type, message) => {
    if (type === "success") {
      setSuccessMessage(message);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);
    } else if (type === "failure") {
      setFailureMessage(message);

      setTimeout(() => {
        setFailureMessage(null);
      }, 1000);
    }
  };

  return (
    <div className="settings-page container">
      <h3>User settings</h3>

      <h4>Update your password</h4>

      <div>
        <Formik
          initialValues={{
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handlePasswordChange}
        >
          {(props) => (
            <Form>
              <div className="form-field">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="form-field-error"
                />
                {successMessage && (
                  <span className="success flash-message">
                    {successMessage}
                  </span>
                )}
                {failureMessage && (
                  <span className="failure flash-message">
                    {failureMessage}
                  </span>
                )}
              </div>

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <Separator />

      <AdoptedDogs />
    </div>
  );
}

export default SettingsPage;
