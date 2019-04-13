import accountModel from '../models/account';

class Account {
  async create(req, res){
    const account = accountModel.createAccount(req.body);
    if(!account){return res.status(400).send('Invalid Input')};
    account.owner = req.user.id
    if(account.balance < 1 && req.user.type.toLowerCase() !== "staff"){
      account.status = "draft"
    }else{
      account.status = "active"
    }
    res.json({
        "status": 201,
        "data": {
          "accountNumber": account.accountNumber,
          "firstName": req.user.firstName,
          "lastName": req.user.lastName,
          "email": req.user.email,
          "type": account.type,
          "openingBalance": account.balance
        }
    });
  };

  getAll(req, res){
    const accounts = accountModel.getAllAccounts();
    res.json({
      "status": 200,
      "data": accounts
    });
  };

  
}


export default new Account();