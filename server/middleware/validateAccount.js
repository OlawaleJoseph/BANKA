import accountModel from '../models/account';

export const noMultipleAccounts = (req, res, next) => {
    const ownsAccount = accountModel.accountsDb.find(acc => acc.owner == req.user.id)
    if(ownsAccount){
        return res.status(400).json({
            "status": 400,
            "error": "User already has an account"
        });
    }else{
        next()
    };
};
