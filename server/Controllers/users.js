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
};

export default new User();