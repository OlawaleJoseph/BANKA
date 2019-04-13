import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import accountModel from '../models/account';
import userModel from '../models/users';

const assert = chai.assert;

chai.use(chaiHttp);

describe("Account Controller", () => {
    let token;
    let user, cashier, admin
    beforeEach( async () =>{
        userModel.usersDb = [];
        accountModel.accountsDb = [];
        const client = {
            firstName: "John",
            lastName: "Doe",
            email: "mike@gmail.com",
            type: "client",
            password: "password",
        };
        const adminStaff = {
            firstName: "Janet",
            lastName: "Doe",
            email: "admin@gmail.com",
            type: "staff",
            password: "password",
            isAdmin: true
        };
        const staff = {
            firstName: "Jane",
            lastName: "Doe",
            email: "cashier@gmail.com",
            type: "staff",
            password: "password",
            isAdmin: false
        };
        
        user = await userModel.createUser(client);
        cashier = await userModel.createUser(staff);
        admin = await userModel.createUser(adminStaff);
        token = await userModel.generateToken(user.email);
        cashierToken = await userModel.generateToken(cashier.email);
        adminToken = await userModel.generateToken(admin.email);

        account = accountModel.createAccount({
            amount: 50000,
            type: "current"
        }, user.id);
    })

    after(  () => {
        user = "";
        token = "";
        account = "";
    });

    describe("POST/accounts should create accounts", async () => {
        const client2 = {
            firstName: "Dean",
            lastName: "Shaw",
            email: "dean@gmail.com",
            type: "client",
            password: "abcdef",
        };
        const user2 = await userModel.createUser(client2);
        const token2 = await userModel.generateToken(user2.email);
        it("Should have a status of 200", () => {
            chai.request(server)
            .post('/api/v1/accounts')
            .set('x-access-token', token2)
            .send({"amount": 20000, "type": "savings"})
            .end((err, res) => {
                
               
                assert.equal(res.body.status, 201, "Status should be 201");
                assert.hasAllKeys(res.body.data, ["accountNumber", "firstName", "lastName", "email", "type", "openingBalance"], "Data should contain account details");
                assert.isNumber(res.body.data.accountNumber, "Account Number Should be a number");
                
            })
        });

        it("Should have a status of 400", () => {
            chai.request(server)
            .post('/api/v1/accounts')
            .set('x-access-token', token2)
            .send({"amount": 20000, "type": "savings"})
            .end((err, res) => {
             
                assert.equal(res.body.status, 400, "Status should be 400");
                
            })
        });
    });
});