import React, { useRef, useState} from "react";
import './App.css'

function Modal({onClose1, transaction, handleTransactionConfirm}){
    const [transVerified, setTransverified] = useState(false)
    const amountConfirm = useRef()
    function handleConfirm(a){
        if(a == transaction.amount){
            handleTransactionConfirm()
        }
        else{
            console.log("wrong amount specified")
        }
        
    }

    if(!transaction) return null
    else return(

        <div className="big-modal">
            <div className="modal">
                <div>
                    <span>Rekey for Authorization</span>
                </div>
                <div>
                    <label>Transaction Amount</label>
                    <input type="number" ref={amountConfirm}/>
                    <div>Transaction Currency</div>
                    <button onClick={()=>handleConfirm(Number(amountConfirm.current.value))}>Confirm</button>
                    <button onClick={onClose1}>close</button>
                </div>
            </div>
        </div>  
        )
    

}
export default Modal