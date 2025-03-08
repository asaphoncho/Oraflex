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
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [searchResult, setSearchResult] = useState()
    const [invalidLogin, setInvalidLogin] = useState(false)
    const [signUp, setSignUp] = useState(false)
    const [activeCustomer, setActiveCustomer] = useState()
    const [errorMessage, setErrorMessage] = useState("Please enter an account number")
    const [activeCustomer2, setActiveCustomer2] = useState()
    const [errorMessage2, setErrorMessage2] = useState("Please enter an account number")
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
    
    const userCreate = useRef()
    const passCreate = useRef()
    const roleCreate = useRef()
    const branchCreate = useRef()
    const acc1 = useRef()
    const acc2 = useRef()
    const transferAmount = useRef()
    const narrative = useRef()
    const depositorName = useRef()


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
        transferAmount.current.value = ""
        if(acc2){acc2.current.value = ""}
        setActiveCustomer()
        setActiveCustomer2()
    }
    function handleType(event){
        if(event.target.value.length === 10){
            const foundAccount = customers.find(c => c.accountNumber === Number(event.target.value))
            if(foundAccount){
                setActiveCustomer(foundAccount)
            }
            else{
                setErrorMessage("account not found")
            }
        }
        else if(event.target.value.length < 10 && event.target.value.length != 0){
            setErrorMessage("please enter up to 10 digits")
            setActiveCustomer()
        }
        else if(event.target.value.length > 10){setActiveCustomer(); setErrorMessage("Maximum number of characters is 10")}
        else if(event.target.value.length === 0){setActiveCustomer(); setErrorMessage("Please enter an account number")}
    }
    function handleType2(event){
        if(event.target.value.length === 10){
            const foundAccount = customers.find(c => c.accountNumber === Number(event.target.value))
            if(foundAccount){
                setActiveCustomer2(foundAccount)
            }
            else{
                setErrorMessage2("account not found")
            }
        }
        else if(event.target.value.length < 10 && event.target.value.length != 0){
            setErrorMessage2("please enter up to 10 digits")
            setActiveCustomer2()
        }
        else if(event.target.value.length > 10){setActiveCustomer2(); setErrorMessage2("Maximum number of characters is 10")}
        else if(event.target.value.length === 0){setActiveCustomer2(); setErrorMessage2("Please enter an account number")}
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
            setCustomers((prevCustomer) => prevCustomer.map((customer, index)=> {return {...customer, image: `./assets/img${index + 1}.png`, signature: `./assets/signature${index + 1}.png`}}))
            console.log(customers)
        }
        else{
            setInvalidLogin(true)
        }

    }
    function handleLogout(){
        setIsLoggedin(false)
        setSignUp(false)
        acc1.current.value = ""
        acc2.current.value = ""
        transferAmount.current.value = ""
        setActiveCustomer()
        setActiveCustomer2()
        setTransactionSelect()
        setFunctionSelect()
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
                            <div className="header-r-div-elements" style={{fontWeight:'400', cursor:'pointer'}} onClick={handleLogout}>
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
                                {!searchResult.isSupervisor &&(
                                    <>
                                        {!transactionSelect &&(<>
                                            <div onClick={()=> setTransactionSelect("transfer")} className="transaction-card">
                                            <span>Funds Transfer</span>
                                            <i class="fa-solid fa-money-bill-transfer"></i>
                                        </div>
                                        <div onClick={()=> setTransactionSelect("deposit")} className="transaction-card">
                                            <span>Deposit</span>
                                            <i class="fa-solid fa-cash-register"></i>
                                        </div>
                                        <div onClick={()=> setTransactionSelect("withdrawal")} className="transaction-card">
                                            <span>Withdrawal</span>
                                            <i class="fa-solid fa-sack-dollar"></i>
                                        </div> 
                                        </>)}
                                        {transactionSelect == "transfer" &&(
                                            <div className="withdrawal-page">                                               
                                            <div className="withdrawal-header">
                                                <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={()=>setTransactionSelect(null)}><i class="fa-solid fa-arrow-left"></i></button>
                                                <span>Funds transfer</span>
                                            </div>
                                            <div className="withdrawal-details">
                                                <div className="transaction-input-part">
                                                    <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Transaction Details</span>
                                                    <div className="input-class">
                                                        <label htmlFor="account-number1">Debit Number</label>
                                                        <input onChange={handleType} type="number" name="account-number1" ref={acc1} />
                                                        <div style={{fontSize:'0.75rem', fontWeight: 400}}>{activeCustomer ? 
                                                            <div>
                                                                <span>{activeCustomer.firstName} {activeCustomer.middleName} {activeCustomer.lastName}</span>
                                                            </div> : errorMessage}
                                                        </div>
                                                    </div>
                                                    <div className="input-class">
                                                        <label htmlFor="account-number2">Credit Number</label>
                                                        <input onChange={handleType2} type="number" name="account-number2" ref={acc2} />
                                                        <div style={{fontSize:'0.75rem', fontWeight: 400}}>{activeCustomer2 ? 
                                                            <div>
                                                                <span>{activeCustomer2.firstName} {activeCustomer2.middleName} {activeCustomer2.lastName}</span>
                                                            </div> : errorMessage2}
                                                        </div>
                                                    </div>
                                                    <div className="input-class">
                                                        <label htmlFor="transfer-amount">Amount</label>
                                                        <input type="number" name="transfer-amount" ref={transferAmount} />
                                                    </div>
                                                    <div className="input-class">
                                                        <label htmlFor="transfer-narrative">Narrative</label>
                                                        <input type="text" name="transfer-narrative"/>
                                                    </div>
                                                    <button className="save-button" onClick={()=> handleTransaction(acc1.current.value, transferAmount.current.value, acc2.current.value)}>Save</button>
                                                    
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
                                                        <span className="detail-labels">Phone number:</span>
                                                        <span>{activeCustomer ? activeCustomer.phoneNumber : 'nil'}</span>
                                                    </div>
                                                    <div className="details">
                                                        <span className="detail-labels">Signature:</span>
                                                        {activeCustomer && (<img src={activeCustomer.signature} alt="" />)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)}
                                        {transactionSelect == "deposit" &&(<>
                                            <div className="withdrawal-page">                                               
                                                <div className="withdrawal-header">
                                                    <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={()=>setTransactionSelect(null)}><i class="fa-solid fa-arrow-left"></i></button>
                                                    <span>Cash deposit</span>
                                                </div>
                                                <div className="withdrawal-details">
                                                    <div className="transaction-input-part">
                                                        <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Transaction Details</span>
                                                        <div className="input-class">
                                                            <label htmlFor="account-number1">Account Number</label>
                                                            <input onChange={handleType} type="number" name="account-number1" ref={acc1} />
                                                            <div style={{fontSize:'0.75rem', fontWeight: 400}}>{activeCustomer ? 
                                                                <div>
                                                                    <span>{activeCustomer.firstName} {activeCustomer.middleName} {activeCustomer.lastName}</span>
                                                                </div> : errorMessage}
                                                            </div>
                                                        </div>
                                                        <div className="input-class">
                                                            <label htmlFor="transfer-amount">Amount</label>
                                                            <input type="number" name="transfer-amount" ref={transferAmount} />
                                                        </div>
                                                        <div className="input-class">
                                                            <label htmlFor="transfer-narrative">Depositor Name</label>
                                                            <input type="text" name="transfer-narrative" ref={transferAmount} />
                                                        </div>
                                                        <div className="input-class">
                                                            <label htmlFor="transfer-narrative">Narrative</label>
                                                            <input type="text" name="transfer-narrative" ref={transferAmount} />
                                                        </div>
                                                        <button className="save-button" onClick={()=> handleTransaction(acc1.current.value, transferAmount.current.value)}>Save</button>
                                                        
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
                                        </>)}
                                        {transactionSelect == "withdrawal" &&(<>
                                            <div className="withdrawal-page">                                               
                                                <div className="withdrawal-header">
                                                    <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={()=>setTransactionSelect(null)}><i class="fa-solid fa-arrow-left"></i></button>
                                                    <span>Cash Withdrawal</span>
                                                </div>
                                                <div className="withdrawal-details">
                                                    <div className="transaction-input-part">
                                                        <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Transaction Details</span>
                                                        <div className="input-class">
                                                            <label htmlFor="account-number1">Account Number</label>
                                                            <input onChange={handleType} type="number" name="account-number1" ref={acc1} />
                                                            <div style={{fontSize:'0.75rem', fontWeight: 400}}>{activeCustomer ? 
                                                                <div>
                                                                    <span>{activeCustomer.firstName} {activeCustomer.middleName} {activeCustomer.lastName}</span>
                                                                </div> : errorMessage}
                                                            </div>
                                                        </div>
                                                        <div className="input-class">
                                                            <label htmlFor="transfer-amount">Amount</label>
                                                            <input type="number" name="transfer-amount" ref={transferAmount} />
                                                        </div>
                                                        <div className="input-class">
                                                            <label htmlFor="transfer-narrative">Narrative</label>
                                                            <input type="text" name="transfer-narrative" ref={transferAmount} />
                                                        </div>
                                                        <button className="save-button" onClick={()=> handleTransaction(acc1.current.value, transferAmount.current.value)}>Save</button>
                                                        
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
                                        </>)}
                                    </>
                                )}
                                {searchResult.isSupervisor &&(
                                    <>
                                        {!transactionSelect && (<>
                                            <div onClick={()=> setTransactionSelect("authorizeTransactions")} className="transaction-card">
                                                <span>Authorize transactions</span>
                                                <i class="fa-solid fa-money-bill-transfer"></i>
                                            </div>
                                            <div onClick={()=> setTransactionSelect("deposit")} className="transaction-card">
                                                <span>Vault Operations</span>
                                                <i class="fa-solid fa-cash-register"></i>
                                            </div>
                                            <div onClick={()=> setTransactionSelect("withdrawal")} className="transaction-card">
                                                <span>Branch Operations</span>
                                                <i class="fa-solid fa-sack-dollar"></i>
                                            </div>
                                            <div onClick={()=> setTransactionSelect("withdrawal")} className="transaction-card">
                                                <span>Branch Operations</span>
                                                <i class="fa-solid fa-sack-dollar"></i>
                                            </div>
                                        </>
                                        )}
                                        {transactionSelect === "authorizeTransactions" &&(<>
                                            <div className="withdrawal-page">                                              
                                                <div className="withdrawal-header">
                                                    <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={()=>setTransactionSelect(null)}><i class="fa-solid fa-arrow-left"></i></button>
                                                    <span>Authorize transactions</span>
                                                </div>
                                                <div className="transactions-list">
                                                    {transferList.map((transaction, index)=>{
                                                        if(index === 0){
                                                            return(<div className="auth-transfer">
                                                                    <div>Funds Transfer</div>
                                                                    <div className="transactions-div">
                                                                        {transaction.transferTransactions.map((t, i) => (
                                                                            <div className="transaction" key={i}>
                                                                                <div className="transaction-heading">Transfer #{i + 1}</div>
                                                                                <div className="transaction-body">
                                                                                    <div><span style={{color:'gray'}}>Account number: <span style={{color: 'black'}}>{t.debitAccount}</span></span></div>
                                                                                    <div><span style={{color:'gray'}}>Transaction amount <span style={{color: 'black'}}>*****</span></span></div>
                                                                                    <div><span style={{color:'gray'}}>Teller ID:<span style={{color:'black'}}>ADIGUNDA</span></span></div>
                                                                                    <button className="view-btn" onClick={()=>{setIsModalOpen(true); setActiveTransaction(t)}}><i class="fa-solid fa-eye"></i></button>
                                                                                </div> 
                                                                            </div> 
                                                                        ))}
                                                                    </div>
                                                            </div>)
                                                        }
                                                        if(index === 1){
                                                            return(<div className="auth-transfer">
                                                                    <div>Cash Deposit</div>
                                                                    <div className="transactions-div">
                                                                        {transaction.depositTransactions.map((t, i) => (
                                                                            <div className="transaction" key={i}>
                                                                                <div className="transaction-heading">Deposit #{i + 1}</div>
                                                                                <div className="transaction-body">
                                                                                    <div><span style={{color:'gray'}}>Account number: <span style={{color: 'black'}}>{t.creditAccount}</span></span></div>
                                                                                    <div><span style={{color:'gray'}}>Transaction amount <span style={{color: 'black'}}>*****</span></span></div>
                                                                                    <div><span style={{color:'gray'}}>Teller ID:<span style={{color:'black'}}>ADIGUNDA</span></span></div>
                                                                                    <button className="view-btn" onClick={()=>{setIsModalOpen(true); setActiveTransaction(t)}}><i class="fa-solid fa-eye"></i></button>
                                                                                </div> 
                                                                            </div> 
                                                                        ))}
                                                                    </div>
                                                            </div>)
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </>)}
                                        
                                    </>
                                )}
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