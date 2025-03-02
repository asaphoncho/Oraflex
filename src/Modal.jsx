import React, { useRef, useState} from "react";
import './App.css'

function Modal({onClose, onConfirm, transaction}){
    const [transVerified, setTransverified] = useState(false)
    const amountConfirm = useRef()
    function handleConfirm(a){
        if(a == transaction.amount){
            setTransverified(true)
        }
        
    }

    if(!transaction) return null
    if(transaction.transactionType == "transfer"){
        return(<>
            <div className="big-modal">
                {transVerified && (
                    <div className="main-modal">
                        <div>
                            <div>
                                <span>Debit account</span>
                                <div>{transaction.debitAccount}</div>
                            </div>
                            <div>
                                <span>Credit account</span>
                                <div>{transaction.creditAccount}</div>
                            </div> 
                        </div>
                        <div>
                            <div>
                                <span>Amount</span>
                                <div>{transaction.amount}</div>
                            </div>
                            <div>
                                <span>Narration</span>
                                <div>Funds transfer of {transaction.amount} IFO {transaction.creditAccount} from {transaction.debitAccount}</div>
                            </div>
                        </div>
                        <div>
                            <button onClick={onConfirm}>Approve</button>
                            <button onClick={onClose}>Reject</button>
                        </div>
                    </div>
                )}
                {!transVerified &&(
                        <div className="modal">
                        <div>
                            <span>Rekey for Authorization</span>
                        </div>
                        <div>
                            <label>Transaction Amount</label>
                            <input type="number" ref={amountConfirm}/>
                            <div>Transaction Currency</div>
                            <button onClick={()=>handleConfirm(Number(amountConfirm.current.value))}>Confirm</button>
                        </div>
                    </div>
                )}
                
            </div>
        </>)
        
    }
    else if(transaction.transactionType == "deposit" || transaction.transactionType == "withdrawal"){
        return(<>
            <div className="big-modal">
                <div className="modal">
                    <div>
                        <div>
                            <span>Credit account</span>
                            <div>{transaction.creditAccount}</div>
                        </div> 
                    </div>
                    <div>
                        <div>
                            <span>Amount</span>
                            <div>{transaction.amount}</div>
                        </div>
                        <div>
                            <span>Narration</span>
                            <div>Deposit of {transaction.amount} IFO {transaction.creditAccount}</div>
                        </div>
                    </div>
                    <div>
                        <button onClick={onConfirm}>Approve</button>
                        <button onClick={onClose}>Reject</button>
                    </div>
                </div>
                
                
            </div>
        </>)
        
    }
    

}
export default Modal