import React, { useState, useMemo, useEffect  } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTravelDatesContext } from '../../context/InsuranceContext/TravelDatesContext';
import Switch from "react-switch";


function Price_Ins() {
    const navigate = useNavigate();
    const { start_travel } = useTravelDatesContext();
    const [is_sport, setIsSport] = useState(false);

    const initialValues = useMemo(() => {
    return sessionStorage.getItem('SportValues') 
        ? JSON.parse(sessionStorage.getItem('SportValues'))
        : {
            is_sport: false
        };
}, []);

useEffect(() => {
    setIsSport(initialValues.is_sport);
  }, [initialValues]);

const validationSchema = Yup.object().shape({
    price: Yup.boolean(),
    // sport_dates_main: Yup.string().required("שדה חובה").matches(/^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/](19|20)\d{2}$/, "DD/MM/YYYY").test(        "is-date-before-start",
    //     "התאריך חייב להיות אחרי תחילת הטיול:",
    //     function (value) {
    //         if (!value) return false;
    //         const parts = value.split("/");
    //         const day = parseInt(parts[0], 10);
    //         const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    //         const year = parseInt(parts[2], 10);
    //         const inputDate = new Date(year, month, day);
    //         const today = new Date();
    //         today.setDate(today.getDate()); // Subtract one day
    //         return inputDate >= start_travel;
    //     }
    // ),
})

const handleBack = (data) => {
sessionStorage.setItem('PriceValues', JSON.stringify(data));
navigate("/getinsurance/sport");
}


const onSubmit = (data) => {
    console.log(data);
    sessionStorage.setItem('PriceValues', JSON.stringify(data)); // Save the form values to local storage
    navigate("/");
}

return (
<div className="Price_Ins_Page" style={{ direction: 'rtl', textAlign: 'right' }}> 
    <Formik 
    initialValues={initialValues} 
    onSubmit={onSubmit} 
    validationSchema={validationSchema}
    >

    {({ setFieldValue, handleSubmit, values }) => (
    <Form className='PriceForm'>
    <div>
    {/* <div class="mat-slide-toggle-thumb"></div> */}
    {/* <label>ספורט אקסטרים?: </label>
        <Switch 
            checked={is_sport}
            onChange={(checked) => {
                setIsSport(checked);
                setFieldValue('is_sport', checked);
            }}
            onColor="#00ff00"
            offColor="#cccccc"
            uncheckedIcon={false}
            checkedIcon={false}
        /> */}
        {/* <button 
            type="button" 
            id="sport"
            style={{ backgroundColor: is_sport ? 'green' : 'transparent' }}
            onClick={() => {
                setFieldValue('is_sport', true);
                setIsSport(true);
            }}
        >             
        כן
        </button> */}
        {/* <ErrorMessage name="is_sport" component="span" /> */}

        <div>
        <label>באיזה תאריכים?: </label>

        </div>
        <Field 
            id="inputPrice" 
            name="price" 
        />
        <ErrorMessage name="price" component="span" />

    
    </div>
    <button 
        type="submit" 
        id="price_submit"
        onClick={handleSubmit} 
        >
            המשך
    </button>
    <button 
        id="back_price"
        onClick={() => handleBack(values)} 
    >
        חזור
    </button>
    </Form>
    )}
</Formik>

</div>
)
}

export default Price_Ins;