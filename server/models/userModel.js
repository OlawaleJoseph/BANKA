import moment from 'moment';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import hashPassword from '../helperFunctions/hashPassword';

dotenv.config();

class User {
  constructor() {
    this.usersDb = [];
  }

  async createUser(obj) {
    const {
      firstName, lastName, email, password, type,
    } = obj;
    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: this.usersDb.length + 1,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      type,
      createdDate: moment(),
    };
    if (newUser.type == 'staff') {
      newUser.isAdmin = obj.isAdmin;
    }
    this.usersDb.push(newUser);
    return newUser;
  }

  async createStaff(obj) {
    const {
      firstName, lastName, email, password,
    } = obj;
    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: this.usersDb.length + 1,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      type: 'staff',
      isAdmin: obj.isAdmin,
      createdDate: moment(),
    };
    this.usersDb.push(newUser);
    return newUser;
  }

  async login(email, password){
    const user = this.usersDb.find(client => client.email == email);
    if(!user){ return null }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if(verifyPassword){  return user }
    return null
    
  }

  getAllUsers() {
    return this.usersDb;
  }

  getAUser(email) {
    const user = this.usersDb.find(user => user.email == email);
    if(!user){ return null };
    return user
  }

  async updateUser(email, newPassword) {
    const user = this.getAUser(email);
    if(!user){ return null }
    const index = this.usersDb.indexOf(user);
    if(!newPassword){ return null }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.updatedDate = moment();
    return this.usersDb[index];
  }

  deleteUser(id) {
    if(!id){ return null}
    const user = this.usersDb.find((client) => client.id == id);
    if(!user){ return null}
    const index = this.usersDb.indexOf(user);
    return this.usersDb.splice(index, 1);
  }

  generateRandomPassword(){
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    return Array(8).fill(char).map(arr => arr[Math.floor(Math.random() * arr.length)]).join("");
  }

  async resetPassword(email){
    const user = this.getAUser(email);
    if(!user){ return null}
    const randomPassword = this.generateRandomPassword();
    const updatedUser = await this.updateUser(user.email, randomPassword);
    const details = {randomPassword, updatedUser}
    return details;
    
  }

  async generateToken(email){
    const user = this.getAUser(email)
    if(!user){ return null}
    const token = await jsonwebtoken.sign(user, process.env.SECRET);
      return token;
  }

  decodeToken(token){
    if(!token){ return null}
    try{
      const decodedToken = jsonwebtoken.verify(token, process.env.SECRET);
    if(decodedToken){ return  decodedToken};
    }catch(err){
      console.log(err)
      return undefined
    }
    
    
  }
}

export default new User();
