import React, { useState, useMemo, useEffect  } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useIsNewContext } from '../../../context/InsuranceContext/IsNewContext';

function Who_Travel() {
    const { is_new_client } = useIsNewContext();
    const [passengers, setPassengers] = useState([]);
    const navigate = useNavigate();

    //######################################################
    // enter to sport values if not in there!!!!!!!
    //######################################################

    // useEffect(() => {
    //     const storedValues = sessionStorage.getItem('TravelersValues');
    //     if (storedValues) {
    //         const parsedValues = JSON.parse(storedValues);
    //         const storedPassengers = Object.keys(parsedValues).filter(key => key.startsWith('full_name_hebrew_')).map(key => ({
    //             key: key.split('_')[3]
    //         }));
    //         setPassengers(storedPassengers);
    //     }
    // }, []);

    // const savePassengersToStorage = (passengers) => {
    //     // if (passengers){
    //     //     const updatedPassengers = passengers.map(passenger => ({
    //     //         ...passenger,
    //     //         is_sport: passenger.hasOwnProperty('is_sport') ? passenger.is_sport : false
    //     //     }));
    //     //     setPassengers(updatedPassengers);
    //     // }
    //     if (passengers) {
    //         const updatedValues = Object.keys(passengers).reduce((acc, key) => {
    //             if (key.startsWith('full_name_hebrew_')){
    //                 const passengerKey = key.split('_')[3];
    //                 const sport_values = sessionStorage.getItem('sportValues') || '{}';
    //                 // if (sport_values) {
    //                 const sportParsedValues = JSON.parse(sport_values);
    //                 // const sportUpdatedValues = Object.keys(sportParsedValues).reduce((acc_sport, key_sport) => {
    //                 if (!(`is_sport_${passengerKey}` in sportParsedValues)) {
    //                     sportParsedValues[`is_sport_${passengerKey}`] = false;
    //                 }
    //             }

    //             acc[key] = passengers[key];
    //             return acc;
    //         }, {});
    //     //     })
    //     // }
    //     // console.log("passengers: ", updatedValues)
    //     // console.log("type passengers: ", xtype(updatedValues))
    //     sessionStorage.setItem('sportValues', JSON.stringify(sportParsedValues));
    //     sessionStorage.setItem('passengers', JSON.stringify(updatedValues));

    //     // sessionStorage.setItem('passengers', JSON.stringify(passengers));
    //     }
    // }

    // const savePassengersToStorage = (passengers) => {
    //     if (passengers) {
    //         const sportValues = sessionStorage.getItem('sportValues') || '{}';
    //         const sportParsedValues = JSON.parse(sportValues);
    
    //         const updatedValues = Object.keys(passengers).reduce((acc, key) => {
    //             if (key.startsWith('full_name_hebrew_')) {
    //                 const passengerKey = key.split('_')[3];
                    
    //                 if (!(`is_sport_${passengerKey}` in sportParsedValues)) {
    //                     // sportParsedValues[`key`] = passengerKey;
    //                     sportParsedValues[`is_sport_${passengerKey}`] = false;
    //                 }
    //             }
    
    //             // acc[key] = passengers[key];
    //             // return acc;
    //         }, {});
    
    //         sessionStorage.setItem('sportValues', JSON.stringify(sportParsedValues));
    //         sessionStorage.setItem('passengers', JSON.stringify(passengers));
    //     }
    // };

    const savePassengersToStorage = (passengers) => {
        if (passengers) {
            const sportValues = sessionStorage.getItem('sportValues') || '{}';
            const sportParsedValues = JSON.parse(sportValues);
    
            const updatedValues = Object.keys(passengers).reduce((acc, key) => {
                if (key.startsWith('full_name_hebrew_')) {
                    const passengerKey = key.split('_')[3];
                    if (!(`is_sport_${passengerKey}` in sportParsedValues)) {
                        sportParsedValues[`is_sport_${passengerKey}`] = false;
                    }
                }
                acc[key] = passengers[key];
                return acc;
            }, {});
    
            sessionStorage.setItem('sportValues', JSON.stringify(sportParsedValues));
            sessionStorage.setItem('passengers', JSON.stringify(passengers));
        }
    };


    const getPassengersFromStorage = () => {
        const storedPassengers = sessionStorage.getItem('passengers') || '{}';
        return storedPassengers;
    };

    
    useEffect(() => {
        // const storedValues = sessionStorage.getItem('TravelersValues');
        const storedValues = getPassengersFromStorage();

        if (storedValues) {
            const parsedValues = JSON.parse(storedValues);
            const storedPassengers = Object.keys(parsedValues)
                .filter(key => key.startsWith('full_name_hebrew_') && !key.includes('main'))
                .map(key => ({
                    key: key.split('_')[3]
                }));
            setPassengers(storedPassengers);
        }
    }, []);
    

    
    const addPassenger = () => {
        setPassengers([...passengers, { key: Date.now() }]);
        savePassengersToStorage(passengers)
        // const newPassenger = { key: Date.now() };
        // setPassengers([...passengers, newPassenger]);
        // setFieldValue("passengers", [...passengers, newPassenger]);
    };

    // const deletePassenger = (key, setFieldValue, values) => {
    //     setPassengers(passengers.filter(passenger => passenger.key !== key));
    //     const updatedValues = { ...values };
    //     delete updatedValues[`full_name_hebrew_${key}`];
    //     delete updatedValues[`full_name_english_${key}`];
    //     delete updatedValues[`birth_date_${key}`];
    //     setFieldValue("values", updatedValues);
    //     sessionStorage.setItem('TravelersValues', JSON.stringify(updatedValues));
    // };

    // const deletePassenger = (key, setFieldValue, values) => {
    //     const updatedPassengers = passengers.filter(passenger => passenger.key !== key);
    //     setPassengers(updatedPassengers);
    
    //     const updatedValues = { ...values };
    //     delete updatedValues[`full_name_hebrew_${key}`];
    //     delete updatedValues[`full_name_english_${key}`];
    //     delete updatedValues[`birth_date_${key}`];
    //     // delete updatedValues[`is_sport_${key}`];

    //     setFieldValue("passengers", updatedPassengers); // Update the form field for passengers
    //     // sessionStorage.setItem('TravelersValues', JSON.stringify(updatedValues));
    //     savePassengersToStorage(passengers)

    // };



    const deletePassenger = (key, setFieldValue, values) => {
        const updatedPassengers = passengers.filter(passenger => passenger.key !== key);
        setPassengers(updatedPassengers);
    
        const updatedValues = { ...values };
        delete updatedValues[`full_name_hebrew_${key}`];
        delete updatedValues[`full_name_english_${key}`];
        delete updatedValues[`birth_date_${key}`];
        delete updatedValues[`passport_number_${key}`];  // Deletion for passport number
        delete updatedValues[`gender_${key}`];  // Added deletion for gender
    
        setFieldValue("passengers", updatedPassengers);
        savePassengersToStorage(updatedValues);
    };
    
    // const initialValues = useMemo(() => {
    //     return sessionStorage.getItem('TravelersValues') 
    //       ? JSON.parse(sessionStorage.getItem('TravelersValues'))
    //       : {
    //             birth_date_main: "",
    //             full_name_hebrew_main: "",
    //             full_name_english_main: "",
    //             ...passengers.reduce((acc, passenger, index) => ({
    //                 ...acc,
    //                 [`full_name_hebrew_${passenger.key}`]: "",
    //                 [`full_name_english_${passenger.key}`]: "",
    //                 [`birth_date_${passenger.key}`]: ""
    //             }), {})
    //         };
    //   }, [passengers]);

    // const initialValues = useMemo(() => {
    //     if (sessionStorage.getItem('TravelersValues')) {
    //         const savedValues = JSON.parse(sessionStorage.getItem('TravelersValues'));
    //         return {
    //             birth_date_main: savedValues.birth_date_main || "",
    //             full_name_hebrew_main: savedValues.full_name_hebrew_main || "",
    //             full_name_english_main: savedValues.full_name_english_main || "",
    //             ...passengers.reduce((acc, passenger) => ({
    //                 ...acc,
    //                 [`full_name_hebrew_${passenger.key}`]: savedValues[`full_name_hebrew_${passenger.key}`] || "",
    //                 [`full_name_english_${passenger.key}`]: savedValues[`full_name_english_${passenger.key}`] || "",
    //                 [`birth_date_${passenger.key}`]: savedValues[`birth_date_${passenger.key}`] || ""
    //             }), {})
    //         };
    //     } else {
    //         return {
    //             birth_date_main: "",
    //             full_name_hebrew_main: "",
    //             full_name_english_main: "",
    //             ...passengers.reduce((acc, passenger) => ({
    //                 ...acc,
    //                 [`full_name_hebrew_${passenger.key}`]: "",
    //                 [`full_name_english_${passenger.key}`]: "",
    //                 [`birth_date_${passenger.key}`]: ""
    //             }), {})
    //         };
    //     }
    // }, [passengers]);

    // const initialValues = useMemo(() => {
    //     const storedValues = getPassengersFromStorage();
    //     // const storedValues = sessionStorage.getItem('TravelersValues');
    //     if (storedValues) {
    //         const parsedValues = JSON.parse(storedValues);
    //         const storedPassengers = Object.keys(parsedValues)
    //             .filter(key => key.startsWith('full_name_hebrew_') && !key.includes('main'))
    //             .map(key => ({
    //                 key: key.split('_')[3]
    //             }));
    
    //         const mainTravelerValues = {
    //             birth_date_main: parsedValues.birth_date_main || "",
    //             full_name_hebrew_main: parsedValues.full_name_hebrew_main || "",
    //             full_name_english_main: parsedValues.full_name_english_main || "",
    //             // is_sport_main: parsedValues.is_sport_main || false,
    //         };
    
    //         const passengersValues = storedPassengers.reduce((acc, passenger) => ({
    //             ...acc,
    //             [`full_name_hebrew_${passenger.key}`]: parsedValues[`full_name_hebrew_${passenger.key}`] || "",
    //             [`full_name_english_${passenger.key}`]: parsedValues[`full_name_english_${passenger.key}`] || "",
    //             [`birth_date_${passenger.key}`]: parsedValues[`birth_date_${passenger.key}`] || "",
    //             // [`is_sport_${passenger.key}`]: parsedValues[`is_sport_${passenger.key}`] || "",

    //         }), {});
    
    //         return {
    //             ...mainTravelerValues,
    //             ...passengersValues
    //         };
    //     }
    
    //     return {
    //         birth_date_main: "",
    //         full_name_hebrew_main: "",
    //         full_name_english_main: "",
    //         // is_sport_main: false,
    //         // ...passengers.reduce((acc, passenger) => ({
    //         //     ...acc,
    //         //     [`full_name_hebrew_${passenger.key}`]: "",
    //         //     [`full_name_english_${passenger.key}`]: "",
    //         //     [`birth_date_${passenger.key}`]: ""
    //         // }), {})
    //     };
    // }, []);

    const initialValues = useMemo(() => {
        const storedValues = getPassengersFromStorage();
        if (storedValues) {
            const parsedValues = JSON.parse(storedValues);
            const storedPassengers = Object.keys(parsedValues)
                .filter(key => key.startsWith('full_name_hebrew_') && !key.includes('main'))
                .map(key => ({
                    key: key.split('_')[3]
                }));
    
            const mainTravelerValues = {
                birth_date_main: parsedValues.birth_date_main || "",
                full_name_hebrew_main: parsedValues.full_name_hebrew_main || "",
                full_name_english_main: parsedValues.full_name_english_main || "",
                passport_number_main: parsedValues.passport_number_main || "",  // Passport number for main traveler
                gender_main: parsedValues.gender_main || "",  // Added gender for main traveler
            };
    
            const passengersValues = storedPassengers.reduce((acc, passenger) => ({
                ...acc,
                [`full_name_hebrew_${passenger.key}`]: parsedValues[`full_name_hebrew_${passenger.key}`] || "",
                [`full_name_english_${passenger.key}`]: parsedValues[`full_name_english_${passenger.key}`] || "",
                [`birth_date_${passenger.key}`]: parsedValues[`birth_date_${passenger.key}`] || "",
                [`passport_number_${passenger.key}`]: parsedValues[`passport_number_${passenger.key}`] || "",  // Passport number for passengers
                [`gender_${passenger.key}`]: parsedValues[`gender_${passenger.key}`] || "",  // Added gender for passengers
            }), {});
    
            return {
                ...mainTravelerValues,
                ...passengersValues
            };
        }
    
        return {
            birth_date_main: "",
            full_name_hebrew_main: "",
            full_name_english_main: "",
            passport_number_main: "",  // Empty passport field in default values
            gender_main: "",  // Added empty gender field in default values
        };
    }, []);
    
    
    const validationSchema = Yup.object().shape({
        full_name_hebrew_main: Yup.string().required("שדה חובה").matches(/^[\u0590-\u05FF\s']+$/, "עברית בלבד"),
        full_name_english_main: Yup.string().required("שדה חובה").matches(/^[a-zA-Z\s']+$/, "אנגלית בלבד"),
        birth_date_main: Yup.string().required("שדה חובה").matches(/^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/](19|20)\d{2}$/, "DD/MM/YYYY").test(
            "is-date-before-today",
            "התאריך חייב להיות קטן מהיום",
            function (value) {
                if (!value) return false;
                const parts = value.split("/");
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1; // Months are zero-based
                const year = parseInt(parts[2], 10);
                const inputDate = new Date(year, month, day);
                const today = new Date();
                today.setDate(today.getDate());
                return inputDate <= today;
            }
        ),
        passport_number_main: Yup.string().required("שדה חובה").matches(/^[A-Za-z0-9]+$/, "מספר דרכון חייב להכיל רק אותיות באנגלית ומספרים"),
        gender_main: Yup.string().required("שדה חובה").oneOf(["male", "female"], "יש לבחור מין תקין"),
        ...passengers.reduce((acc, passenger) => ({
            ...acc,
            [`full_name_hebrew_${passenger.key}`]: Yup.string().required("שדה חובה").matches(/^[\u0590-\u05FF\s']+$/, "שם מלא בעברית בלבד"),
            [`full_name_english_${passenger.key}`]: Yup.string().required("שדה חובה").matches(/^[a-zA-Z\s']+$/, "שם מלא באנגלית בלבד"),
            [`birth_date_${passenger.key}`]: Yup.string().required("שדה חובה").matches(/^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/](19|20)\d{2}$/, "DD/MM/YYYY").test(
                "is-date-before-today",
                "התאריך חייב להיות קטן מהיום",
                function (value) {
                    if (!value) return false;
                    const parts = value.split("/");
                    const day = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
                    const year = parseInt(parts[2], 10);
                    const inputDate = new Date(year, month, day);
                    const today = new Date();
                    today.setDate(today.getDate());
                    return inputDate <= today;
                }
            ),
            [`passport_number_${passenger.key}`]: Yup.string().required("שדה חובה").matches(/^[A-Za-z0-9]+$/, "מספר דרכון חייב להכיל רק אותיות באנגלית ומספרים"),
            [`gender_${passenger.key}`]: Yup.string().required("שדה חובה").oneOf(["male", "female"], "יש לבחור מין תקין"),
        }), {})
    });

    
    const handleBack = (values) => {
        // sessionStorage.setItem('TravelersValues', JSON.stringify(values)); // Save the form values to local storage
        savePassengersToStorage(values)
        if (is_new_client){
            navigate("/getinsurance/Do_we_know_you");
        }
        else{
            navigate("/getinsurance/login");
        }
    }
    
    const onSubmit = (data) => {
        console.log(data);
        savePassengersToStorage(data)
        // sessionStorage.setItem('TravelersValues', JSON.stringify(data)); // Save the form values to local storage
        navigate("/getinsurance/sport");
    };
    
    return (
        <div className="WhoTravelPage" style={{ direction: 'rtl', textAlign: 'right' }}>
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit} 
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, values, setFieldValue }) => (
                    <Form className='TravelerForm'>
                        <div>
                            <div>
                                <h2>מלא את הפרטים הבאים, כפי שמופיע בדרכון. </h2>
                                <h3>נתחיל בפרטים שלך: </h3>
                                <label>:שם מלא (בעברית)</label>
                                <ErrorMessage name="full_name_hebrew_main" component="span" />
                                <Field 
                                    id="inputTraveler_main" 
                                    name="full_name_hebrew_main" 
                                />
                                <label>:שם מלא (באנגלית)</label>
                                <ErrorMessage name="full_name_english_main" component="span" />
                                <Field 
                                    id="inputTraveler_main" 
                                    name="full_name_english_main" 
                                />
                                <label>תאריך לידה: </label>
                                <ErrorMessage name="birth_date_main" component="span" />
                                <Field 
                                    id="inputTraveler_main" 
                                    name="birth_date_main" 
                                    placeholder="DD/MM/YYYY" 
                                />
                                <label>:מספר דרכון</label>
                                <ErrorMessage name="passport_number_main" component="span" />
                                <Field 
                                    id="inputTraveler_main" 
                                    name="passport_number_main" 
                                />
                                <label>:מין</label>
                                <ErrorMessage name="gender_main" component="span" />
                                <Field as="select" id="gender_main" name="gender_main">
                                    <option value="">בחר מין</option>
                                    <option value="male">זכר</option>
                                    <option value="female">נקבה</option>
                                </Field>
                            </div>
                            <div>
                                {passengers.map((passenger, index) => (
                                    <div key={passenger.key} style={{ marginBottom: '20px' }}>
                                        <p>נוסע {index + 2}</p>
                                        <label>שם מלא (בעברית):</label>
                                        <ErrorMessage name={`full_name_hebrew_${passenger.key}`} component="span" />
                                        <Field 
                                            id={`inputTraveler_${passenger.key}`} 
                                            name={`full_name_hebrew_${passenger.key}`} 
                                        />
                                        <label>שם מלא (באנגלית):</label>
                                        <ErrorMessage name={`full_name_english_${passenger.key}`} component="span" />
                                        <Field 
                                            id={`inputTraveler_${passenger.key}`} 
                                            name={`full_name_english_${passenger.key}`} 
                                        />
                                        <label>תאריך לידה: </label>
                                        <ErrorMessage name={`birth_date_${passenger.key}`} component="span" />
                                        <Field 
                                            id={`inputTraveler_${passenger.key}`} 
                                            name={`birth_date_${passenger.key}`} 
                                            placeholder="DD/MM/YYYY" 
                                        />
                                        <label>:מספר דרכון</label>
                                        <ErrorMessage name={`passport_number_${passenger.key}`} component="span" />
                                        <Field 
                                            id={`inputTraveler_${passenger.key}`} 
                                            name={`passport_number_${passenger.key}`} 
                                        />
                                        <label>:מין</label>
                                        <ErrorMessage name={`gender_${passenger.key}`} component="span" />
                                        <Field as="select" id={`gender_${passenger.key}`} name={`gender_${passenger.key}`}>
                                            <option value="">בחר מין</option>
                                            <option value="male">זכר</option>
                                            <option value="female">נקבה</option>
                                        </Field>
                                        <button 
                                            type="button" 
                                            onClick={() => deletePassenger(passenger.key, setFieldValue, values)}
                                            style={{ marginLeft: '10px' }}
                                        >
                                            מחק נוסע
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    type="button" 
                                    id="add_traveler"
                                    onClick={addPassenger}
                                    disabled={!isValid}
                                > 
                                    הוסף נוסע
                                </button>
                            </div>
                            <button 
                                type="submit" 
                                id="submit_travelers"
                                onClick={handleSubmit} 
                                disabled={!isValid}
                            >
                                המשך
                            </button>
                            <button 
                                id="back_dates"
                                onClick={() => handleBack(values)} 
                            >
                                חזור
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Who_Travel;
