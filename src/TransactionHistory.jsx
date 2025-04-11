import React, {useState} from 'react'

function TransactionHistory({searchedCustomer, searchFunction, accountRef}){
    const [thSection, setThSection] = useState("customerTransactions")

    return(
        <>
                                    {!searchedCustomer &&(
                                        
                                        <div style={{justifyContent:'center', width:'92%'}} className="withdrawal-page">
                                            <div className="withdrawal-header">
                                                <span>Transaction History</span>
                                            </div>
                                            <div className="search-div">
                                                <input className="search-input" type="text" ref={accountRef} placeholder="Enter account number here" />
                                                <button className="search-button" onClick={searchFunction}><i class="fa-solid fa-magnifying-glass"></i></button>
                                            </div>
                                        </div>
                                    )}
                                    {searchedCustomer &&(
                                        <>  
                                            <div className="found-acc-th">
                                                <div className="th-header">
                                                    <img src={searchedCustomer.image} alt="" style={{width:'7rem', height:'7rem', borderRadius:'5rem', border:'solid 3.5px #1F1F1F'}} />
                                                    <div className="th-header-details">
                                                        <span style={{fontWeight:'bold', fontSize:'0.9rem'}}>Customer name</span>
                                                        <span>{`${searchedCustomer.firstName.toUpperCase()} ${searchedCustomer.middleName.toUpperCase()} ${searchedCustomer.lastName.toUpperCase()}`}</span>
                                                    </div>
                                                    <div className="th-header-details">
                                                        <span style={{fontWeight:'bold'}}>Account number</span>
                                                        <span>{searchedCustomer.accountNumber}</span>
                                                    </div>
                                                    <div className="th-header-details">
                                                        <span style={{fontWeight:'bold'}}>Customer ID</span>
                                                        <span>{searchedCustomer.customerId}</span>
                                                    </div>
                                                </div>
                                                <nav className="th-nav">
                                                    <button onClick={()=> setThSection("customerTransactions")} style={thSection === "customerTransactions" ? {borderBottom:'solid 3.5px #D8494B'} : null}>View transactions</button>
                                                    <button onClick={()=> setThSection("customerInfo")} style={thSection === "customerInfo" ? {borderBottom:'solid 3.5px #D8494B'} : null}>Customer info</button>
                                                    <button onClick={()=> setThSection("customerMandate")} style={thSection === "customerMandate" ? {borderBottom:'solid 3.5px #D8494B'} : null}>Mandate</button>
                                                    <button onClick={()=> setThSection("customerRecords")} style={thSection === "customerRecords" ? {borderBottom:'solid 3.5px #D8494B'} : null}>Customer records</button>
                                                </nav>
                                                <div className="search-div2">
                                                    <input type="text" ref={accountRef} placeholder="Account number" />
                                                    <button className="search-button" onClick={searchFunction}><i class="fa-solid fa-magnifying-glass"></i></button>
                                                </div>
                                                <div className="table-div">
                                                    {thSection === "customerTransactions" && (
                                                        <>
                                                            <tr>
                                                                <th>Date</th>
                                                                <th>Description</th>
                                                                <th>Withdrawal</th>
                                                                <th>Lodgement</th>
                                                                <th>Account Balance</th>
                                                            </tr>
                                                            {searchedCustomer.transactions.map((transaction, index) =>(
                                                                <tr key={index}>
                                                                    <td>{transaction.transDate}</td>
                                                                    <td>{transaction.narration}</td>
                                                                    <td>{transaction.debitOrCredit == 'debit' ? transaction.transAmount : '-'}</td>
                                                                    <td>{transaction.debitOrCredit == 'credit' ? transaction.transAmount : '-'}</td>
                                                                    <td>{transaction.accountBalance}</td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                    )}
                                                    {thSection === "customerMandate" &&(
                                                        <div className="mandate-div">
                                                            <div className="mandate-details">
                                                                <span>Image</span>
                                                                <img src={searchedCustomer.image} style={{width:'10rem', height:'10rem'}} alt="" />
                                                            </div>
                                                            <div className="mandate-details">
                                                                <span>Signature</span>
                                                                <img src={searchedCustomer.signature} style={{width:'8rem', height:'5rem'}} alt="" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                        </>
                                    )}
                                </>
    )
}

export default TransactionHistory