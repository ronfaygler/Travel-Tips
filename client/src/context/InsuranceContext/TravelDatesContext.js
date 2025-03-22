import React, { createContext, useState, useContext } from 'react';

const TravelDatesContext = createContext();

export const StartTravelProvider = ({ children }) => {
    const [start_travel, set_start_travel] = useState(new Date());
    const [end_travel, set_end_travel] = useState(new Date());

    return (
        <TravelDatesContext.Provider value={{ start_travel, set_start_travel, end_travel, set_end_travel }}>
            {children}
        </TravelDatesContext.Provider>
    );
};

export const useTravelDatesContext = () => useContext(TravelDatesContext);