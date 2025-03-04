import React from "react";
import { useNavigate } from "react-router-dom";
import countryCodes from "../utils/countryCodes.js";
import zones from "../utils/zones.js";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    firstName: "",
    lastName: "",
    middleName: "",
    countryCode: "+234", // Match the code in countryCodes
    phoneNumber: "",
    zone: "",
    role: "Teacher",
    dateOfbirth: "",
    kcUsername: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
    .required('Title is required') // Make the title mandatory
    .oneOf(['Pastor', 'Deacon', 'Deaconess', 'Brother', 'Sister'], 'Invalid title selection'), // Restrict to valid options

    firstName: Yup.string().required("First name is required"),

    lastName: Yup.string().required("Last name is required"),

    middleName: Yup.string(),

    countryCode: Yup.string().required("Country code is required"),

    phoneNumber: Yup.string().max(15, "Phone number must not exceed 15 digits")
      .matches(/^\d+$/, "Phone number must contain only numbers")
      .required("Phone number is required"),

    zone: Yup.string().required("Zone is required"),

    dateOfbirth: Yup.date()
      .required('Date of Birth is required')
      .max(new Date(), 'Date cannot be in the future'), // Ensure date is not in the future
      
    role: Yup.string().required("Role is required"),

    kcUsername: Yup.string().required("date of birth is required"),

    password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
    
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data)
      .then((response) => {
        alert("Registration Successful")
        navigate("/signin");
      })
      .catch((error) => {
        if (error.response) {
          // The server responded with a status other than 2xx
          console.error("Response error:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request error:", error.request);
        } else {
          // Something else triggered the error
          console.error("Error message:", error.message);
        }
        console.error("Error config:", error.config);
      });
  };
  

  const handleClick = () => {
    navigate("/create-flyer");
  };

  return (
    <div className="RegistrationPage">
      <h1>Principal/Teachers Registration</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        
      {({ isSubmitting }) => (
        <Form>

        <label htmlFor="title">Select Title:</label>
        <ErrorMessage name="title" component="span" className="error" />
            <Field as="select" name="title" id="title">
              <option value="" disabled>
                -- Select a Title --
              </option>
              <option value="Pastor">Pastor</option>
              <option value="Deacon">Deacon</option>
              <option value="Deaconess">Deaconess</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
            </Field>
            

          <label htmlFor="firstName">First Name: </label>
          <ErrorMessage name="firstName" component="span" />
          <Field id="firstName" name="firstName" placeholder="(First name...)" />

          <label htmlFor="lastName">Last Name: </label>
          <ErrorMessage name="lastName" component="span" />
          <Field id="lastName" name="lastName" placeholder="(Last name...)" />

          <label htmlFor="middleName">Middle Name: </label>
          <ErrorMessage name="middleName" component="span" />
          <Field id="middleName" name="middleName" placeholder="(Middle name...)" />

          <label htmlFor="countryCode">Country Code: </label>
          <ErrorMessage name="countryCode" component="span" />
          <Field as="select" name="countryCode" id="countryCode">
            <option value="" disabled>
              Select your country code
            </option>
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </Field>

          <label htmlFor="phoneNumber">Phone Number: </label>
          <ErrorMessage name="phoneNumber" component="span" />
          <Field id="phoneNumber" name="phoneNumber" placeholder="(Phone number...)" />

          <label htmlFor="zone">Zone: </label>
          <ErrorMessage name="zone" component="span" />
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

          <label htmlFor="role">Select Role:</label>
        <ErrorMessage name="role" component="span" className="error" />
        <Field as="select" name="role" id="role">
          <option value="" disabled>
            -- Select a Role --
          </option>
          <option value="Principal">Principal</option>
          <option value="Teacher">Teacher</option>
        </Field>

          <label htmlFor="dateOfbirth">Date of Birth:</label>
          <ErrorMessage name="dateOfbirth" component="span" className="error" />
            <Field type="date" id="dateOfbirth" name="dateOfbirth" />          

        <label htmlFor="kcUsername">kc Username: </label>
        <ErrorMessage name="kcUsername" component="span" />
        <Field id="kcUsername" name="kcUsername" placeholder="(example@gmail.com...)" />

         {/* Password Field */}
      <label htmlFor="password">Password:</label>
      <ErrorMessage name="password" component="span" />
      <Field type="password" id="password" name="password" />

      {/* Confirm Password Field */}
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <ErrorMessage name="confirmPassword" component="span" />
      <Field type="password" id="confirmPassword" name="confirmPassword" />

      <button type="submit" disabled={isSubmitting}>Register
        {isSubmitting ? "Submitting..." : "Register"}
      </button>
        </Form>
      )}
      </Formik>

      <div className="submit">
      <h3 onClick={(()=> navigate("/login"))}>Click here to Login</h3>

        <button type="button" onClick={handleClick}>
          Create Avatar
        </button>
      </div>
      
    </div>
  );
}

export default Register;
