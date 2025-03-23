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
                <div style={{padding:'1rem 0 1rem 0rem', display:'flex', justifyContent:'center', flexDirection:'row', backgroundColor:'rgb(209, 209, 209)', width:'100%'}}>
                    <span style={{fontSize:'1rem', fontWeight:'600', color: 'rgb(82, 82, 82)'}}>Rekey for Authorization</span>
                </div>
                <div className="modal-body">
                    <div className="modal-details">
                        <span style={{color: 'rgb(82, 82, 82)'}}>Transaction Reference:</span>
                        <span>{transaction.reference}</span>
                    </div>
                    <div className="modal-details">
                        <label style={{color: 'rgb(82, 82, 82)'}}>Transaction Amount</label>
                        <input type="number" ref={amountConfirm}/>
                    </div>
                    <div className="modal-details">
                        <div style={{color: 'rgb(82, 82, 82)'}}>Transaction Currency</div>
                        <span>NGN</span>
                    </div>
                    <div className="modal-btn-div">
                        <button className="login-btn" style={{backgroundColor:'green'}} onClick={()=>handleConfirm(Number(amountConfirm.current.value))}>Confirm</button>
                        <button className="login-btn" onClick={onClose1}>close</button>
                    </div>
                    
                </div>
            </div>
        </div>  
        )
    

}
export default Modal