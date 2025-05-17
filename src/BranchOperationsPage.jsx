import React, {useState} from 'react'
import './App.css'

function BranchOperationsPage({handleBack, openBatchFunction, closeBatchFunction}){
    const [branchOperationSelect, setBranchOperationSelect] = useState()
    const now = new Date()
    const transactionDate = {newDate:`${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getFullYear())}`}
    
    return(<>
        <div style={{justifyContent:'center', width:'92%'}} className="withdrawal-page">
            
            {!branchOperationSelect && (
                <>
                    <div className="withdrawal-header">
                    <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={handleBack}><i class="fa-solid fa-arrow-left"></i></button>
                    <span>Branch Operations</span>
                    </div>
                    <div className='branchBatch-functions'>
                        <div onClick={()=>setBranchOperationSelect("batchOpen")} className="transaction-card">
                            <span>Open Branch Batch</span>
                            <i class="fa-solid fa-envelope-open-text"></i>
                        </div>
                        <div onClick={()=>setBranchOperationSelect("batchClose")} className="transaction-card">
                            <span>Close Branch Batch</span>
                            <i class="fa-solid fa-envelope"></i>
                        </div>
                    </div>
                </>
                
            )}
            {branchOperationSelect === "batchOpen" &&(
                <>
                    <div className="withdrawal-header">
                        <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={()=>{setBranchOperationSelect()}}><i class="fa-solid fa-arrow-left"></i></button>
                        <span>Branch Operations</span>
                    </div>
                    <div className='batch-class'>
                        <div>{transactionDate.newDate}</div>
                        <button onClick={openBatchFunction}>Save</button>
                    </div>
                </>
                
            )}
            {branchOperationSelect === "batchClose" &&(
                <>
                    <div className="withdrawal-header">
                        <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={()=>{setBranchOperationSelect()}}><i class="fa-solid fa-arrow-left"></i></button>
                        <span>Branch Operations</span>
                    </div>
                    <div className='batch-class'>
                        <div>{transactionDate.newDate}</div>
                        <button onClick={closeBatchFunction}>Save</button>
                    </div>
                </>
            )}
            
        </div>
    </>)
}

export default BranchOperationsPage