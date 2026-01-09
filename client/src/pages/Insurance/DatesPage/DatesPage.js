import React, { useEffect, useState, useMemo } from 'react' 
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { useTravelDatesContext } from '../../../context/InsuranceContext/TravelDatesContext';

function Dates_Ins() {
    const navigate = useNavigate();
    // const { set_start_travel } = useStartTravelContext(); 
    const { start_travel, set_start_travel, end_travel, set_end_travel } = useTravelDatesContext();

    // const { set_start_travel } = useStartTravelContext();
    // const { set_end_travel } = useStartTravelContext();

    const today = new Date();

    const initialValues = useMemo(() => {
      return sessionStorage.getItem('DatesValues')
        ? JSON.parse(sessionStorage.getItem('DatesValues'))
        : {
            dateRange: {
              startDate: today,
              endDate: today,
              key: 'selection',
            },
          };
    }, [today]);
  
    const [selectedRange, setSelectedRange] = useState(initialValues.dateRange);
    
    useEffect(() => {
        set_start_travel(selectedRange.startDate);
        set_end_travel(selectedRange.endDate);
      }, [selectedRange, set_start_travel, set_end_travel]);


  const validationSchema = Yup.object().shape({
    dateRange: Yup.object().shape({
      startDate: Yup.date().required().min(today, ''),
      endDate: Yup.date().required().min(Yup.ref('startDate'), 'צריך להיות אחרי תאריך ההתחלה'),
    }),
  });

  const handleBack = () => {
    navigate("/getinsurance");
  }

  const onSubmit = (data) => {
    console.log(data);
    sessionStorage.setItem('DatesValues', JSON.stringify(data)); // Save the form values to local storage
    navigate("/getinsurance/Do_we_know_you?");
  }



  return (
    <div className="Date_Ins_Page" style={{ direction: 'rtl', textAlign: 'right' }}> 
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
      >
        {({ setFieldValue, handleSubmit, values }) => (
        <Form className='formCalculate'>
        <div>
        <label htmlFor='dateRange'>תקופת נסיעה: </label>
        <DateRange
        id="inputInsurance"
        onChange={(ranges) => {
            setSelectedRange(ranges.selection);
            setFieldValue('dateRange', ranges.selection);
        }}
        moveRangeOnFirstSelection={false}
        ranges={[selectedRange]}
        minDate={today}
        name="dateRange"
        />
        <ErrorMessage name="dateRange.startDate" component="span" />
        <ErrorMessage name="dateRange.endDate" component="span" />
        </div>
        <button 
            type="submit" 
            id="submit_dates"
            onClick={handleSubmit} 
            >
                המשך
        </button>
        <button 
            id="back_dates"
            onClick={handleBack} 
            >
                חזור
        </button>
        </Form>
        )}
    </Formik>
    </div>
    )
  }
    
export default Dates_Ins;