import userModel from '../models/userModel';
import sendMail from '../helperFunctions/sendEmail';

class User{
  async create(req, res){
    const user = await userModel.createUser(req.body);
    if(!user){return res.status(400).send('Invalid Input')};
    try{
      const token = await userModel.generateToken(user.email)
      const subject = "Welcome to BANKA";
      const message = `Welcome to Banka, Your NO.1 BANK!!!`
      const mail = await sendMail(user.email, subject, message);
      res.json({
        "status": 201,
        "data": {
          token,
          "id": user.id,
          "firstName": user.firstName,
          "lastName": user.lastName,
          "email": user.email
        }
      })
    }catch(err){
      console.error(err)
    }
    
  };

  async createStaff(req, res){
    const user = await userModel.createStaff(req.body);
    console.log(user)
    if(!user){return res.status(400).send('Invalid Input')}
    try{
      const token = await userModel.generateToken(user.email)
      const subject = "Welcome to BANKA";
      const message = `Welcome to Banka ${user.firstName}, Welcome to the BANKA team`
      await sendMail(user.email, subject, message);
      res.status(201).json({
        "status": 201,
        "data": {
          token,
          "id": user.id,
          "firstName": user.firstName,
          "lastName": user.lastName,
          "email": user.email
        }
      })
    }catch(err){
      console.error(err)
    }
    
  };
};

export default new User();