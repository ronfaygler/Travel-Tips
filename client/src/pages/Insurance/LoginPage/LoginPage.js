import React, { useEffect, useState, useMemo } from 'react' 
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function Login_Ins() {
    const navigate = useNavigate();

    const initialValues = useMemo(() => {
        return sessionStorage.getItem('LoginValues') 
          ? JSON.parse(sessionStorage.getItem('LoginValues'))
          : {
                phone: "",
                email: ""
            };
      }, []);

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required('שדה חובה')
      .matches(/^(?:\+?972[-.\s]?|0)([23489]|[57]\d)[-.\s]?\d{3}[-.\s]?\d{4}$/, 'Phone number is not valid'), // Israeli phone number validation
      email: Yup.string()
      .required('שדה חובה')
      .email('אימייל לא תקין'), // Email format validation
  });

  const handleBack = (data) => {
    // Create a new object with only the properties you want to save
    // const { phone, email } = data;
    // const loginValues = { phone, email };

    sessionStorage.setItem('LoginValues', JSON.stringify(data));
    navigate("/getinsurance/Do_we_know_you");
  }


  const onSubmit = (data) => {
    console.log(data);
    sessionStorage.setItem('LoginValues', JSON.stringify(data)); // Save the form values to local storage
    navigate("/getinsurance/who_travel");

  }

//   const [selectedRange, setSelectedRange] = useState({
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection'
//   });

  return (
    <div className="Login_Ins_Page" style={{ direction: 'rtl', textAlign: 'right' }}> 
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
      >


        {({ setFieldValue, handleSubmit, values }) => (
        <Form className='LoginForm'>
        <div>
        <label >מס' טלפון: </label>
        <ErrorMessage name="phone" component="span" />
            <Field 
              id="inputLogin" 
              name="phone" 
            />
        
        <label> אימייל: </label>
        <ErrorMessage name="email" component="span" />
            <Field 
              id="inputLogin"
              name="email"
            />
        </div>
        <button 
            type="submit" 
            id="login"
            onClick={handleSubmit} 
            >
                המשך
        </button>
        <button 
            id="back_login"
            onClick={() => handleBack(values)} 
        >
            חזור
        </button>
        </Form>
        )}
    </Formik>
    {/* <Link to={"/getinsurance/who_travel"}> המשך</Link> */}

    </div>
    )
    }
    
export default Login_Ins;