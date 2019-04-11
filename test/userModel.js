import chai from 'chai';
import userModel from '../models/users';
import moment from 'moment';

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


    describe("login()", () => {
        
        it("Should return null for wrong email", async () => {
          
            const wrongEmail = await userModel.login("a", "password");
            assert.isNull(wrongEmail, "Wrong email should return null");
        });

        it("Should return null for wrong password", async () => {
            const client = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "abcde@gmail.com",
                password: "password",
                type: "client",
            }
            const user = await userModel.createUser(client);
            const wrongPassword = await userModel.login(user.email, "a");
           
            assert.isNull(wrongPassword, "Wrong email should return null");
        });

        it("Should return user object for users with the right login credentials", async () => {
            const user = {
                firstName: "Moses",
                lastName: "John",
                email: "abc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
            }
            const createdUser = await userModel.createUser(user);
            const client = await userModel.login(createdUser.email, "password");
            
            assert.isNotNull(client, "User should not be empty");
            assert.isObject(client, "User should be an Object");
            
        })
    });

    describe("ResetPassword(email)", () => {

        it("Should return null for an unregistered user/email", async () => {
            const user = await userModel.resetPassword("aaaa@gmail.com");
            assert.isNull(user, "User email should be null");
        });

        it("Should call the generateRandomPasssword()", () => {
            
            assert.call(userModel.resetPassword, userModel.generateRandompassword, "ResetPassword should call the generateRandomPassword function");
        });

        it("Should call updateUser()",  () => {
            assert.call(userModel.resetPassword, userModel.updateUser);
        });

        it("should return an Object containing the random password and the user", async () => {
            const staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "seun@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
            }
            const user = await userModel.createUser(staff);
            const info = await userModel.resetPassword(user.email);
            assert.isObject(info, "user should be an object");
            assert.hasAllKeys(info, ["randomPassword", "updatedUser"]);
        });

        it("Random password should be string", async() => {
            const info = await userModel.resetPassword("bankaadc@gmail.com");
            const password = info.randomPassword;
            
            assert.isNotEmpty(password, "Password should not be empty");
            assert.isString(password, "password should be string");
        });

        it("Updated user should be an Object", async () => {
            const staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "abc123@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
            }
            const client = await userModel.createUser(staff);
            const info = await userModel.resetPassword(client.email);
            const user = info.updatedUser;
            assert.isObject(user, "user should be an Object")
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

    describe("GetAllUsers()", () => {
        const user = {
            "id": userModel.usersDb.length,
            "firstName": "mike",
            "lastName": "jordan",
            "email": "bankaadc@gmail.com",
            "password": "password",
            "type": "staff",
            "isAdmin": "true",
            "createdDate": moment()
        }
        userModel.usersDb.push(user);
        const users = userModel.getAllUsers();
        it("Should return an array", () => {
            

            assert.isArray(users, "users should be an array");
        
        });

        it("should return an array containing user objects", () => {
            users.forEach((user => {
                assert.isObject(user, "user should be an object");
                assert.hasAnyKeys(user, ["id", "firstName", "lastName", "password", "email", "createdDate", "type", "isAdmin" ], "user object should have the required keys")
            }))
        });
  
    });

    describe("UpdateUser()", () => {
        
        it("Should call getAUser()", () => {
            assert.call(userModel.updateUser,userModel.getAUser, "It should call getAUser()");
        });

        it("Should return null if the id is invalid", async() => {
            const updatedUser = await userModel.updateUser(0, "newPassword");
            assert.isNull(updatedUser, "updatedUser should be null");
        });

        it("Should return null if newPassword field is empty", async () => {
            const updatedUser = await userModel.updateUser(1, "");
            assert.isNull(updatedUser, "updatedUser should be null");
        });

        it("Should change the the user password", async () => {
            const client = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
            }
            const staff = await userModel.createUser(client);
            const user = userModel.getAUser(staff.email)
            const oldPassword= user.password;
            const updatedUser = await userModel.updateUser(user.email, "newpassword");
            const newPassword = updatedUser.password;

            assert.notEqual(oldPassword, newPassword, "Old password should not be equal to newPassword")
        });

        it("Should return an Object", async () => {
            const client = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
            }
            const user = await userModel.createUser(client);
            const updatedUser = await userModel.updateUser(user.email, "newpassword");
            assert.isObject(updatedUser, "updatedUser should be an object");
        });
    });

})