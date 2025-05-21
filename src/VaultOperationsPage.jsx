import React, {useState} from 'react'
import './App.css'

function VaultOperationsPage({openVaultFunction, closeVaultFunction, handleBack, handleDenomChange, denominationAmount, narrativeRef, amountRef, handleBuyCBN}){
    const [vaultOperationSelect, setVaultOperationSelect] = useState()
    const [isInputValid, setIsInputValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Enter amount')

    const now = new Date()
    const transactionDate = {newDate:`${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getFullYear())}`}
    const totalValue = document.getElementById('total-value')
    

    function buyCash(){
        if(!errorMessage){
            handleBuyCBN()
            handleBack()
        } 
    }
    function handleBlur(){
        if(amountRef.current.value.length > 0){
            setIsInputValid(true)
            setErrorMessage()
        }
        else{
            setIsInputValid(false)
            setErrorMessage('Enter amount')
        }
    }
    function validateSum(){
        if(Number(totalValue.textContent) === Number(amountRef.current.value)){
            setErrorMessage()
            console.log('correct')
        }
        else{
            setErrorMessage('Entered amount differs from denomination total')
        }
    }

    return(<>
        <div style={{justifyContent:'center', width:'92%'}} className="withdrawal-page">
            {!vaultOperationSelect && (
                <>
                    <div className="withdrawal-header">
                    <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={handleBack}><i class="fa-solid fa-arrow-left"></i></button>
                    <span>Vault Operations</span>
                    </div>
                    <div className='branchBatch-functions'>
                        <div onClick={()=>setVaultOperationSelect("vaultOpen")} className="transaction-cardii">
                            <span>Open Vault Batch</span>
                            <i class="fa-solid fa-door-open"></i>
                        </div>
                        <div onClick={()=>setVaultOperationSelect("vaultClose")} className="transaction-cardii">
                            <span>Close Vault Batch</span>
                            <i class="fa-solid fa-door-closed"></i>
                        </div>
                        <div onClick={()=>setVaultOperationSelect("buyCashCBN")} className="transaction-cardii">
                            <span>Buy Cash From CBN</span>
                            <i class="fa-solid fa-circle-dollar-to-slot"></i>
                        </div>
                        <div onClick={()=>setVaultOperationSelect("sellCashCBN")} className="transaction-cardii">
                            <span>Sell Cash To CBN</span>
                            <i class="fa-solid fa-hand-holding-dollar"></i>
                        </div>
                    </div>
                </>
                
            )}
            {vaultOperationSelect === "vaultOpen" &&(
                <>
                    <div className="withdrawal-header">
                        <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={()=>{setVaultOperationSelect()}}><i class="fa-solid fa-arrow-left"></i></button>
                        <span>Vault Operations</span>
                    </div>
                    <div className='batch-class'>
                        <div>{transactionDate.newDate}</div>
                        <button onClick={openVaultFunction}>Save</button>
                    </div>
                </>
                
            )}
            {vaultOperationSelect === "vaultClose" &&(
                <>
                    <div className="withdrawal-header">
                        <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={()=>{setVaultOperationSelect()}}><i class="fa-solid fa-arrow-left"></i></button>
                        <span>Vault Operations</span>
                    </div>
                    <div className='batch-class'>
                        <div>{transactionDate.newDate}</div>
                        <button onClick={closeVaultFunction}>Save</button>
                    </div>
                </>
            )}
            {vaultOperationSelect === "buyCashCBN" &&(
                <>
                <div className="withdrawal-header">
                    <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={()=>{setVaultOperationSelect()}}><i class="fa-solid fa-arrow-left"></i></button>
                    <span>Buy Cash From CBN</span>
                </div>
                <div className='withdrawal-details'>
                    <div className="transaction-input-part">
                        <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Transaction Details</span>
                        <div className="input-class">
                            <label htmlFor="total-cash">Total Required Cash</label>
                            <input type="number" id='total-cash' ref={amountRef} onBlur={handleBlur}/>
                        </div>
                        <div className="input-class">
                            <label htmlFor="buy-narrative">Narrative</label>
                            <input id='buy-narrative' type="text" ref={narrativeRef}/>
                            <span>{errorMessage}</span>
                        </div>
                        <button className="save-button" onClick={()=>{buyCash()}}>Save</button>   
                    </div>
                    <div className="teller-part" style={isInputValid ? {opacity: 1} : {opacity: 0}}>
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
                                    <td><input onBlur={validateSum} type="number" onChange={(event)=> handleDenomChange(1000,event)} /></td>
                                    <td style={{width:'105px'}}>{denominationAmount[1000].value}</td>
                                </tr>
                                <tr>
                                    <td>500</td>
                                    <td><input onBlur={validateSum} type="number" onChange={(event)=> handleDenomChange(500,event)} /></td>
                                    <td>{denominationAmount[500].value}</td>
                                </tr>
                                <tr>
                                    <td>200</td>
                                    <td><input onBlur={validateSum} type="number" onChange={(event)=> handleDenomChange(200,event)} /></td>
                                    <td>{denominationAmount[200].value}</td>
                                </tr>
                                <tr>
                                    <td>100</td>
                                    <td><input onBlur={validateSum} type="number" onChange={(event)=> handleDenomChange(100,event)} /></td>
                                    <td>{denominationAmount[100].value}</td>
                                </tr>
                                <tr>
                                    <td>50</td>
                                    <td><input onBlur={validateSum} type="number" onChange={(event)=> handleDenomChange(50,event)} /></td>
                                    <td>{denominationAmount[50].value}</td>
                                </tr>
                                <tr>
                                    <td>20</td>
                                    <td><input onBlur={validateSum} type="number" onChange={(event)=> handleDenomChange(20,event)} /></td>
                                    <td>{denominationAmount[20].value}</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td><input onBlur={validateSum} type="number" onChange={(event)=> handleDenomChange(10,event)} /></td>
                                    <td>{denominationAmount[10].value}</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td><input onBlur={validateSum} type="number" onChange={(event)=> handleDenomChange(5,event)} /></td>
                                    <td>{denominationAmount[5].value}</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td></td>
                                    <td id='total-value'>{denominationAmount[1000].value+denominationAmount[500].value+denominationAmount[200].value+denominationAmount[100].value+denominationAmount[50].value+denominationAmount[20].value+denominationAmount[10].value+denominationAmount[5].value}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>  
                </>
            )}
            
        </div>
    </>)
}

export default VaultOperationsPage