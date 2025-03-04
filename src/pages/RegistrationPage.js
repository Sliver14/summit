import React, { useState } from "react";
import "../style/RegistrationPage.css";
import { useNavigate } from "react-router-dom";
import countryCodes from "../utils/countryCodes.js";
import zones from "../utils/zones.js";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function RegistrationPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    countryCode: "+234", // Match the code in countryCodes
    phoneNumber: "",
    zone: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("*"),
    lastName: Yup.string().required("*"),
    middleName: Yup.string(),
    countryCode: Yup.string().required("*"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone number must contain only numbers")
      .required("*"),
    zone: Yup.string().required("*"),
    email: Yup.string().email("Invalid email").required("*"),
  });

  const onSubmit = async (e) => {
    // e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("https://my-summit-production.up.railway.app/registration", e);
      setSuccess(response.data.message);
      navigate("/create-flyer");
    } catch(err) {
       if (err.response) {
        setError(err.response.data.error);
       } else {
        setError("Something went wrong. Please try again");
       }
  }
    };

  return (
    <div className="registrationPage">
      <div className="summitregistration">
        {/* <div className="summit-title">
          <h1>16TH GLOBAL SUMMIT</h1>
        </div> */}
      </div>

      <div className="register">
      <h2 className="register_title">SUMMIT REGISTRATION</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <div>
          <label htmlFor="firstName">First Name </label>
          <ErrorMessage name="firstName" component="span" />
          </div>
          <Field id="firstName" name="firstName" />
          
          <div>
          <label htmlFor="lastName">Last Name </label>
          <ErrorMessage name="lastName" component="span" />
          </div>
          <Field id="lastName" name="lastName" />

          <div>
          <label htmlFor="middleName">Middle Name </label>
          <ErrorMessage name="middleName" component="span" />
          </div>
          <Field id="middleName" name="middleName" />

          <div>
          <label htmlFor="countryCode">Country Code </label>
          <ErrorMessage name="countryCode" component="span" />
          </div>
          <Field as="select" name="countryCode" id="countryCode">
            <option value="" disabled>
              Select your country code
            </option>
            {countryCodes.map((country) => (
              <option key={country.name} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </Field>

          <div>
          <label htmlFor="phoneNumber">Phone Number </label>
          <ErrorMessage name="phoneNumber" component="span" />
          </div>
          <Field id="phoneNumber" name="phoneNumber" />

          <div>
          <label htmlFor="zone">Zone </label>
          <ErrorMessage name="zone" component="span" />
          </div>
          <Field as="select" name="zone" id="zone">
            <option value="" disabled>
              Select your zone
            </option>
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </Field>
          
          <div>
          <label htmlFor="email">Email </label>
          <ErrorMessage name="email" component="span" />
          </div>
          <Field id="email" name="email" />
          {error && <p style={{ color: "red", alignSelf: "center" }}>{error}</p>}
      {success && <p style={{ color: "green", alignSelf: "center" }}>{success}</p>}
          <button type="submit">Register</button>
        </Form>
      </Formik>
      </div>
      
      <button style={{marginBottom: "1.5em"}}onClick={() => navigate("/create-flyer")}> Create Avatar</button>
    </div>
  );
}

export default RegistrationPage;
