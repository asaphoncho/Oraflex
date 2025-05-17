import React, {useState} from 'react'
import Modal2 from './Modal2';

function DepositTransaction({backFunction, typeFunction, depositFunction, handleDenomChange, denominationAmount, transactionReference, activeCustomer, errorMessage, totalValueRef, depositorRef, amountRef, narrativeRef, accountRef}){

    const [authorizationConfirmation, setAuthorizationConfirmation] = useState(false)
    return(<>
            {authorizationConfirmation &&(
                <Modal2>
                    <div>Are you sure you want to save transaction?</div>
                    <div className="modal-btn-div">
                        <button className="login-btn" style={{backgroundColor:'green'}} onClick={depositFunction}>Yes</button>
                        <button className="login-btn" onClick={()=>setAuthorizationConfirmation(false)}>Cancel</button>
                    </div>
                </Modal2>
                )}
                <div className="withdrawal-page">                                               
                    <div className="withdrawal-header">
                        <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={backFunction}><i class="fa-solid fa-arrow-left"></i></button>
                        <span>Cash deposit</span>
                    </div>
                    <div className="withdrawal-details">
                        <div className="transaction-input-part">
                            <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Transaction Details</span>
                            <div className="input-class">
                            <div style={{fontWeight:'400',fontSize:'0.8rem', color:'grey'}}>Transaction reference: #{transactionReference}</div>
                                <label htmlFor="account-number1">Account Number</label>
                                <input onChange={typeFunction} type="number" name="account-number1" ref={accountRef} />
                                <div style={{fontSize:'0.75rem', fontWeight: 400}}>{activeCustomer ? 
                                    <div>
                                        <span>{activeCustomer.firstName} {activeCustomer.middleName} {activeCustomer.lastName}</span>
                                    </div> : errorMessage}
                                </div>
                            </div>
                            <div className="input-class">
                                <label htmlFor="transfer-amount">Amount</label>
                                <div className='auth-input' ref={amountRef}>{denominationAmount[1000].value+denominationAmount[500].value+denominationAmount[200].value+denominationAmount[100].value+denominationAmount[50].value+denominationAmount[20].value+denominationAmount[10].value+denominationAmount[5].value}</div>
                            </div>
                            <div className="input-class">
                                <label htmlFor="transfer-narrative">Depositor Name</label>
                                <input type="text" name="transfer-narrative" ref={depositorRef} />
                            </div>
                            <div className="input-class">
                                <label htmlFor="transfer-narrative">Narrative</label>
                                <div className='auth-input' ref={narrativeRef}>{activeCustomer ? `CSH DEP OF ${denominationAmount[1000].value+denominationAmount[500].value+denominationAmount[200].value+denominationAmount[100].value+denominationAmount[50].value+denominationAmount[20].value+denominationAmount[10].value+denominationAmount[5].value} IFO ${activeCustomer.firstName.toUpperCase()}` : 'nil'}</div>
                            </div>
                            <button className="save-button" onClick={()=> {setAuthorizationConfirmation(true);}}>Save</button>
                            
                        </div>
                        <div className="teller-part">
                            <div className="denom-details">
                                <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Denomination</span>
                                <table className="denom-table">
                                    <tr>
                                        <th>Denomination</th>
                                        <th>Units</th>
                                        <th>Total</th>
                                    </tr>
                                    <tr>
                                        <td>1000</td>
                                        <td><input type="number" onChange={(event)=> handleDenomChange(1000,event)} /></td>
                                        <td style={{width:'105px'}}>{denominationAmount[1000].value}</td>
                                    </tr>
                                    <tr>
                                        <td>500</td>
                                        <td><input type="number" onChange={(event)=> handleDenomChange(500,event)} /></td>
                                        <td>{denominationAmount[500].value}</td>
                                    </tr>
                                    <tr>
                                        <td>200</td>
                                        <td><input type="number" onChange={(event)=> handleDenomChange(200,event)} /></td>
                                        <td>{denominationAmount[200].value}</td>
                                    </tr>
                                    <tr>
                                        <td>100</td>
                                        <td><input type="number" onChange={(event)=> handleDenomChange(100,event)} /></td>
                                        <td>{denominationAmount[100].value}</td>
                                    </tr>
                                    <tr>
                                        <td>50</td>
                                        <td><input type="number" onChange={(event)=> handleDenomChange(50,event)} /></td>
                                        <td>{denominationAmount[50].value}</td>
                                    </tr>
                                    <tr>
                                        <td>20</td>
                                        <td><input type="number" onChange={(event)=> handleDenomChange(20,event)} /></td>
                                        <td>{denominationAmount[20].value}</td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td><input type="number" onChange={(event)=> handleDenomChange(10,event)} /></td>
                                        <td>{denominationAmount[10].value}</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td><input type="number" onChange={(event)=> handleDenomChange(5,event)} /></td>
                                        <td>{denominationAmount[5].value}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td></td>
                                        <td ref={totalValueRef}>{denominationAmount[1000].value+denominationAmount[500].value+denominationAmount[200].value+denominationAmount[100].value+denominationAmount[50].value+denominationAmount[20].value+denominationAmount[10].value+denominationAmount[5].value}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="customer-details">
                            <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Customer Details:</span>
                            <img style={{border:'solid 4px rgb(82, 82, 82)',width: '6rem', height: '6rem', borderRadius:'5rem'}} src={activeCustomer ? activeCustomer.image: './assets/defaultpic.png'} alt="" />
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
                                <span>{activeCustomer ? activeCustomer.accountActive ? 'Regular' : 'PND' : 'nil'}</span>
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
                    </div>
                </div>
    </>)
}

export default DepositTransaction