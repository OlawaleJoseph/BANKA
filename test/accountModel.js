import chai from 'chai';
import accountModel from '../models/account';

const assert = chai.assert;

describe("Account Model", () => {
    
    describe("createAccount(data) should create new account", () => {
       
        it("Should return an object", () =>{
            const newAccountInfo = {
                "type": "savings",
                "amount": 5000.37,
              };
              const newAccount = accountModel.createAccount(newAccountInfo);
            assert.isObject(newAccount, "newAccount is an object");
        });

        it("New account should have accountNumber", () => {
            const newAccountInfo = {
                "type": "savings",
                "amount": 5000.37,
              };
              const newAccount = accountModel.createAccount(newAccountInfo);

            assert.call(accountModel.createAccount, accountModel.generateAccountNumber, "It should call generateAccountNumber to generate account number for new account");
            assert.hasAnyKeys(newAccount, ["accountNumber"], "new account should have account number")
        });

        it("Should be saved in the database", () => {
            const newAccountInfo = {
                "type": "savings",
                "amount": 5000.37,
              };
              const newAccount = accountModel.createAccount(newAccountInfo);

              const searchedAccount = accountModel.accountsDb.find((account) => account.accountNumber == newAccount.accountNumber);

              assert.isNotNull(searchedAccount, "Account created should be in the database");
              assert.isObject(searchedAccount, "Account should be an Object");
        });
        
    });

    describe("getAccount() should return account with the specified account number", () => {
        
          
        it("should return null if no account number is given", () => {
            const account = accountModel.getAccount();

            assert.isNull(account, "account should be null for empty account number")
        });

        it("should return null if invalid account number is given", () => {
          const account = accountModel.getAccount(0);

          assert.isNull(account, "account should be null for invalid account number")
      });

      it("Should return account object for a valid account number", () =>{
          const newAccountInfo = {
              "type": "current",
              "amount": 5000.37,
          };
          const newAccount = accountModel.createAccount(newAccountInfo);
          const id = newAccount.accountNumber;
          
          const searchedAccount = accountModel.getAccount(id);

          assert.isObject(searchedAccount, "Should be an object");
          assert.hasAnyKeys(searchedAccount, ["accountNumber", "id"], "it should have account number as property");
          assert.equal(searchedAccount.accountNumber, newAccount.accountNumber, "It should return the account with the same account number that is requested")
      });

    });

    describe("getAllAccounts() It should get all accounts in database", ()=> {
        it("Should return an Array of account objects", () => {
            const accounts = accountModel.getAllAccounts();

            assert.isArray(accounts, "Accounts should be an array");
        });
    });
})