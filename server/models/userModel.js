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

}

export default new User();