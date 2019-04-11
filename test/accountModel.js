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
});