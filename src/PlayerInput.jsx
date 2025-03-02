import React, { useState } from "react";

function playerInput({className, placeHolder, onChange, ID, label, value, response}){


    return(
        <>
            <span style={{color: 'black'}}>{label}</span>
            <div className="input-container">
                <input type="text" placeholder={placeHolder} onChange={onChange} className={className} id={ID} value={value} />
                <i className={response == true ? "fa-regular fa-circle-check" : "fa-regular fa-circle-xmark"} style={{color: 'black'}}></i>
            </div>
            
        </>
    )
}


export default playerInput