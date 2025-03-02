import {useState, useEffect, useRef} from "react";
import customerbase from './customerbase.json'
import Modal from "./Modal";
import './App.css'

export default function Flexcubetest(){
    
    var transferList = JSON.parse(localStorage.getItem("transactions"))
    var userList = JSON.parse(localStorage.getItem("users"))
    var customerList = JSON.parse(localStorage.getItem("customers"))
    const [transactionSelect, setTransactionSelect] = useState()
    const [activeTransaction, setActiveTransaction] = useState()
    const [functionSelect, setFunctionSelect] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [users, setUsers] = useState(userList ? userList : [
        {userName: "Honcho", name:"Ifeoluwa Olayinka Adedeji", role: "Head of Operations", isSupervisor: true, branch: 271, password: "Adedeji1"},
        {userName: "Uchedike", name:"Uchechukwu Glory Ukadike", role: "Assistant Head of Operations", isSupervisor: true, branch: 271, password: "Uchedike1"},
        {userName: "Dare1", name:"Dare Adeola Adigun", role: "Teller", isSupervisor: false, branch: 271, password: "Dare1"},
        {userName: "Bose", name:"Bose Omolara Yekeen", role: "CCO", isSupervisor: false, branch: 271}
    ])
    const [customers, setCustomers] = useState(customerList ? customerList : customerbase)
    const [transactions, setTransactions] = useState(transferList ? transferList : [
        {transferTransactions: []},
        {depositTransactions: []},
        {withdrawalTransactions: []},
    ])
    useEffect(()=> {
        localStorage.setItem("customers", JSON.stringify(customers))
        console.log(customers)
    }, [customers])
    useEffect(()=> {
        localStorage.setItem("transactions", JSON.stringify(transactions))
        console.log(transactions)
    }, [transactions])
    useEffect(()=> {console.log(activeTransaction); console.log(transactionSelect)}, [activeTransaction])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [searchResult, setSearchResult] = useState()
    const [invalidLogin, setInvalidLogin] = useState(false)
    const [signUp, setSignUp] = useState(false)
    
    const userCreate = useRef()
    const passCreate = useRef()
    const roleCreate = useRef()
    const branchCreate = useRef()
    const acc1 = useRef()
    const acc2 = useRef()
    const transferAmount = useRef()

    const handleSearch = (event) => {
        const searchedUser = users.find(user => user.name == event.target.value)
        setSearchResult(searchedUser)
    }
    function handleUsernameChange(event){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    function fundTransfer(account1, account2, amount){
        setCustomers((prevUsers) => prevUsers.map((user) => {
            if(user.accountNumber === Number(account1)){
                return {...user, accountBalance: user.accountBalance - Number(amount)}
            }
            else if(user.accountNumber === Number(account2)){
                return {...user, accountBalance: user.accountBalance + Number(amount)}
            }
            return user
        }))
        
    }
    function handleDeposit(account1, amount){
        setCustomers((prevUsers) => prevUsers.map((user) => {
            if(user.accountNumber === Number(account1)){
                return {...user, accountBalance: user.accountBalance + Number(amount)}
            }
            return user
        }))
        
    }

    function handleWithdrawal(account1, amount){
        setCustomers((prevUsers) => prevUsers.map((user) => {
            if(user.accountNumber === Number(account1)){
                return {...user, accountBalance: user.accountBalance - Number(amount)}
            }
            return user
        }))
        
    }

    function handleTransaction(accnt1, amnt, accnt2){
        if(transactionSelect == "transfer"){
            let newTransaction = {
                transactionType: "transfer",
                debitAccount: accnt1,
                creditAccount: accnt2,
                amount: amnt,
            }
            setTransactions((prevTransactions) => prevTransactions.map((transaction, index) => 
                index === 0 ? {...transaction, transferTransactions:[...transaction.transferTransactions, newTransaction]} : transaction
            ))
        }
        else if(transactionSelect == "deposit"){
            let newTransaction = {
                transactionType: "deposit",
                creditAccount: accnt1,
                amount: amnt
            }
            setTransactions((prevTransactions)=> prevTransactions.map((transaction, index) =>
                index === 1 ? {...transaction, depositTransactions:[...transaction.depositTransactions, newTransaction]} : transaction
            ))
        }
        else if(transactionSelect == "withdrawal"){
            let newTransaction = {
                transactionType: "withdrawal",
                debitAccount: accnt1,
                amount: amnt
            }
            setTransactions((prevTransactions)=> prevTransactions.map((transaction, index) =>
                index === 2 ? {...transaction, withdrawalTransactions:[...transaction.withdrawalTransactions, newTransaction]} : transaction
            ))
        }
        
        acc1.current.value = ""
        if(acc2){acc2.current.value = ""}
        transferAmount.current.value = ""
    }

    const handleLogin = () =>{
        const searchedUser = users.find(user => user.userName == username)
        console.log(users)
        if(searchedUser && searchedUser.password == password){
            setIsLoggedin(true)
            setSearchResult(searchedUser)
            setPassword("")
            setPassword("")
            setInvalidLogin(false)
        }
        else{
            setInvalidLogin(true)
        }

    }
    
    const handleCreateUser = (a, b, c, d, callback) => {
        const newUser = { name: a, role: b, isSupervisor: false, branch: c, password: d };
    
        setUsers(prevUsers => {
            const updatedUsers = [...prevUsers, newUser];
    
            // Execute the callback function with the updated users array
            if (callback) {
                callback(updatedUsers);
            }
    
            return updatedUsers;
        });
    
        setSignUp(false);
        setIsLoggedin(false);
    };


    if(isLoggedin == false && signUp == false){
        return(<>
            <div className="login-page">
                <div className="login-div">
                    <div className="login-logo">ORAFLEX</div>
                    <div className="login-input-div">
                        <div className="input-class">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" onChange={handleUsernameChange} value={username} />
                        </div>
                        <div className="input-class">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={handlePasswordChange} value={password}/>
                        </div>
                        <button className="login-btn" onClick={handleLogin}>Log in</button>
                        <div style={{fontWeight: 600, fontSize: '1rem'}}><span>New here? <button style={{border: 'none', color:'blue', backgroundColor:'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer'}} onClick={()=>setSignUp(true)}>Sign up</button></span></div>
                    </div>
                </div>
            </div>  
        </>)
    }
    else if(isLoggedin){
        if(!searchResult.isSupervisor){
            if(!transactionSelect){
                return(<>
                <div className="posting-page">
                    <div className="side-bar">
                        <div className={functionSelect === "transactionFunction"? "function-div2": "function-div"} onClick={()=>setFunctionSelect("transactionFunction")}><i class="fa-solid fa-circle-dollar-to-slot"></i><span>Transaction functions</span></div>
                        <div onClick={()=>setFunctionSelect("maintenanceFunction")} className={functionSelect === "maintenanceFunction"? "function-div2": "function-div"}><i class="fa-solid fa-id-card"></i><span>Maintenances</span></div>
                        <div className={functionSelect === "historyFunction"? "function-div2": "function-div"} onClick={()=>setFunctionSelect("historyFunction")}><i class="fa-solid fa-table-list"></i><span>Transaction History</span></div>
                    </div>
                    <div className="right-side">
                        <div className="header">
                            <div className="header-logo">
                                ORAFLEX <span style={{fontSize:'1rem', fontWeight:'600', letterSpacing: '0px'}}>by Ifeoluwa</span>
                            </div>
                            <div className="header-right-div">
                                <div className="header-r-div-elements">
                                    <i style={{backgroundColor:'#496AD8', padding: '0.35rem', borderRadius: '2.5rem', color:'#f5f5f5', fontSize:'0.75rem'}} class="fa-solid fa-house"></i>
                                    <span>Branch {searchResult.branch}</span>
                                </div>
                                <div className="header-r-div-elements">
                                    <i style={{backgroundColor:'#496AD8', padding: '0.35rem', borderRadius: '2.5rem', color:'#f5f5f5', fontSize:'0.75rem'}} class="fa-solid fa-user"></i>
                                    <span>{searchResult.name}</span>
                                </div>
                                <div className="header-r-div-elements" style={{fontWeight:'400', cursor:'pointer'}} onClick={()=>{setIsLoggedin(false); setSignUp(false); setFunctionSelect("")}}>
                                    <i style={{backgroundColor:'#496AD8', padding: '0.35rem', borderRadius: '2.5rem', color:'#f5f5f5', fontSize:'0.75rem'}} class="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>Log out</span>  
                                </div>
                            </div>
                        </div>
                        <div className="right-main-div">
                            {!functionSelect && (
                                <div>
                                    Please select a function
                                </div>
                            )}
                            {functionSelect === "transactionFunction" &&(
                                <div className="transaction-selection">
                                    <div><button onClick={()=> setTransactionSelect("transfer")}>Funds Transfer</button></div>
                                    <div><button onClick={()=> setTransactionSelect("deposit")}>Deposit</button></div>
                                    <div><button onClick={()=> setTransactionSelect("withdrawal")}>Withdrawal</button></div>
                                </div>
                            )}
                            {functionSelect === "maintenanceFunction" &&(
                                <div>
                                    Maintenance function yet to be added
                                </div>
                            )}
                            {functionSelect === "historyFunction" &&(
                                <div>
                                    History function yet to be added
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                    
                </>)
            }
            else{
                if(transactionSelect == "transfer"){
                    return(<>
                        <div><span style={searchResult.isSupervisor ? {color: 'purple'}: null}>Welcome {searchResult.isSupervisor ? 'Admin' : null} {searchResult.name}</span></div>
                        <div>
                            <label htmlFor="account-number1">From account</label>
                            <input type="number" name="account-number1" ref={acc1} />
                            <label htmlFor="account-number2">To account</label>
                            <input type="number" name="account-number2" ref={acc2} />
                            <label htmlFor="transfer-amount">Amount</label>
                            <input type="number" name="transfer-amount" ref={transferAmount} />
                            <button onClick={()=> {handleTransaction(acc1.current.value, transferAmount.current.value, acc2.current.value); setTransactionSelect(null)}}>Process Transfer</button>
                            <div><button onClick={()=>{setIsLoggedin(false); setSignUp(false)}}>Log out</button></div>
                        </div>
                    </>)
                }
                else if(transactionSelect == "deposit"){
                    return(<>
                        <div><span style={searchResult.isSupervisor ? {color: 'purple'}: null}>Welcome {searchResult.isSupervisor ? 'Admin' : null} {searchResult.name}</span></div>
                        <div>
                            <label htmlFor="account-number1">Account Number</label>
                            <input type="number" name="account-number1" ref={acc1} />
                            <label htmlFor="transfer-amount">Amount</label>
                            <input type="number" name="transfer-amount" ref={transferAmount} />
                            <button onClick={()=> handleTransaction(acc1.current.value, transferAmount.current.value)}>Process Transaction</button>
                            <div><button onClick={()=>{setIsLoggedin(false); setSignUp(false)}}>Log out</button></div>
                        </div>
                    </>)
                }
                else if(transactionSelect == "withdrawal"){
                    return(<>
                        <div><span style={searchResult.isSupervisor ? {color: 'purple'}: null}>Welcome {searchResult.isSupervisor ? 'Admin' : null} {searchResult.name}</span></div>
                        <div>
                            <label htmlFor="account-number1">Account Number</label>
                            <input type="number" name="account-number1" ref={acc1} />
                            <label htmlFor="transfer-amount">Amount</label>
                            <input type="number" name="transfer-amount" ref={transferAmount} />
                            <button onClick={()=> handleTransaction(acc1.current.value, transferAmount.current.value)}>Process Transaction</button>
                            <div><button onClick={()=>{setIsLoggedin(false); setSignUp(false)}}>Log out</button></div>
                        </div>
                    </>)
                }
            }
        }
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
    }
    else if(signUp){
        return(<>
            <div><input type="text" ref={userCreate} placeholder="Username"/></div>
            <div><input type="password" ref={passCreate} placeholder="Password"/></div>
            <div><input type="text" ref={roleCreate} placeholder="Role" /></div>
            <div><input type="number" ref={branchCreate} placeholder="Branch" /></div>
            <div><button onClick={()=>handleCreateUser(userCreate.current.value, roleCreate.current.value, branchCreate.current.value, passCreate.current.value, (updatedUsers) => {
                localStorage.setItem("users", JSON.stringify(updatedUsers));
            })}>Sign up</button></div>
        </>)
    }
}