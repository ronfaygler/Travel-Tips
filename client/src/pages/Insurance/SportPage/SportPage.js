import React, { useState, useMemo, useEffect  } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTravelDatesContext } from '../../../context/InsuranceContext/TravelDatesContext';
import Switch from "react-switch";
import Modal from 'react-modal'; // Import react-modal
import { DateRange } from "react-date-range";
import xtype from 'xtypejs'

// Custom styles for the modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        direction: 'rtl',
        textAlign: 'right'
    },
};

Modal.setAppElement('#root'); // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

function Sport_Ins() {
    const navigate = useNavigate();
    const { start_travel, end_travel } = useTravelDatesContext();
    const [is_sport, setIsSport] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [start_sport, setStartSport] = useState(false);
    const [end_sport, setEndSport] = useState(false);
    const [currentKey, setCurrentKey] = useState(false);
    const [selectedRanges, setSelectedRanges] = useState({});


    const [selectedPassenger, setSelectedPassenger] = useState(null);

    const getPassengersFromStorage = () => {
        const storedSportValues = sessionStorage.getItem('sportValues') || '[]';
        // if (storedSportValues) {
            // return JSON.parse(storedSportValues);
        // const storedSportValues = sessionStorage.getItem('passengers') || '[]';
        const parsedValues = JSON.parse(storedSportValues);
        const passengersArray = Object.keys(parsedValues).map(key => ({
            key: key.split('_')[2] //parsedValues[key]
        }));
        return passengersArray;
    };
        // }
        // const sessionPassengers = sessionStorage.getItem('passengers') || '[]';
        // // console.log("passengersss: ", xtype(storedPassengers))

        // // console.log("parsed!!: ", xtype(JSON.parse(storedPassengers)))
        // const parsedValues = JSON.parse(sessionPassengers);
        // const storedPassengers = Object.keys(parsedValues)
        // .filter(key => key.startsWith('full_name_hebrew_') ) //&& !key.includes('main'))
        //     .map(key => ({
        //         // key: key.split('_')[3],
        //         [`is_sport_${key.split('_')[3]}`]: parsedValues[key.split('_')[3]][`is_sport_${key.split('_')[3]}`] || false
        //     }));
        // return storedPassengers;

    // };

    const [passengers, setPassengers] = useState(getPassengersFromStorage());
    // console.log("passengersss: ", passengers)
    // console.log("passengers type: ", xtype(passengers))




    const initialValues = useMemo(() => {
        const storedPassengers = getPassengersFromStorage();
        const initialPassengerValues = storedPassengers.map(passenger => ({
            // key: passenger.key,
            [`is_sport_${passenger.key}`]: passenger[`is_sport_${passenger.key}`]
        }));
        return { passengers: initialPassengerValues };
    }, [start_travel, end_travel]);
    
    console.log("Initial Values: ", initialValues);
        
    useEffect(() => {
        const storedValues = getPassengersFromStorage();
        if (storedValues) {
            setPassengers(storedValues);
        }
    }, []);

    // const [selectedRange, setSelectedRange] = useState(initialValues.dateRangeSport);
    
    const handleSportChange = (passengerKey, checked) => {
        // Update the sport option for the specific passenger
        const updatedPassengers = passengers.map(passenger =>
            passenger.key === passengerKey ? { ...passenger, [`is_sport_${passengerKey}`]: checked} : passenger //, key: 'selection'  dateRangeSport: passenger.dateRangeSport || { startDate: start_travel, endDate: end_travel}
        );
        setPassengers(updatedPassengers);

        // Save the updated passengers list to session storage
        sessionStorage.setItem('sportValues', JSON.stringify(updatedPassengers));
    };

    // useEffect(() => {
    //     console.log("entered use effect selectedRanges")
    //     if (selectedPassenger) {
    //         const selectedPassengerData = passengers.find(p => p.key === selectedPassenger);
    //         if (selectedPassengerData) {
    //             setIsModalOpen(selectedPassengerData[`is_sport_${selectedPassengerData.key}`]);
    //             setSelectedRanges({
    //                 ...selectedRanges,
    //                 [selectedPassenger]: selectedPassengerData.dateRangeSport || {
    //                     startDate: start_travel,
    //                     endDate: start_travel,
    //                     key: 'selection'
    //                 }
    //             });
    //         }
    //     }
    // }, [selectedPassenger, passengers]);

    // useEffect(() => {
    //     setStartSport(selectedRange.startDate);
    //     setEndSport(selectedRange.endDate);
    //   }, [selectedRange]);

    // useEffect(() => {
    //     setIsSport(initialValues.is_sport);
    //   }, [initialValues]);
        
    const validationSchema = Yup.object().shape({
        // passengers: Yup.array().of(
        // Yup.object().shape({
            ...passengers.reduce((acc, passenger) => ({
                ...acc,
                // [`full_name_hebrew_${passenger.key}`]:
                [`is_sport_${passenger.key}`]: Yup.boolean(),
            // dateRangeSport: Yup.object().shape({
            //     startDate: Yup.date().required()
            //         .min(start_travel),
            //     endDate: Yup.date().required()
            //         .min(Yup.ref("startDate"), "must be after start date"),
            //     }),
            })
        ),
    });

    const handleBack = (data) => { // not saving good
        console.log('Form data back:', data); // Debugging

        // sessionStorage.setItem('sportValues', JSON.stringify(data));
        navigate("/getinsurance/who_travel");
    }

    const handleSave = (values) => { // worked
        // Update the sport option for the specific passenger
        const updatedPassengers = passengers.map(passenger =>
            passenger.key === selectedPassenger
                    ? { ...passenger, dateRange: values.passengers[selectedPassenger]?.dateRangeSport }
                    : passenger
            // passenger.key === selectedPassenger ? { ...passenger, dateRange: values.passengers[selectedPassenger]?.dateRangeSport, key: 'selection' } : passenger //, dateRangeSport: passenger.dateRangeSport || { startDate: start_travel, endDate: end_travel}
        );
        setPassengers(updatedPassengers);

        setSelectedRanges({
            ...selectedRanges,
            [selectedPassenger]: values.passengers[selectedPassenger]?.dateRangeSport
        });
        console.log("handle save: ", selectedRanges)

        // Save the updated passengers list to session storage
        sessionStorage.setItem('sportValues', JSON.stringify(updatedPassengers));
    };

    const onSubmit = (data) => {
        // console.log(data);
        console.log('Form data submitted:', data); // Debugging

        // sessionStorage.setItem('sportValues', JSON.stringify(data)); // Save the form values to local storage
        navigate("/getinsurance/price");
    }

    return (
        <div className="Sport_Ins_Page" style={{ direction: 'rtl', textAlign: 'right' }}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ setFieldTouched, setFieldValue, handleSubmit, values, touched }) => (
                    <Form className='SportForm'>
                        <div>
                        {passengers.map((passenger, index) => (
                            <div key={passenger.key}>
                                    <h3>Passenger: {values['is_sport_{passenger.key}']}</h3>
                                    <Switch
                                    checked={passenger[`is_sport_${passenger.key}`]}
                                    onChange={(checked) => {
                                        setFieldValue(`passengers.${index}.is_sport_${passenger.key}`, checked);
                                        // setFieldTouched(`passengers.${index}.is_sport`, true);
                                        handleSportChange(passenger.key, checked);
                                        if (checked) {
                                            setSelectedPassenger(passenger.key);
                                            setIsModalOpen(true);
                                        }
                                    }}
                                    onColor="#00ff00"
                                    offColor="#cccccc"
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                />

                                <ErrorMessage name={`passengers.${index}.is_sport_${passenger.key}`} component="span" />
                                
                            </div>
                        ))}
                        <button
                            type="submit"
                            id="sport_submit"
                            onClick={handleSubmit}
                        >
                            המשך
                        </button>
                        <button
                            id="back_sport"
                            onClick={() => handleBack(values)}
                        >
                            חזור
                        </button>
                    </div>
                    </Form>
                )}
            </Formik>
{/* 
            {selectedPassenger && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    style={customStyles}
                    contentLabel="Sport Modal"
                >
                    <h2>ספורט אקסטרים עבור נוסע {selectedPassenger}</h2>
                    <p>מידע, מחיר...</p>

                    <label htmlFor='dateRangeSport'>תקופת נסיעה: </label>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ setFieldTouched, setFieldValue, values }) => (
                            <div>
                                <DateRange
                                    id="inputInsurance"
                                    onChange={(ranges) => {
                                        console.log("Selected Ranges: ", ranges.selection);
                                        const newRanges = ranges.selection;
                                        setSelectedRanges({
                                            ...selectedRanges,
                                            [selectedPassenger]: newRanges
                                        });
                                        // setSelectedRange(ranges.selection);
                                        setFieldValue(`passengers.${selectedPassenger}.dateRangeSport`, newRanges); //ranges.selection);
                                        // setFieldTouched(`passengers.${selectedPassenger}.dateRangeSport`, true);
                                    }}
                                    moveRangeOnFirstSelection={false}
                                    // editableDateInputs={true}
                                    // retainEndDateOnFirstSelection={true}
                                    ranges={[selectedRanges[selectedPassenger]]} // ? [selectedRanges[selectedPassenger]] : []

                                    // ranges={[selectedRanges[selectedPassenger] ]}
                                        // || {
                                        // startDate: start_travel,
                                        // endDate: end_travel,
                                        // key: 'selection'
                                    // }
                                    
                                    // ranges={[selectedRange]}

                                    // ranges={[{
                                    //     startDate: passengers.find(p => p.key === selectedPassenger)?.dateRangeSport?.startDate || null,
                                    //     endDate: passengers.find(p => p.key === selectedPassenger)?.dateRangeSport?.endDate || null,
                                    //     key: 'selection'
                                    // }]}
                                    minDate={start_travel}
                                    maxDate={end_travel}
                                    name={`dateRangeSport`}
                                />
                                <ErrorMessage name={`passengers.${selectedPassenger}.dateRangeSport.startDate`} component="span" />
                                <ErrorMessage name={`passengers.${selectedPassenger}.dateRangeSport.endDate`} component="span" />
                                <div>
                                <button onClick={ () => { handleSave(values)}} id="dates_submit">Save</button>  
                                </div>
                            </div>
                         )}
                     </Formik>

                    <button onClick={() => setIsModalOpen(false)}>Close</button>
                </Modal>
            )} */}
        </div>
    );
}

export default Sport_Ins;