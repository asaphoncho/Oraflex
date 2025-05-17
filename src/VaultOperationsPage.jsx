import React, {useState} from 'react'
import './App.css'

function VaultOperationsPage({openVaultFunction, closeVaultFunction, handleBack}){
    const [vaultOperationSelect, setVaultOperationSelect] = useState()
    const now = new Date()
    const transactionDate = {newDate:`${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getFullYear())}`}

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
                        <div onClick={()=>setVaultOperationSelect("vaultClose")} className="transaction-cardii">
                            <span>Buy Cash From CBN</span>
                            <i class="fa-solid fa-circle-dollar-to-slot"></i>
                        </div>
                        <div onClick={()=>setVaultOperationSelect("vaultClose")} className="transaction-cardii">
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
            
        </div>
    </>)
}

export default VaultOperationsPage