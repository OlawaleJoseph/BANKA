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
}

export default new User();
