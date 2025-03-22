import React, { createContext, useState, useContext } from 'react';

const IsNewContext = createContext();

export const IsNewProvider = ({ children }) => {
    const [is_new_client, set_is_new_client] = useState('');

    return (
        <IsNewContext.Provider value={{ is_new_client, set_is_new_client }}>
            {children}
        </IsNewContext.Provider>
    );
};

export const useIsNewContext = () => useContext(IsNewContext);
