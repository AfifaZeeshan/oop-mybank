#! /usr/bin/env node

import inquirer from "inquirer"

// Bank Account Interface

interface BankAccount{
    accountNumber: number,
    balance: number,
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void

}
    // Bank Account Class
class BankAccount implements BankAccount{
accountNumber: number;
balance: number;

    constructor(accountNumber: number, balance:number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
// Debit Money
withdraw(amount: number): void {
    if (this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} is successful. Remaining balance is $${this.balance}.`);
        
    }else {
        console.log("Insufficient Balance.");
        
    }
}
// Credit Money
deposit(amount: number): void {
    if ( amount > 100){
        amount -= 1; // $1 fee charged if more than $100 is deposted
    }this.balance += amount;
    console.log(`Deposit of $${amount} is successful. Remaining balance is $${this.balance}`);
    
}
// Check Balance

checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
    
}
}

// Customer Class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobNumber = mobNumber;
        this.account = account
    }
}

// Create Bank Accounts

const accounts: BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];

// Create Customers

const customers: Customer[] = [
    new Customer ("Hamza", "Khan", "Male", 35, 3162345612, accounts[0]),
    new Customer ("Afifa", "Zeeshan", "Female", 34, 3122345612, accounts[1]),
    new Customer ("Zeeshan", "Siddiqui", "Male", 40, 3412345612, accounts[2])
]

// function to interact with bank account

async function service() {
    do{
        const accountNumberInput =  await inquirer.prompt(
            {
                name: "accountNumber",
                type: "number",
                message: "Enter your account number:"
            }
        ) 

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if (customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an option:",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch(ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount)
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                         name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    })
                    customer.account.withdraw(withdrawAmount.amount)
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                    case "Exit":
                    console.log("Exiting Bank Program.");
                    console.log("\n Thank you for using our bank services. Have a great Day.");
                    return;
                    
                    

            }
            
        }else {
            console.log("Invalid account number. Please try again.");
            
        }
    } while(true)
}
service()

