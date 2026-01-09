import React, { useEffect, useState, useMemo  } from 'react' 
import { Formik, Form, Field, ErrorMessage, useFormikContext  } from "formik";
import * as Yup from "yup";
// import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { countries } from "countries-list";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
// import { tr } from 'date-fns/locale';

function DebugValues() {
  const { values } = useFormikContext();
  console.log('Current form values:', values);
  return null;
}

function Country_Ins() {
  const countryCodes = Object.keys(countries);
  const countryNames = countryCodes.map(code => countries[code].name);
  const [visit, setVisit] = useState(false);
  const [unVisit, setUnVisit] = useState(false);
  const navigate = useNavigate();

  // const initialValues = {
  //   country: "",
  //   visit: false,
  //   unVisit: false,
  //   visitOrNotVisit: false,
  //   // sport: false
  // }

  // const [formValues, setFormValues] = useState(initialValues);
  // const [formValues, setFormValues] = useState({
  //   country: "",
  //   visit: false,
  //   unVisit: false,
  //   visitOrNotVisit: false,
  // });

  const initialValues = useMemo(() => {
    return sessionStorage.getItem('CountryValues') 
      ? JSON.parse(sessionStorage.getItem('CountryValues'))
      : {
          country: "",
          visit: false,
          unVisit: false,
          visitOrNotVisit: false,
        };
  }, []);

  useEffect(() => {
    setVisit(initialValues.visit);
    setUnVisit(initialValues.unVisit);
  }, [initialValues]);

  const validationSchema = Yup.object().shape({
    country: Yup.string().required("שדה חובה"),
    visit: Yup.boolean(),
    notVisit: Yup.boolean(),
    visitOrNotVisit: Yup.boolean().oneOf([true], 'נא לבחור כן או לא'),
  })

  const validate = (values) => {
    const errors = {};
    if (values.country === 'United States' && values.unVisit) {
      errors.visit = 'אם המדינה היא "United States", עליך לבחור "כן" לביקור.';
    }
    return errors;
  };

  

  const onSubmit = (values, { setErrors }) => {
    if (values.country === 'United States' && values.unVisit) {
      setErrors({ visit: 'אם המדינה היא "United States", עליך לבחור "כן" לביקור.' });
    } 
    else {
    console.log(values);
    sessionStorage.setItem('CountryValues', JSON.stringify(values)); // Save the form values to local storage

    // setFormValues(values); // Save the form values

    navigate("/getinsurance/dates");
  }
}

// useEffect(() => {
//   // Restore form values when the component mounts
//   setFormValues((prevFormValues) => ({
//     ...prevFormValues,
//     ...JSON.parse(localStorage.getItem("formValues")),
//   }));
// }, []);

// useEffect(() => {
//   // Save form values to localStorage whenever they change
//   localStorage.setItem("formValues", JSON.stringify(formValues));
// }, [formValues]);

  return (
    <div className="Country_Ins_Page" style={{ direction: 'rtl', textAlign: 'right' }}> 
      <Formik 
        // initialValues={formValues} 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
        validate={validate}
      >
        {({ setFieldValue, handleSubmit, isValid, values, errors }) => (
          <Form className='formCountry'>
            <div style={{ marginBottom: '20px' }}>

            <label>מדינה עיקרית: </label>
            <Field 
              as="select"
              id="inputInsurance"
              name="country"
            >
              <option></option>
              {countryNames.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Field>
            <ErrorMessage name="country" component="span" />

            </div>
            <div style={{ marginBottom: '20px' }}>
            <label>האם תבקר בארה"ב?: </label>
            <button 
                type="button" 
                id="visitUsa"
                style={{ backgroundColor: visit ? 'green' : 'transparent' }}
                onClick={() => {
                  setFieldValue('visit', true);
                  setFieldValue('unVisit', false);
                  setFieldValue('visitOrNotVisit', true);
                  setVisit(true);
                  setUnVisit(false);
                }}
            >             
            כן
            </button>
            <button 
                type="button" 
                id="notVisitUsa"
                style={{ backgroundColor: unVisit ? 'green' : 'transparent' }}
                onClick={() => {
                  setFieldValue('visit', false);
                  setFieldValue('unVisit', true);
                  setFieldValue('visitOrNotVisit', true);
                  setVisit(false);
                  setUnVisit(true);
                }}
            >             
            לא
            </button>
            <ErrorMessage name="visitOrNotVisit" component="div" style={{ color: 'red' }} />
            {errors.visit && <div style={{ color: 'red' }}>{errors.visit}</div>}

            </div>
            <button 
                type="submit" 
                id="submit_travelers"
                onClick={handleSubmit} 
                // disabled={!isValid}
                >
                    המשך
            </button>

            <DebugValues />
            {/*
            <label>ספורט אקסטרים? </label>
            <Field type="checkbox" name="sport" id="inputInsurance" />
            <button type="submit">חשב</button> */}
          </Form>
        )}
      </Formik>
      
    </div>
  )
}

export default Country_Ins;
