import React, {useState} from 'react'

function Modal2({children}){
    return(<>
        <div className='big-modal'>
            <div className='modal' style={{justifyContent:'center', alignItems:'center'}}>
                {children}
            </div>
        </div>
    </>)
}

export default Modal2