import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';
import accountModel from '../server/models/account';
import userModel from '../server/models/userModel';
import transactionModel from '../server/models/transaction';

const assert = chai.assert;

chai.use(chaiHttp);


describe.only("TRANSACTION CONTROLLER", () => {
    let cashierToken, customerToken, adminToken
    let cashier, customer, admin;
    let newTransaction, account;
    beforeEach( async () =>{
        const client = {
            firstName: "John",
            lastName: "Doe",
            email: "mike@gmail.com",
            type: "client",
            password: "password",
            isAdmin: false,
        }
        const staff = {
            firstName: "Jane",
            lastName: "Doe",
            email: "jane@gmail.com",
            type: "staff",
            password: "password",
            isAdmin: false,
        }
        const adminStaff = {
            firstName: "Janet",
            lastName: "Doe",
            email: "janet@gmail.com",
            type: "staff",
            password: "password",
            isAdmin: true,
        }
        customer = await userModel.createUser(client);
        cashier = await userModel.createUser(staff)
        admin = await userModel.createUser(adminStaff)
        cashierToken = await userModel.generateToken(cashier.email);
        customerToken = await userModel.generateToken(customer.email);
        adminToken = await userModel.generateToken(admin.email);

        account = accountModel.createAccount({
            amount: 500000,
            type: "current"
        }, customer.id);
        newTransaction = transactionModel.createTransaction(300000)
    })

    after(  () => {
        userModel.usersDb = []
        accountModel.accountsDb = []
        transactionModel.transactionsDb = [];
        
    });

    describe("POST/ should create CREDIT transaction", () => {
        
        it("Should create a Credit transaction and return a status of 201", () => {
            chai.request(server)
            .post(`/api/v1/transactions/${account.accountNumber}/credit`)
            .set("x-access-token", cashierToken)
            .send({amount: 73482.35})
            .end((err, res) => {
                
            
                assert.isObject(res.body, "res.body should be an object");
                assert.hasAllKeys(res.body.data, ["transactionId", "type", "accountNumber", "cashier", "amount", "balance"]);
                assert.equal(res.body.status, 201, "Status should be 201")
            })
        });
    });

    describe("POST/ should create DEBIT transaction", () => {
        it("Should create a Debit transaction and return a status of 201", () => {
            chai.request(server)
            .post(`/api/v1/transactions/${account.accountNumber}/debit`)
            .set("x-access-token", cashierToken)
            .send({amount: 73482.35})
            .end((err, res) => {
                
                
                
                assert.isObject(res.body, "res.body should be an object");
                assert.hasAllKeys(res.body.data, ["transactionId", "type", "accountNumber", "cashier", "amount", "balance"]);
                assert.equal(res.body.status, 201, "Status should be 201")
            })
        });
    });
    
});