import chai from 'chai';
import userModel from '../models/users';

const assert = chai.assert;


describe('Users Model', () => {
    
    describe('createUser(obj) should create and save a new user in the usersDb', () => {
        
        it('should create User Objects', async () => {
            const client = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "client",
            }
            const user = await userModel.createUser(client);
            assert.isObject(user, "user is an object");
            assert.include(user,{"id": user.id, "firstName": "Mike", "lastName": "Jordan", "email": "bankaadc@gmail.com", "password": user.password}, "should have all keys")
        });

        it("should be able to create staff Users", async () => {
            const staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
            }
            const user = await userModel.createUser(staff);
            assert.isString(user.type, "user.type should be a string");
            assert.equal(user.type, "staff", "user.type should be equl to staff");
            assert.hasAnyKeys(user, "isAdmin", "staff user should have isAdmin property");
            assert.isBoolean(user.isAdmin, "isAdmin should be a boolean");
        });

        it("should be able to create client Users", async () => {
            const staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "client",
                isAdmin: false
            }
            const user = await userModel.createUser(staff);
            assert.isString(user.type, "user.type should be a string");
            assert.equal(user.type, "client", "user.type should be equl to client");
            assert.doesNotHaveAnyKeys(user, "isAdmin", "client users should not have isAdmin property");
            
        });

        it("should save the user in usersDb", async () => {
            const staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
            }
            const createdStaff = await userModel.createUser(staff);
            const savedUser = userModel.usersDb.find((user) => user.id == createdStaff.id)
            assert.isNotNull(savedUser, "savedUser should be defined");
            assert.hasAllKeys(savedUser, ["id", "firstName", "lastName", "password", "email", "createdDate", "type", "isAdmin" ], "savedUser should be saved and have all the specified keys")
        })
    });

    describe("getAUser()", () => {
        it("Should return null for an invalid user id", ()=> {
            const user = userModel.getAUser(2)
            assert.isNull(user, "User should be null")
        });

        it("Should return user for a valid user id", async ()=> {
            const staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
            }
            const client  = await userModel.createUser(staff);
            const user = userModel.getAUser(client.email);
            assert.isObject(user, "user should be an object")
        });
    });

})