import {useState, useEffect, useRef} from "react";
import customerbase from './customerbase.json'
import Modal from "./Modal";
import AuthorizationPage from "./AuthorizationPage";
import Modal2 from "./Modal2";
import TransactionHistory from "./TransactionHistory";
import DepositTransaction from "./DepositTransaction";
import BranchOperationsPage from "./BranchOperationsPage";
import VaultOperationsPage from "./VaultOperationsPage";

import './App.css'

export default function Flexcubetest(){
    //Localstorage
    var transferList = JSON.parse(localStorage.getItem("transactions"))
    var userList = JSON.parse(localStorage.getItem("users"))
    var customerList = JSON.parse(localStorage.getItem("customers"))
    let batchState = JSON.parse(localStorage.getItem("batchState"))
    

    //States
    const [transactionReference, setTransactionReference] = useState()
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
    const [confirmedTransaction, setConfirmedTransaction] = useState(false)
    const [authorizationConfirmation, setAuthorizationConfirmation] = useState(false)
    const [searchedCustomer, setSearchedCustomer] = useState()
    const [isBatchOpen, setIsBatchOpen] = useState(batchState? batchState : false)
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
    const [denominationAmount, setDenominationAmount] = useState({1000: {units: 0, value: Number(0)}, 500: {units: 0, value: 0}, 200:{units: 0, value: 0}, 100:{units: 0, value: 0}, 50:{units: 0, value: 0}, 20:{units: 0, value: 0}, 10:{units: 0, value: 0}, 5:{units: 0, value: 0}})
    
    
    useEffect(()=>{
        console.log(denominationAmount)
    }, [denominationAmount])

    useEffect(()=> {
        localStorage.setItem("customers", JSON.stringify(customers))
        console.log(customers)
    }, [customers])

    useEffect(()=> {
        localStorage.setItem("transactions", JSON.stringify(transactions))
        console.log(transactions)
    }, [transactions])

    useEffect(()=>{
        localStorage.setItem("batchState", JSON.stringify(isBatchOpen))
    }, [isBatchOpen])

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
    const totalValue = useRef()
    const randomReference = Math.floor(100000 + Math.random()*900000)

    function buyCashCBN(){
        const defaultDenominations = customers[50].balanceDenominations
        const updatedDenominations = {...defaultDenominations}
        const now = new Date()
        const transactionTime = {newDate:`${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getFullYear())}`, newTime:`${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`}

        for(const key in denominationAmount){
            if(updatedDenominations[key]){
                updatedDenominations[key] = {
                    units: updatedDenominations[key].units + denominationAmount[key].units,
                    value: updatedDenominations[key].value + denominationAmount[key].value
                }
            }
            else{
                updatedDenominations[key] = {...denominationAmount[key]}
            }
        }
        setCustomers((prevUsers) => prevUsers.map((user) => {
            if(user.accountNumber === 1101010000){
                return {...user, accountBalance: user.accountBalance + Number(transferAmount.current.value), balanceDenominations: updatedDenominations, transactions:[...user.transactions, 
                    {transDate:transactionTime.newDate, transTime: transactionTime.newTime, transAmount: Number(transferAmount.current.value), debitOrCredit: 'debit', narration: narrative.current.value, accountBalance: user.accountBalance + Number(transferAmount.current.value)}
                ]}
            }
            return user
        }))
    }
    function sellCashCBN(){
        const defaultDenominations = customers[50].balanceDenominations
        const updatedDenominations = {...defaultDenominations}
        const now = new Date()
        const transactionTime = {newDate:`${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getFullYear())}`, newTime:`${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`}

        for(const key in denominationAmount){
            if(updatedDenominations[key]){
                updatedDenominations[key] = {
                    units: updatedDenominations[key].units - denominationAmount[key].units,
                    value: updatedDenominations[key].value - denominationAmount[key].value
                }
            }
            else{
                updatedDenominations[key] = {...denominationAmount[key]}
            }
        }
        setCustomers((prevUsers) => prevUsers.map((user) => {
            if(user.accountNumber === 1101010000){
                return {...user, accountBalance: user.accountBalance - Number(transferAmount.current.value), balanceDenominations: updatedDenominations, transactions:[...user.transactions, 
                    {transDate:transactionTime.newDate, transTime: transactionTime.newTime, transAmount: Number(transferAmount.current.value), debitOrCredit: 'credit', narration: narrative.current.value, accountBalance: user.accountBalance - Number(transferAmount.current.value)}
                ]}
            }
            return user
        }))
    }

    function handleDenomChange(denomination, event){
        const denomUnits = Number(event.target.value) || 0
        setDenominationAmount(prevState => ({...prevState, [denomination]: {units: denomUnits, value: denomUnits * denomination}}))
    }
    const handleSearch = (event) => {
        const searchedUser = users.find(user => user.name == event.target.value)
        setSearchResult(searchedUser)
    }
    function searchCustomer(x){
        const searchedUser = customers.find(customer => customer.accountNumber === Number(x))
        if(searchedUser){
            setSearchedCustomer(searchedUser)
        }
    }
    function getTime(){
        const now = new Date()
        const transactionTime = {newDate:`${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getFullYear())}`, newTime:`${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`}
        return transactionTime
    }
    function handleUsernameChange(event){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    function fundTransfer(tran){
        setCustomers((prevUsers) => prevUsers.map((user) => {
            if(user.accountNumber === Number(tran.debitAccount)){
                return {...user, accountBalance: user.accountBalance - Number(tran.amount), transactions:[...user.transactions, 
                    {transDate:tran.transactionDate, transTime: tran.transactionTime, transAmount: tran.amount, debitOrCredit: 'debit', narration: tran.narrative, accountBalance: user.accountBalance - Number(tran.amount)}
                ]}
            }
            else if(user.accountNumber === Number(tran.creditAccount)){
                return {...user, accountBalance: user.accountBalance + Number(tran.amount), transactions:[...user.transactions, 
                    {transDate:tran.transactionDate, transTime: tran.transactionTime, transAmount: tran.amount, debitOrCredit: 'credit', narration: tran.narrative, accountBalance: user.accountBalance + Number(tran.amount)}]
                }
            }
            return user
        }))
        
    }
    function handleDeposit(tran){
        setCustomers((prevUsers) => prevUsers.map((user) => {
            if(user.accountNumber === Number(tran.creditAccount)){
                return {...user, accountBalance: user.accountBalance + Number(tran.amount), transactions:[...user.transactions, 
                    {transDate:tran.transactionDate, transTime: tran.transactionTime, transAmount: tran.amount, debitOrCredit: tran.debitOrCredit, narration: tran.narrative, accountBalance: user.accountBalance + Number(tran.amount)}
                ]}
            }
            return user
        }))   
    }
    function approvedTransaction(refId){
        setTransactions((prevTransactions) =>
            prevTransactions.map((category) => {
              return Object.keys(category).reduce((acc, key) => {
                acc[key] = category[key].filter((transaction) => transaction.reference !== refId);
                return acc;
              }, {});
            })
        );
        setConfirmedTransaction()
    }
    function handleWithdrawal(tran){
        setCustomers((prevUsers) => prevUsers.map((user) => {
            if(user.accountNumber === Number(tran.debitAccount)){
                return {...user, accountBalance: user.accountBalance - Number(tran.amount), transactions:[...user.transactions, 
                    {transDate:tran.transactionDate, transTime: tran.transactionTime, transAmount: tran.amount, debitOrCredit: tran.debitOrCredit, narration: tran.narrative, accountBalance: user.accountBalance - Number(tran.amount)}
                ]}
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
                narrative: narrative.current.value,
                reference: `TRF#${transactionReference}`,
                transactionDate: getTime().newDate,
                transactionTime: getTime().newTime
                
            }
            setTransactions((prevTransactions) => prevTransactions.map((transaction, index) => 
                index === 0 ? {...transaction, transferTransactions:[...transaction.transferTransactions, newTransaction]} : transaction
            ))
        }
        else if(transactionSelect == "deposit"){
                let newTransaction = {
                transactionType: "deposit",
                creditAccount: accnt1,
                amount: amnt,
                denominations: denominationAmount,
                denominationTotal: totalValue.current.value,
                narrative: narrative.current.textContent,
                depositorName: depositorName.current.value,
                reference: `DEP#${transactionReference}`,
                transactionDate: getTime().newDate,
                transactionTime: getTime().newTime,
                debitOrCredit: 'credit'
            }
            setTransactions((prevTransactions)=> prevTransactions.map((transaction, index) =>
                index === 1 ? {...transaction, depositTransactions:[...transaction.depositTransactions, newTransaction]} : transaction
            )) 
        }
        else if(transactionSelect == "withdrawal"){
            let newTransaction = {
                transactionType: "withdrawal",
                debitAccount: accnt1,
                amount: amnt,
                denominations: denominationAmount,
                denominationTotal: totalValue.current.value,
                narrative: narrative.current.textContent,
                reference: `WTD#${transactionReference}`,
                transactionDate: getTime().newDate,
                transactionTime: getTime().newTime,
                debitOrCredit: 'debit'
            }
            setTransactions((prevTransactions)=> prevTransactions.map((transaction, index) =>
                index === 2 ? {...transaction, withdrawalTransactions:[...transaction.withdrawalTransactions, newTransaction]} : transaction
            ))
        }
        setAuthorizationConfirmation(false)
        setTransactionSelect()
        setActiveCustomer()
        setActiveCustomer2()
        acc1.current.value = ""
        transferAmount.current.value = ""
        depositorName.current.value=""
        narrative.current.value=""
        acc2.current.value = ""
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
    function handleBack(){
        setTransactionSelect();
        setSearchedCustomer();
        setActiveCustomer(); 
        setTransactionReference()
        if(confirmedTransaction){setConfirmedTransaction(false)};
        setDenominationAmount({1000: {units: 0, value: Number(0)}, 500: {units: 0, value: 0}, 200:{units: 0, value: 0}, 100:{units: 0, value: 0}, 50:{units: 0, value: 0}, 20:{units: 0, value: 0}, 10:{units: 0, value: 0}, 5:{units: 0, value: 0}})
    }
    function handleLogout(){
        setIsLoggedin(false)
        setSignUp(false)
        setTransactionReference()
        setActiveCustomer()
        setActiveCustomer2()
        setTransactionSelect()
        setFunctionSelect()
        setActiveTransaction()
        setSearchedCustomer()
        setConfirmedTransaction(false)
        setDenominationAmount({1000: {units: 0, value: Number(0)}, 500: {units: 0, value: 0}, 200:{units: 0, value: 0}, 100:{units: 0, value: 0}, 50:{units: 0, value: 0}, 20:{units: 0, value: 0}, 10:{units: 0, value: 0}, 5:{units: 0, value: 0}})
        if(acc1){acc1.current.value = ""}
        if(acc2){acc1.current.value = ""}
        transferAmount.current.value = ""
        
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

    //Desktop view
    if(window.innerWidth > 1000){
        if(isLoggedin == false && signUp == false){
            //login page
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
            //Function category select
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
                                            {isBatchOpen ? null : <div className="batch-error-message">Please note that you cannot initiate a transaction as branch batch is not open</div>}
                                            <div onClick={isBatchOpen ? ()=> {setTransactionSelect("transfer"); setTransactionReference(randomReference)} : null} className="transaction-card" style={isBatchOpen ? null : {color:'#6a6a6a'}}>
                                            <span>Funds Transfer</span>
                                            <i class="fa-solid fa-money-bill-transfer"></i>
                                            </div>
                                            <div onClick={isBatchOpen ? ()=> {setTransactionSelect("deposit"); setTransactionReference(randomReference)} : null} className="transaction-card" style={isBatchOpen ? null : {color:'#6a6a6a'}}>
                                                <span>Deposit</span>
                                                <i class="fa-solid fa-cash-register"></i>
                                            </div>
                                            <div onClick={isBatchOpen ? ()=> {setTransactionSelect("withdrawal"); setTransactionReference(randomReference)} : null} className="transaction-card" style={isBatchOpen ? null : {color:'#6a6a6a'}}>
                                                <span>Withdrawal</span>
                                                <i class="fa-solid fa-sack-dollar"></i>
                                            </div> 
                                            </>)}
                                            {transactionSelect === "transfer" &&(
                                                <>
                                                    {authorizationConfirmation &&(
                                                        <Modal2>
                                                            <div>Are you sure you want to save transaction?</div>
                                                            <div className="modal-btn-div">
                                                                <button className="login-btn" style={{backgroundColor:'green'}} onClick={()=> {handleTransaction(acc1.current.value, transferAmount.current.value, acc2.current.value); setAuthorizationConfirmation(false)}}>Yes</button>
                                                                <button className="login-btn" onClick={()=>setAuthorizationConfirmation(false)}>Cancel</button>
                                                            </div>
                                                        </Modal2>
                                                    )}
                                                    <div className="withdrawal-page">                                               
                                                    <div className="withdrawal-header">
                                                        <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={handleBack}><i class="fa-solid fa-arrow-left"></i></button>
                                                        <span>Funds transfer</span>
                                                    </div>
                                                    <div className="withdrawal-details" style={{columnGap:'7rem'}}>
                                                        <div className="transaction-input-part">
                                                            <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Transaction Details</span>
                                                                <div className="input-class">
                                                                <div style={{fontWeight:'400',fontSize:'0.8rem', color:'grey'}}>Transaction reference: #{transactionReference}</div></div>
                                                            <div className="input-class">
                                                                <label htmlFor="account-number1">Debit Account</label>
                                                                <input onChange={handleType} type="number" name="account-number1" ref={acc1} />
                                                                <div style={{fontSize:'0.75rem', fontWeight: 400}}>{activeCustomer ? 
                                                                    <div>
                                                                        <span>{activeCustomer.firstName} {activeCustomer.middleName} {activeCustomer.lastName}</span>
                                                                    </div> : errorMessage}
                                                                </div>
                                                            </div>
                                                            <div className="input-class">
                                                                <label htmlFor="account-number2">Credit Account</label>
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
                                                                <input ref={narrative} type="text" name="transfer-narrative"/>
                                                            </div>
                                                            <button className="save-button" onClick={()=>setAuthorizationConfirmation(true)}>Save</button>
                                                            
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
                                                    </div>
                                                </>
                                                )}
                                            {transactionSelect == "deposit" &&(<>
                                                <DepositTransaction backFunction={handleBack} typeFunction={handleType} accountRef={acc1} depositFunction={()=> {handleTransaction(acc1.current.value, Number(transferAmount.current.textContent))}} transactionReference={transactionReference} activeCustomer={activeCustomer} denominationAmount={denominationAmount} errorMessage={errorMessage} amountRef={transferAmount} depositorRef={depositorName} narrativeRef={narrative} totalValueRef={totalValue} handleDenomChange={handleDenomChange}/>
                                            </>)}
                                            {transactionSelect == "withdrawal" &&(<>
                                                {authorizationConfirmation &&(
                                                    <Modal2>
                                                        <div>Are you sure you want to save transaction?</div>
                                                        <div className="modal-btn-div">
                                                            <button className="login-btn" style={{backgroundColor:'green'}} onClick={()=> {handleTransaction(acc1.current.value, Number(transferAmount.current.textContent)); setAuthorizationConfirmation(false); setTransactionSelect()}}>Yes</button>
                                                            <button className="login-btn" onClick={()=>setAuthorizationConfirmation(false)}>Cancel</button>
                                                        </div>
                                                    </Modal2>
                                                )}
                                                <div className="withdrawal-page">                                               
                                                    <div className="withdrawal-header">
                                                        <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={handleBack}><i class="fa-solid fa-arrow-left"></i></button>
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
                                                                <div className='auth-input' ref={transferAmount}>{denominationAmount[1000].value+denominationAmount[500].value+denominationAmount[200].value+denominationAmount[100].value+denominationAmount[50].value+denominationAmount[20].value+denominationAmount[10].value+denominationAmount[5].value}</div>
                                                            </div>
                                                            <div className="input-class">
                                                                <label htmlFor="transfer-narrative">Narrative</label>
                                                                <div className='auth-input' ref={narrative}>{activeCustomer ? `CSH WTD OF ${denominationAmount[1000].value+denominationAmount[500].value+denominationAmount[200].value+denominationAmount[100].value+denominationAmount[50].value+denominationAmount[20].value+denominationAmount[10].value+denominationAmount[5].value} IFO ${activeCustomer.firstName.toUpperCase()}` : 'nil'}</div>
                                                            </div>
                                                            <button className="save-button" onClick={()=> setAuthorizationConfirmation(true)}>Save</button>
                                                            
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
                                                                        <td ref={totalValue}>{denominationAmount[1000].value+denominationAmount[500].value+denominationAmount[200].value+denominationAmount[100].value+denominationAmount[50].value+denominationAmount[20].value+denominationAmount[10].value+denominationAmount[5].value}</td>
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
                                                                <span>{activeCustomer ? 'Regular' : 'nil'}</span>
                                                            </div>
                                                            <div className="details">
                                                                <span className="detail-labels">Phone number:</span>
                                                                <span>{activeCustomer ? activeCustomer.phoneNumber : 'nil'}</span>
                                                            </div>
                                                            <div className="details">
                                                                <span className="detail-labels">Signature:</span>
                                                                <div style={ activeCustomer ? {padding:'0.5rem 1rem 0.5rem 1rem', border:'grey solid 3px', backgroundColor:'white'} : null}>{activeCustomer && (<img src={activeCustomer.signature} alt="" />)}</div>  
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>)}
                                        </>
                                    )}
                                    {searchResult.isSupervisor &&(
                                        <>
                                            {isModalOpen && activeTransaction && activeTransaction.transactionType && (
                                                        <>
                                                            {activeTransaction.transactionType === "transfer" && (
                                                                    <Modal onClose1={()=> setIsModalOpen(false)} transaction={activeTransaction} handleTransactionConfirm={()=> {setConfirmedTransaction(true); setIsModalOpen(false)}}></Modal>)
                                                            }
                                                            {activeTransaction.transactionType === "deposit" && (
                                                                    <Modal onClose1={()=> setIsModalOpen(false)} transaction={activeTransaction} handleTransactionConfirm={()=> {setConfirmedTransaction(true); setIsModalOpen(false)}}></Modal>
                                                            )}
                                                            {activeTransaction.transactionType === "withdrawal" && (
                                                                    <Modal onClose1={()=> setIsModalOpen(false)} transaction={activeTransaction} handleTransactionConfirm={()=> {setConfirmedTransaction(true); setIsModalOpen(false)}}></Modal>
                                                            )}
                                                        </> 
                                            )}
                                            {!transactionSelect && (<>
                                                <div onClick={()=> setTransactionSelect("authorizeTransactions")} className="transaction-card">
                                                    <span>Authorize transactions</span>
                                                    <i class="fa-solid fa-money-bill-transfer"></i>
                                                </div>
                                                <div onClick={()=> setTransactionSelect("vaultOperations")} className="transaction-card">
                                                    <span>Vault Operations</span>
                                                    <i class="fa-solid fa-cash-register"></i>
                                                </div>
                                                <div onClick={()=> setTransactionSelect("branchOperations")} className="transaction-card">
                                                    <span>Branch Operations</span>
                                                    <i class="fa-solid fa-sack-dollar"></i>
                                                </div>
                                            </>
                                            )}
                                            {transactionSelect === "authorizeTransactions" &&(<>
                                                <div style={{justifyContent:'center', width:'92%'}} className="withdrawal-page">                                              
                                                    <div className="withdrawal-header">
                                                        <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={handleBack}><i class="fa-solid fa-arrow-left"></i></button>
                                                        <span>Authorize transactions</span>
                                                    </div>
                                                    {!confirmedTransaction && (
                                                    <div className="transactions-list" style={{marginTop:'1rem'}}>
                                                    {transactions.map((transaction, index)=>{
                                                        if(index === 0 && transaction.transferTransactions.length > 0){
                                                            return(<div className="auth-transfer">
                                                                    <div className="transaction-category">Funds Transfer</div>
                                                                    <div className="transactions-div">
                                                                        {transaction.transferTransactions.map((t, i) => (
                                                                            <div className="transaction" key={i}>
                                                                                <div className="transaction-heading">{t.reference}</div>
                                                                                <div className="transaction-body">
                                                                                    <div className="transaction-details">
                                                                                        <span style={{color:'gray'}}>Account number:</span>
                                                                                        <span style={{color: 'black', fontSize:'1rem'}}>{t.debitAccount}</span>
                                                                                    </div>
                                                                                    <div className="transaction-details">
                                                                                        <span style={{color:'gray'}}>Transaction amount</span>
                                                                                        <span style={{color: 'black'}}>*******</span>
                                                                                    </div>
                                                                                    <div className="transaction-details">
                                                                                        <span style={{color:'gray'}}>Teller ID:</span>
                                                                                        <span style={{color:'black'}}>ADIGUNDA</span>
                                                                                    </div>
                                                                                    <button className="view-btn" onClick={()=>{setIsModalOpen(true); setActiveTransaction(t)}}><i class="fa-solid fa-eye"></i></button>
                                                                                </div> 
                                                                            </div> 
                                                                        ))}
                                                                    </div>
                                                            </div>)
                                                        }
                                                        if(index === 1 && transaction.depositTransactions.length > 0){
                                                            return(<div className="auth-transfer">
                                                                    <div style={{fontSize:'1.5rem', fontWeight:'600', color:'grey'}}>Cash Deposit</div>
                                                                    <div className="transactions-div">
                                                                        {transaction.depositTransactions.map((t, i) => (
                                                                            <div className="transaction" key={i}>
                                                                                <div className="transaction-heading" style={{backgroundColor:'purple'}}>{t.reference}</div>
                                                                                <div className="transaction-body">
                                                                                <div className="transaction-details">
                                                                                        <span style={{color:'gray'}}>Account number:</span>
                                                                                        <span style={{color: 'black'}}>{t.creditAccount}</span>
                                                                                    </div>
                                                                                    <div className="transaction-details">
                                                                                        <span style={{color:'gray'}}>Transaction amount</span>
                                                                                        <span style={{color: 'black'}}>*******</span>
                                                                                    </div>
                                                                                    <div className="transaction-details">
                                                                                        <span style={{color:'gray'}}>Teller ID:</span>
                                                                                        <span style={{color:'black'}}>ADIGUNDA</span>
                                                                                    </div>
                                                                                    <button className="view-btn" onClick={()=>{setIsModalOpen(true); setActiveTransaction(t)}}><i class="fa-solid fa-eye"></i></button>
                                                                                </div> 
                                                                            </div> 
                                                                        ))}
                                                                    </div>
                                                            </div>)
                                                        }
                                                        if(index === 2 && transaction.withdrawalTransactions.length > 0){
                                                            return(<div className="auth-transfer">
                                                                    <div style={{fontSize:'1.5rem', fontWeight:'600', color:'grey'}}>Cash Withdrawal</div>
                                                                    <div className="transactions-div">
                                                                        {transaction.withdrawalTransactions.map((t, i) => (
                                                                            <div className="transaction" key={i}>
                                                                                <div className="transaction-heading" style={{backgroundColor:'#496AD8'}}>{t.reference}</div>
                                                                                <div className="transaction-body">
                                                                                <div className="transaction-details">
                                                                                        <span style={{color:'gray'}}>Account number:</span>
                                                                                        <span style={{color: 'black', fontWeight:'600'}}>{t.debitAccount}</span>
                                                                                    </div>
                                                                                    <div className="transaction-details">
                                                                                        <span style={{color:'gray'}}>Transaction amount</span>
                                                                                        <span style={{color: 'black', fontWeight:'600'}}>*******</span>
                                                                                    </div>
                                                                                    <div className="transaction-details">
                                                                                        <span style={{color:'gray'}}>Teller ID:</span>
                                                                                        <span style={{color:'black'}}>ADIGUNDA</span>
                                                                                    </div>
                                                                                    <button className="view-btn" onClick={()=>{setIsModalOpen(true); setActiveTransaction(t)}}><i class="fa-solid fa-eye"></i></button>
                                                                                </div> 
                                                                            </div> 
                                                                        ))}
                                                                    </div>
                                                            </div>)
                                                        }
                                                    })}
                                                    </div>
                                                    )}
                                                    {confirmedTransaction &&(
                                                        <>
                                                            {authorizationConfirmation &&(
                                                                <Modal2>
                                                                    <div>Are you sure you want to approve transaction?</div><br/>
                                                                    <div className="modal-btn-div">
                                                                        <button className="login-btn" style={{backgroundColor:'green'}} onClick={()=>{
                                                                            if(activeTransaction.transactionType === "deposit"){
                                                                                handleDeposit(activeTransaction)
                                                                            }
                                                                            else if(activeTransaction.transactionType === "withdrawal"){
                                                                                handleWithdrawal(activeTransaction)
                                                                            }
                                                                            else if(activeTransaction.transactionType === "transfer"){
                                                                                fundTransfer(activeTransaction)
                                                                            }
                                                                            approvedTransaction(activeTransaction.reference);
                                                                            setAuthorizationConfirmation(false)
                                                                        }}>Yes</button>
                                                                        <button className="login-btn" onClick={()=> setAuthorizationConfirmation(false)}>Cancel</button>
                                                                    </div>
                                                                </Modal2>
                                                            )}
                                                            <AuthorizationPage transaction={activeTransaction} onApprove={()=>{setAuthorizationConfirmation(true)}}
                                                            onReject={()=>approvedTransaction(activeTransaction.reference)} onClose={()=> {console.log("closed"); setConfirmedTransaction(false)}}/>
                                                        </>
                                                    )}
                                                    
                                                </div>
                                            </>)
                                            }
                                            {transactionSelect === "branchOperations" && (
                                                <BranchOperationsPage handleBack={handleBack} openBatchFunction={()=>{setIsBatchOpen(true)}} closeBatchFunction={()=>{setIsBatchOpen(false)}}/>
                                            )}
                                            {transactionSelect === "vaultOperations" &&(
                                                <VaultOperationsPage handleBack={handleBack} handleDenomChange={handleDenomChange} denominationAmount={denominationAmount} narrativeRef={narrative} amountRef={transferAmount} handleBuyCBN={buyCashCBN} handleSellCBN={sellCashCBN} clearInput={()=>setDenominationAmount({1000: {units: 0, value: Number(0)}, 500: {units: 0, value: 0}, 200:{units: 0, value: 0}, 100:{units: 0, value: 0}, 50:{units: 0, value: 0}, 20:{units: 0, value: 0}, 10:{units: 0, value: 0}, 5:{units: 0, value: 0}})}/>
                                            )}
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
                                <TransactionHistory searchFunction={()=>searchCustomer(acc1.current.value)} accountRef={acc1} searchedCustomer={searchedCustomer}/>
                                
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

    //mobile view
    else{
        return(<>
            <div className="mobile-view">
                <span>This page can only be loaded on a desktop/laptop computer and other devices with large screens.</span>
                <span>Please try again with a device that fits the description.</span>
            </div>
        </>)
    }
    
}