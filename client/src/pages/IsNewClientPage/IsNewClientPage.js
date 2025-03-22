import React, { createContext, useContext , useEffect, useState } from 'react' 
import { Link, useNavigate } from "react-router-dom";
import { useIsNewContext } from '../../context/InsuranceContext/IsNewContext';

function New_Client_Ins() {
    const navigate = useNavigate();
    const { set_is_new_client } = useIsNewContext();

    const handleOld = () => {
        set_is_new_client(false);
        navigate("/getinsurance/login");
    }

    const handleNew = () => {
        set_is_new_client(true);
        navigate("/getinsurance/who_travel");
    }

    const handleBack = () => {
        navigate("/getinsurance/dates");
    }
    
  return (
    <div className="New_Client_Ins_Page" style={{ direction: 'rtl', textAlign: 'right' }}> 

        <p>כבר רכשת אצלנו ביטוח בעבר?</p>
        <button 
            type="submit" 
            id="New_Client"
            onClick={handleOld} 
            >
            כן
        </button>
        <button 
            type="submit" 
            id="New_Client"
            onClick={handleNew} 
            >
            לא
        </button>
        <div>
        <button 
            id="back_new_client"
            onClick={handleBack} 
            >
                חזור
        </button>
        </div>

    
    </div>
    )
    }

export default New_Client_Ins;