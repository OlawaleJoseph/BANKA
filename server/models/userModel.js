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
}

export default new User();
