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

  async login(req, res){
    const user = await userModel.login(req.body.email, req.body.password);
    if(!user){ return res.status(400).json({
      "status": 400,
      "error": "Invalid email or password"
      })
    }else{
      const token = await userModel.generateToken(user.email);
      res.status(200).json({
        "status": 200,
        "data": {
          token,
          "id": user.id,
          "firstName": user.firstName,
          "lastName": user.lastName,
          "email": user.email
        }
      })
    }
  };

  getOne(req, res){
    const user = userModel.getAUser(req.user.email);
    if (!user) { return res.status(400).send('Invalid Request')}
    res.status(200).json({
        "status": 200,
        "data": user
    })
  };

    getAll (req, res){
        if(req.user.type == "staff"){
          const users = userModel.getAllUsers();
      res.status(200).json({
        "status": 200,
        "data": users
      });
        }else{
          res.status(403).json({
            "status": 403,
            "error": "You do not have the access to view this page"
          })
        }
        
    };

    async update(req, res){
        const user = await userModel.updateUser(req.user.email, req.body.password);
        if(user){
          res.status(200).json({
            "status": 200,
            "message": "Password Changed Successfully"
          });
        }else{
          res.status(500).json({
            "status": 500,
            "message": "Internal Server Error"
          });
        }
    }

    async passwordReset(req, res){
        const udpdatedInfo = await userModel.resetPassword(req.body.email);
        if(!udpdatedInfo){ return res.status(400).json({
          "status": 400,
          "error": "Invalid email"
          })
        }else{
          const {updatedUser, randomPassword} = udpdatedInfo
          const subject = "PASSWORD RESET SUCCESSFUL"
          const message = `YOUR NEW PASSWORD IS ${randomPassword}.`
          try{
            await sendMail(req.body.email, subject, message);
              res.status(200).json({
                "status": 200,
                "message": `Hi ${updatedUser.firstName} check your email for your new password `
              })
          }catch(err){
            console.error(err);
            res.status(500).status.json({
              "status": 500, 
              "error": "Internal Server Error"
            
            })
          }
        }
    };

    deleteUser(req, res){
        if(req.user.isAdmin){
            const user = userModel.deleteUser(req.params.id);
            if(user){
                res.status(200).json({
                    "status": 203,
                    "message": "User deleted successfully"
                })
            }else{
                res.status(400).json({
                    "status": 400,
                    "error": "Invalid User"
                })
            }
        }else{
            res.status(403).json({
                "status": 403,
                "error": "You do not have access to this page"
            })
        }
        
        
    }
};

export default new User();