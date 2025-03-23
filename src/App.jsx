import {useState, useEffect, useRef} from "react";
import customerbase from './customerbase.json'
import Modal from "./Modal";
import AuthorizationPage from "./authorizationPage";
import './App.css'

export default function Flexcubetest(){
    
    var transferList = JSON.parse(localStorage.getItem("transactions"))
    var userList = JSON.parse(localStorage.getItem("users"))
    const [transactionReference, setTransactionReference] = useState()
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
    const [confirmedTransaction, setConfirmedTransaction] = useState(false)
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
    const [denominationAmount, setDenominationAmount] = useState({1000: 0, 500: 0, 200:0, 100:0, 50:0, 20:0, 10:0, 5:0})
    function handleDenomChange(denomination, event){
        const denomUnits = Number(event.target.value) || 0
        setDenominationAmount(prevState => ({...prevState, [denomination]: denomUnits * denomination}))
    }
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
                narrative: narrative.current.value,
                reference: `TRF#${transactionReference}`
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
                narrative: narrative.current.value,
                depositorName: depositorName.current.value,
                reference: `DEP#${transactionReference}`
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
                reference: `WTD#${transactionReference}`
            }
            setTransactions((prevTransactions)=> prevTransactions.map((transaction, index) =>
                index === 2 ? {...transaction, withdrawalTransactions:[...transaction.withdrawalTransactions, newTransaction]} : transaction
            ))
        }
        
        acc1.current.value = ""
        transferAmount.current.value = ""
        depositorName.current.value=""
        narrative.current.value=""
        setTransactionSelect()
        setActiveCustomer()
        setActiveCustomer2()
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
        setActiveCustomer(); 
        setTransactionReference()
        if(confirmedTransaction){setConfirmedTransaction(false)};
        setDenominationAmount({1000: 0, 500: 0, 200:0, 100:0, 50:0, 20:0, 10:0, 5:0})
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
        setConfirmedTransaction(false)
        setDenominationAmount({1000: 0, 500: 0, 200:0, 100:0, 50:0, 20:0, 10:0, 5:0})
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
                                            <div onClick={()=> {setTransactionSelect("transfer"); setTransactionReference(Math.floor(100000 + Math.random()*900000))}} className="transaction-card">
                                            <span>Funds Transfer</span>
                                            <i class="fa-solid fa-money-bill-transfer"></i>
                                        </div>
                                        <div onClick={()=> {setTransactionSelect("deposit"); setTransactionReference(Math.floor(100000 + Math.random()*900000))}} className="transaction-card">
                                            <span>Deposit</span>
                                            <i class="fa-solid fa-cash-register"></i>
                                        </div>
                                        <div onClick={()=> {setTransactionSelect("withdrawal"); setTransactionReference(Math.floor(100000 + Math.random()*900000))}} className="transaction-card">
                                            <span>Withdrawal</span>
                                            <i class="fa-solid fa-sack-dollar"></i>
                                        </div> 
                                        </>)}
                                        {transactionSelect == "transfer" &&(
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
                                                    <button className="save-button" onClick={()=> handleTransaction(acc1.current.value, transferAmount.current.value, acc2.current.value)}>Save</button>
                                                    
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
                                        </div>)}
                                        {transactionSelect == "deposit" &&(<>
                                            <div className="withdrawal-page">                                               
                                                <div className="withdrawal-header">
                                                    <button style={{color:'#D8494B', fontSize:'2.5rem', border:'none', position:'absolute', left:'4.25rem', backgroundColor:'#d8494b00', cursor:'pointer'}} onClick={handleBack}><i class="fa-solid fa-arrow-left"></i></button>
                                                    <span>Cash deposit</span>
                                                </div>
                                                <div className="withdrawal-details">
                                                    <div className="transaction-input-part">
                                                        <span style={{fontWeight:'600', fontSize:'1.25rem', color:''}}>Transaction Details</span>
                                                        <div className="input-class">
                                                        <div style={{fontWeight:'400',fontSize:'0.8rem', color:'grey'}}>Transaction reference: #{transactionReference}</div>
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
                                                            <input type="text" name="transfer-narrative" ref={depositorName} />
                                                        </div>
                                                        <div className="input-class">
                                                            <label htmlFor="transfer-narrative">Narrative</label>
                                                            <input type="text" name="transfer-narrative" ref={narrative} />
                                                        </div>
                                                        <button className="save-button" onClick={()=> handleTransaction(acc1.current.value, transferAmount.current.value)}>Save</button>
                                                        
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
                                                                    <td style={{width:'105px'}}>{denominationAmount[1000]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>500</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(500,event)} /></td>
                                                                    <td>{denominationAmount[500]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>200</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(200,event)} /></td>
                                                                    <td>{denominationAmount[200]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>100</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(100,event)} /></td>
                                                                    <td>{denominationAmount[100]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>50</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(50,event)} /></td>
                                                                    <td>{denominationAmount[50]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>20</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(20,event)} /></td>
                                                                    <td>{denominationAmount[20]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>10</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(10,event)} /></td>
                                                                    <td>{denominationAmount[10]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(5,event)} /></td>
                                                                    <td>{denominationAmount[5]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total</td>
                                                                    <td></td>
                                                                    <td ref={totalValue}>{denominationAmount[1000]+denominationAmount[500]+denominationAmount[200]+denominationAmount[100]+denominationAmount[50]+denominationAmount[20]+denominationAmount[10]+denominationAmount[5]}</td>
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
                                                            {activeCustomer && (<img src={activeCustomer.signature} alt="" />)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>)}
                                        {transactionSelect == "withdrawal" &&(<>
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
                                                            <input type="number" name="transfer-amount" ref={transferAmount} />
                                                        </div>
                                                        <div className="input-class">
                                                            <label htmlFor="transfer-narrative">Narrative</label>
                                                            <input type="text" name="transfer-narrative" ref={narrative} />
                                                        </div>
                                                        <button className="save-button" onClick={()=> handleTransaction(acc1.current.value, transferAmount.current.value)}>Save</button>
                                                        
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
                                                                    <td style={{width:'105px'}}>{denominationAmount[1000]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>500</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(500,event)} /></td>
                                                                    <td>{denominationAmount[500]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>200</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(200,event)} /></td>
                                                                    <td>{denominationAmount[200]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>100</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(100,event)} /></td>
                                                                    <td>{denominationAmount[100]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>50</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(50,event)} /></td>
                                                                    <td>{denominationAmount[50]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>20</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(20,event)} /></td>
                                                                    <td>{denominationAmount[20]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>10</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(10,event)} /></td>
                                                                    <td>{denominationAmount[10]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td><input type="number" onChange={(event)=> handleDenomChange(5,event)} /></td>
                                                                    <td>{denominationAmount[5]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total</td>
                                                                    <td></td>
                                                                    <td ref={totalValue}>{denominationAmount[1000]+denominationAmount[500]+denominationAmount[200]+denominationAmount[100]+denominationAmount[50]+denominationAmount[20]+denominationAmount[10]+denominationAmount[5]}</td>
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
                                                    <AuthorizationPage transaction={activeTransaction} onApprove={()=>{
                                                        if(activeTransaction.transactionType === "deposit"){
                                                            handleDeposit(activeTransaction.creditAccount,activeTransaction.amount)
                                                        }
                                                        else if(activeTransaction.transactionType === "withdrawal"){
                                                            handleWithdrawal(activeTransaction.debitAccount, activeTransaction.amount)
                                                        }
                                                        else if(activeTransaction.transactionType === "transfer"){
                                                            fundTransfer(activeTransaction.debitAccount, activeTransaction.creditAccount, activeTransaction.amount)
                                                        }
                                                        approvedTransaction(activeTransaction.reference)
                                                    }} onReject={()=>approvedTransaction(activeTransaction.reference)} onClose={()=> {console.log("closed"); setConfirmedTransaction(false)}}/>
                                                )}
                                                
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