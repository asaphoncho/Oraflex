# React + Vite

Please use the following logins to test functions on the web app:

Inputters:

{userName: "Dare1", password: "Dare1", role: "Teller"}
{userName: "Bose", password: "Bose1" role: "CCO"}

Authorizers:

{userName: "Honcho", password: "Adedeji1", role: "Head of Operations"}
{userName: "Uchedike", password: "Uchedike1", role: "Assistant Head of Operations"}

Customer account numbers:
1234567890
2345678901
3456789012
4567890123
5678901234

Functions to test & the steps required:

Deposit
1. Log in as an inputter
2. Select "Transaction Functions" on the left plane
3. Select "Deposit"
4. Enter any account number from the customer data provided above. You can find more customer data in the "customerbase.json" file.
5. The account number and the account details of the inputted account is populated under customer details.
6. Enter transaction amount by populating the units column of the Denomination table.
7. Enter Depositor name
8. Save and confirm.
9. Log out
10. Log in as an authorizer
11. Select "Transaction Functions" on the left plane
12. Select "Authorize Transactions"
13. Locate the transaction from the list of displayed transactions using the unique reference number.
14. Click on the eye icon and enter the correct transaction amount to view the transaction.
15. Click on authorize after verifying the transaction details
16. Select "yes"
17. Click on Transaction History on the left plane
18. Input the account number the transaction was consummated on and search
19. The details of the concluded transaction should be visible in the customer's transaction history under "View Transactions".
