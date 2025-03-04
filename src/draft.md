else{
            return(<>
                {isModalOpen && activeTransaction && activeTransaction.transactionType && (
                            <>
                                {activeTransaction.transactionType === "transfer" && (
                                        <Modal onClose={()=> setIsModalOpen(false)} onConfirm={()=>{fundTransfer(activeTransaction.debitAccount, activeTransaction.creditAccount, activeTransaction.amount); setIsModalOpen(false)}} transaction={activeTransaction}></Modal>)
                                }
                                {activeTransaction.transactionType === "deposit" && (
                                        <Modal onClose={ ()=> setIsModalOpen(false)} onConfirm={()=>{handleDeposit(activeTransaction.creditAccount, activeTransaction.amount); setIsModalOpen(false)}} transaction={activeTransaction}></Modal>
                                )}
                                {activeTransaction.transactionType === "withdrawal" && (
                                        <Modal onClose={ ()=> setIsModalOpen(false)} onConfirm={()=>{handleWithdrawal(activeTransaction.debitAccount, activeTransaction.amount); setIsModalOpen(false)}} transaction={activeTransaction}></Modal>
                                )}
                            </> 
                )}
                <div className="transaction-page">
                    <div className="page-header">
                        <div className="oracle-logo">
                            ORACLE
                        </div>
                        <div className="user-details">
                            <div><button className="log-btn" onClick={()=>{setIsLoggedin(false); setSignUp(false); setTransactionSelect()}}>Log out</button></div>
                            <div className="">
                                <i style={{color: '#07634f'}} class="fa-solid fa-house"></i>
                                DEFAULTENTITY
                            </div>
                            <div>
                                <i style={{color: '#07634f'}} class="fa-solid fa-house"></i>
                                BRANCH {searchResult.branch}
                            </div>
                            <div className="name-holder">
                                {searchResult.name.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    <div className="transaction-area-holder">
                        <div className="transaction-area">
                            <div className="transaction-area2">{transferList.map((transaction, index) => 
                                { if(index === 0){
                                    return(<div key={index} className="transaction-div">
                                        <div className="transaction-title">Funds Transfer</div>
                                        <div className="transactions-holder">
                                            {transaction.transferTransactions.map((t,i) => (
                                                <div className="transaction" key={i}>
                                                    <div className="transaction-heading">Transfer #{i + 1}</div>
                                                    <div className="transaction-body">
                                                        <div><span style={{color:'gray'}}>Account number: <span style={{color: 'black'}}>{t.debitAccount}</span></span></div>
                                                        <div><span style={{color:'gray'}}>Transaction amount <span style={{color: 'black'}}>*****</span></span></div>
                                                        <div><span style={{color:'gray'}}>Teller ID:<span style={{color:'black'}}>ADIGUNDA</span></span></div>
                                                        <div><span style={{color:'gray'}}>Teller Remarks:<span style={{color:'black'}}>No Comments</span></span></div>
                                                        <div><span style={{color:'gray'}}>Supervisor ID:<span style={{color:'black'}}>HOP</span></span></div>
                                                        <div><span style={{color:'gray'}}>Supervisor Remarks:<span style={{color:'black'}}>No Comments</span></span></div>
                                                        <button className="view-btn" onClick={()=>{setIsModalOpen(true); setActiveTransaction(t)}}><i class="fa-solid fa-eye"></i></button>
                                                    </div> 
                                                </div>   
                                            ))}
                                        </div>
                                    </div>)
                                }
                                if(index === 1){
                                    return(
                                        <div key={index} className="transaction-div">
                                            <div className="transaction-title">Cash Deposit</div>
                                            <div className="transactions-holder">
                                                {transaction.depositTransactions.map((t,i) => (
                                                    <div className="transaction" key={i}>
                                                        <div className="transaction-heading">Deposit #{i + 1}</div>
                                                        <div className="transaction-body">
                                                            <div><span style={{color:'gray'}}>Account number: <span style={{color: 'black'}}>{t.creditAccount}</span></span></div>
                                                            <div><span style={{color:'gray'}}>Transaction amount <span style={{color: 'black'}}>*****</span></span></div>
                                                            <div><span style={{color:'gray'}}>Teller ID:<span style={{color:'black'}}>ADIGUNDA</span></span></div>
                                                            <div><span style={{color:'gray'}}>Teller Remarks:<span style={{color:'black'}}>No Comments</span></span></div>
                                                            <div><span style={{color:'gray'}}>Supervisor ID:<span style={{color:'black'}}>HOP</span></span></div>
                                                            <div><span style={{color:'gray'}}>Supervisor Remarks:<span style={{color:'black'}}>No Comments</span></span></div>
                                                            <button className="view-btn" onClick={()=>{setIsModalOpen(true); setActiveTransaction(t)}}><i class="fa-solid fa-eye"></i></button>
                                                        </div>
                                                    </div>   
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }
                                if(index === 2){
                                    return(
                                        <div key={index} className="transaction-div">
                                            <div className="transaction-title">Cash Withdrawal</div>
                                            <div className="transactions-holder">
                                            {transaction.withdrawalTransactions.map((t,i) => (
                                                <div className="transaction" key={i}>
                                                    <div className="transaction-heading">Withdrawal #{i + 1}</div>
                                                    <div className="transaction-body">
                                                        <div><span style={{color:'gray'}}>Account number: <span style={{color: 'black'}}>{t.debitAccount}</span></span></div>
                                                        <div><span style={{color:'gray'}}>Transaction amount <span style={{color: 'black'}}>*****</span></span></div>
                                                        <div><span style={{color:'gray'}}>Teller ID:<span style={{color:'black'}}>ADIGUNDA</span></span></div>
                                                        <div><span style={{color:'gray'}}>Teller Remarks:<span style={{color:'black'}}>No Comments</span></span></div>
                                                        <div><span style={{color:'gray'}}>Supervisor ID:<span style={{color:'black'}}>HOP</span></span></div>
                                                        <div><span style={{color:'gray'}}>Supervisor Remarks:<span style={{color:'black'}}>No Comments</span></span></div>
                                                        <button className="view-btn" onClick={()=>{setIsModalOpen(true); setActiveTransaction(t)}}><i class="fa-solid fa-eye"></i></button>
                                                    </div> 
                                                </div>   
                                            ))}
                                            </div>
                                        </div>
                                    )
                                }  
                                })}
                            </div>
                        </div>
                    </div>
                    
                </div>  
            </>)
        }