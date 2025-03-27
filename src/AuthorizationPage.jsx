import React, {useState} from 'react'
import './App.css'

function AuthorizationPage({transaction, onApprove, onReject, onClose}){

    if(transaction.transactionType === "deposit"){
        var customerList = JSON.parse(localStorage.getItem("customers"))
        const activeCustomer = customerList.find(customer => customer.accountNumber === Number(transaction.creditAccount))
        
        return(<>
            <div className="withdrawal-details">
                <div className="transaction-input-part" style={{width:'325px'}}>
                    <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Transaction Details</span>
                    <div className="input-class">
                        <label htmlFor="account-number1">Account Number</label>
                        <div className='auth-input'>{activeCustomer.accountNumber}</div>
                        <div style={{fontSize:'0.75rem', fontWeight: 400}}>
                            <div>
                                <span>{activeCustomer.firstName} {activeCustomer.middleName} {activeCustomer.lastName}</span>
                            </div>
                        </div>
                    </div>
                    <div className="input-class">
                        <label htmlFor="transfer-amount">Amount</label>
                        <div className='auth-input'>{transaction.amount}</div>
                    </div>
                    <div className="input-class">
                        <label htmlFor="transfer-narrative">Depositor Name</label>
                        <div className='auth-input'>{transaction.depositorName}</div>
                    </div>
                    <div className="input-class">
                        <label htmlFor="transfer-narrative">Narrative</label>
                        <div className='auth-input'>{transaction.narrative}</div>
                    </div>
                    <div className='button-div'>
                        <button style={{backgroundColor:'green'}} className="save-button" onClick={onApprove}>Authorize</button>
                        <button className="save-button" onClick={onReject}>Reject</button>
                        
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
                                <td>{transaction.denominations[1000].value === 0 ? '-':`${transaction.denominations[1000].units}`}</td>
                                <td>{transaction.denominations[1000].value}</td>
                            </tr>
                            <tr>
                                <td>500</td>
                                <td>{transaction.denominations[500].value === 0 ? '-':transaction.denominations[500].units}</td>
                                <td>{transaction.denominations[500].value}</td>
                            </tr>
                            <tr>
                                <td>200</td>
                                <td>{transaction.denominations[200].value === 0 ? '-':transaction.denominations[200].units}</td>
                                <td>{transaction.denominations[200].value}</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>{transaction.denominations[100].value === 0 ? '-':transaction.denominations[100].units}</td>
                                <td>{transaction.denominations[100].value}</td>
                            </tr>
                            <tr>
                                <td>50</td>
                                <td>{transaction.denominations[50].value === 0 ? '-':transaction.denominations[50].units}</td>
                                <td>{transaction.denominations[50].value}</td>
                            </tr>
                            <tr>
                                <td>20</td>
                                <td>{transaction.denominations[20].value === 0 ? '-':transaction.denominations[20].units}</td>
                                <td>{transaction.denominations[20].value}</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>{transaction.denominations[10].value === 0 ? '-':transaction.denominations[10].units}</td>
                                <td>{transaction.denominations[10].value}</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>{transaction.denominations[5].value === 0 ? '-':transaction.denominations[5].units}</td>
                                <td>{transaction.denominations[5].value}</td>
                            </tr>
                        </table>
                    </div>
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
                        <div className='auth-input'>{activeCustomer.accountNumber}</div>  
                    </div>
                    <div className='input-class'>
                        <label htmlFor="account-number1">Account Name</label>
                        <div className='auth-input'><span>{activeCustomer.firstName} {activeCustomer.middleName} {activeCustomer.lastName}</span></div>
                    </div>
                    <div className="input-class">
                        <label htmlFor="transfer-amount">Amount</label>
                        <div className='auth-input'>{transaction.amount}</div>
                    </div>
                    <div className="input-class">
                        <label htmlFor="transfer-narrative">Narrative</label>
                        <div className='auth-input'>{transaction.narrative}</div>
                    </div>
                    <button className="save-button" onClick={onApprove}>Authorize</button>
                    <button className="save-button" onClick={onReject}>Reject</button>
                    
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
                                <td>{transaction.denominations[1000].value === 0 ? '-':`${transaction.denominations[1000].units}`}</td>
                                <td>{transaction.denominations[1000].value}</td>
                            </tr>
                            <tr>
                                <td>500</td>
                                <td>{transaction.denominations[500].value === 0 ? '-':transaction.denominations[500].units}</td>
                                <td>{transaction.denominations[500].value}</td>
                            </tr>
                            <tr>
                                <td>200</td>
                                <td>{transaction.denominations[200].value === 0 ? '-':transaction.denominations[200].units}</td>
                                <td>{transaction.denominations[200].value}</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>{transaction.denominations[100].value === 0 ? '-':transaction.denominations[100].units}</td>
                                <td>{transaction.denominations[100].value}</td>
                            </tr>
                            <tr>
                                <td>50</td>
                                <td>{transaction.denominations[50].value === 0 ? '-':transaction.denominations[50].units}</td>
                                <td>{transaction.denominations[50].value}</td>
                            </tr>
                            <tr>
                                <td>20</td>
                                <td>{transaction.denominations[20].value === 0 ? '-':transaction.denominations[20].units}</td>
                                <td>{transaction.denominations[20].value}</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>{transaction.denominations[10].value === 0 ? '-':transaction.denominations[10].units}</td>
                                <td>{transaction.denominations[10].value}</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>{transaction.denominations[5].value === 0 ? '-':transaction.denominations[5].units}</td>
                                <td>{transaction.denominations[5].value}</td>
                            </tr>
                        </table>
                    </div>
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
            </div>
        </>)
    }
    else if(transaction.transactionType === "transfer"){
        var customerList = JSON.parse(localStorage.getItem("customers"))
        const activeCustomer = customerList.find(customer => customer.accountNumber === Number(transaction.debitAccount))
        const activeCustomer2 = customerList.find(customer => customer.accountNumber === Number(transaction.creditAccount))

        return(<>
                        <div className="withdrawal-details" style={{columnGap:'7rem'}}>
                            <div className="transaction-input-part">
                                <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Transaction Details</span>
                                    <div className="input-class">
                                    <div style={{fontWeight:'400',fontSize:'0.8rem', color:'grey'}}>Transaction reference: #{transaction.transactionReference}</div></div>
                                <div className="input-class">
                                    <label htmlFor="account-number1">Debit Account</label>
                                    <div className='auth-input'>{transaction.debitAccount}</div>
                                    <div style={{fontSize:'0.75rem', fontWeight: 400}}>{activeCustomer ? 
                                        <div>
                                            <span>{activeCustomer.firstName} {activeCustomer.middleName} {activeCustomer.lastName}</span>
                                        </div> : errorMessage}
                                    </div>
                                </div>
                                <div className="input-class">
                                    <label htmlFor="account-number2">Credit Account</label>
                                    <div className='auth-input'>{transaction.creditAccount}</div>
                                    <div style={{fontSize:'0.75rem', fontWeight: 400}}>{activeCustomer2 ? 
                                        <div>
                                            <span>{activeCustomer2.firstName} {activeCustomer2.middleName} {activeCustomer2.lastName}</span>
                                        </div> : errorMessage2}
                                    </div>
                                </div>
                                <div className="input-class">
                                    <label htmlFor="transfer-amount">Amount</label>
                                    <div className='auth-input'>{transaction.amount}</div>
                                </div>
                                <div className="input-class">
                                    <label htmlFor="transfer-narrative">Narrative</label>
                                    <div className='auth-input'>{transaction.narrative}</div>
                                </div>
                                <button className="save-button" onClick={onApprove}>Authorize</button>
                                <button className="save-button" onClick={onReject}>Reject</button>
                                
                            </div>
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'start', alignItems:'center', columnGap:'2rem'}}>
                                <div className="customer-details">
                                    <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Customer Details:</span>
                                    <img style={{border:'solid 4px rgb(82, 82, 82)',width: '7rem', height: '7rem', borderRadius:'5rem'}} src={activeCustomer ? activeCustomer.image: './assets/defaultpic.png'} alt="" />
                                    <div className="details">
                                        <span className="detail-labels">Name:</span>
                                        <span>{activeCustomer? `${activeCustomer.firstName} ${activeCustomer.middleName} ${activeCustomer.lastName}`: 'nil'}</span>
                                    </div>
                                    <div className="details">
                                        <span className="detail-labels">Account Balance:</span>
                                        <span>{activeCustomer ? activeCustomer.accountBalance : 'nil'}</span>
                                    </div>
                                    <div className="details">
                                        <span className="detail-labels">Account Status:</span>
                                        <span>{activeCustomer ? 'Regular' : 'nil'}</span>
                                    </div>
                                    <div className="details">
                                        <span className="detail-labels">Phone number:</span>
                                        <span>{activeCustomer ? activeCustomer.phoneNumber : 'nil'}</span>
                                    </div>
                                    <div className="details">
                                        <span className="detail-labels">Signature:</span>
                                        {activeCustomer && (<img src={activeCustomer.signature} alt="" />)}
                                    </div>
                                </div>
                                <div><i style={{color:'#D8494B', fontSize:'2.75rem'}} class="fa-solid fa-arrow-right"></i></div>
                                <div className="customer-details">
                                    <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Customer Details:</span>
                                    <img style={{border:'solid 4px rgb(82, 82, 82)',width: '7rem', height: '7rem', borderRadius:'5rem'}} src={activeCustomer2 ? activeCustomer2.image: './assets/defaultpic.png'} alt="" />
                                    <div className="details">
                                        <span className="detail-labels">Name:</span>
                                        <span>{activeCustomer2? `${activeCustomer2.firstName} ${activeCustomer2.middleName} ${activeCustomer2.lastName}`: 'nil'}</span>
                                    </div>
                                    <div className="details">
                                        <span className="detail-labels">Account Balance:</span>
                                        <span>{activeCustomer2 ? activeCustomer2.accountBalance : 'nil'}</span>
                                    </div>
                                    <div className="details">
                                        <span className="detail-labels">Account Status:</span>
                                        <span>{activeCustomer2 ? 'Regular' : 'nil'}</span>
                                    </div>
                                    <div className="details">
                                        <span className="detail-labels">Phone number:</span>
                                        <span>{activeCustomer2 ? activeCustomer2.phoneNumber : 'nil'}</span>
                                    </div>
                                    <div className="details">
                                        <span className="detail-labels">Signature:</span>
                                        {activeCustomer2 && (<img src={activeCustomer2.signature} alt="" />)}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
        </>)

    }
}

export default AuthorizationPage