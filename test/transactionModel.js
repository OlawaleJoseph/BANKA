import chai from 'chai';
import transactionModel from '../models/transaction';

const assert = chai.assert;

describe("Transaction Model", () => {

    describe("createTransaction() will create new transaction", () => {
        it("returns an object", () =>{
            const transaction = transactionModel.createTransaction("300000");
            assert.isObject(transaction, "Transaction should be an object");

        });

        it("The transaction Object should contain keys id, createdOn, amount", () =>{
            const transaction = transactionModel.createTransaction("300000");
            assert.hasAllKeys(transaction, ["amount", "createdOn", "id", "status"], "Transaction should have keys id, amount and createdOn");
        });

        it("It should save the transaction Object in the database", () => {
            const transaction = transactionModel.createTransaction("300000");
            assert.include(transactionModel.transactionsDb, transaction, "Transaction object should be saved in the database")
        });
    });
});