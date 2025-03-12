import React, {useState} from 'react'
import './App.css'

function AuthorizationPage({transaction, onApprove, onReject, onClose}){

    if(transaction.transactionType === "deposit"){
        var customerList = JSON.parse(localStorage.getItem("customers"))
        const activeCustomer = customerList.find(customer => customer.accountNumber === Number(transaction.creditAccount))
        
        return(<>
            <div className="withdrawal-details">
                <div className="transaction-input-part">
                    <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Transaction Details</span>
                    <div className="input-class">
                        <label htmlFor="account-number1">Account Number</label>
                        <div>{activeCustomer.accountNumber}</div>
                        <div style={{fontSize:'0.75rem', fontWeight: 400}}>
                            <div>
                                <span>{activeCustomer.firstName} {activeCustomer.middleName} {activeCustomer.lastName}</span>
                            </div>
                        </div>
                    </div>
                    <div className="input-class">
                        <label htmlFor="transfer-amount">Amount</label>
                        <div>{transaction.amount}</div>
                    </div>
                    <div className="input-class">
                        <label htmlFor="transfer-narrative">Depositor Name</label>
                        <div>{transaction.depositorName}</div>
                    </div>
                    <div className="input-class">
                        <label htmlFor="transfer-narrative">Narrative</label>
                        <div>{transaction.narrative}</div>
                    </div>
                    <button className="save-button" onClick={onApprove}>Authorize</button>
                    <button className="save-button" onClick={onReject}>Reject</button>
                    <button className="save-button" onClick={onClose}>Cancel</button>
                    
                </div>
                <div className="customer-details">
                    <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Customer Details:</span>
                    <img style={{border:'solid 4px rgb(82, 82, 82)',width: '6rem', height: '6rem', borderRadius:'5rem'}} src={activeCustomer.image} alt="" />
                    <div className="details">
                        <span className="detail-labels">Name:</span>
                        <span>{`${activeCustomer.firstName} ${activeCustomer.middleName} ${activeCustomer.lastName}`}</span>
                    </div>
                    <div className="details">
                        <span className="detail-labels">Account Balance:</span>
                        <span>{activeCustomer.accountBalance}</span>
                    </div>
                    <div className="details">
                        <span className="detail-labels">Phone number:</span>
                        <span>{activeCustomer.phoneNumber}</span>
                    </div>
                    <div className="details">
                        <span className="detail-labels">Signature:</span>
                        {<img src={activeCustomer.signature} alt="" />}
                    </div>
                </div>
                <div className="teller-part">
                    <div>
                        Teller till
                    </div>
                </div>
            </div>
        </>)
    }
    else if(transaction.transactionType === "withdrawal"){
        var customerList = JSON.parse(localStorage.getItem("customers"))
        const activeCustomer = customerList.find(customer => customer.accountNumber === Number(transaction.debitAccount))
        
        return(<>
            <div className="withdrawal-details">
                <div className="transaction-input-part">
                    <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Transaction Details</span>
                    <div className="input-class">
                        <label htmlFor="account-number1">Account Number</label>
                        <div>{activeCustomer.accountNumber}</div>  
                    </div>
                    <div className='input-class'>
                        <label htmlFor="account-number1">Account Name</label>
                        <div><span>{activeCustomer.firstName} {activeCustomer.middleName} {activeCustomer.lastName}</span></div>
                    </div>
                    <div className="input-class">
                        <label htmlFor="transfer-amount">Amount</label>
                        <div>{transaction.amount}</div>
                    </div>
                    <div className="input-class">
                        <label htmlFor="transfer-narrative">Narrative</label>
                        <div>{transaction.narrative}</div>
                    </div>
                    <button className="save-button" onClick={onApprove}>Authorize</button>
                    <button className="save-button" onClick={onReject}>Reject</button>
                    <button className="save-button" onClick={onClose}>Cancel</button>
                    
                </div>
                <div className="customer-details">
                    <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Customer Details:</span>
                    <img style={{border:'solid 4px rgb(82, 82, 82)',width: '6rem', height: '6rem', borderRadius:'5rem'}} src={activeCustomer.image} alt="" />
                    <div className="details">
                        <span className="detail-labels">Name:</span>
                        <span>{`${activeCustomer.firstName} ${activeCustomer.middleName} ${activeCustomer.lastName}`}</span>
                    </div>
                    <div className="details">
                        <span className="detail-labels">Account Balance:</span>
                        <span>{activeCustomer.accountBalance}</span>
                    </div>
                    <div className="details">
                        <span className="detail-labels">Phone number:</span>
                        <span>{activeCustomer.phoneNumber}</span>
                    </div>
                    <div className="details">
                        <span className="detail-labels">Signature:</span>
                        {<img src={activeCustomer.signature} alt="" />}
                    </div>
                </div>
                <div className="teller-part">
                    <div>
                        <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Denomination</span>
                        <table>
                            <tr>
                                <th>Denomination</th>
                                <th>Units</th>
                                <th>Total</th>
                            </tr>
                            <tr>
                                <td>1000</td>
                                <td>5</td>
                                <td>1000</td>
                            </tr>
                            <tr>
                                <td>500</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>200</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>50</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>20</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            

                        </table>
                    </div>
                </div>
            </div>
        </>)
    }
}

export default AuthorizationPage