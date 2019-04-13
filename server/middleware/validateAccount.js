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

export const staffOnly = (req, res, next) => {
    if(req.user.type.toLowerCase() == "staff"){
        next();
    }else{
        return res.status(403).json({
            "status": 403,
            "error": "You do not have the access to see this page"
        });
    };
};

export const viewMyAccount = (req, res, next) => {
    if(req.user.type.toLowerCase() == "staff"){
        next();
    }else{
        const myAccount = accountModel.accountsDb.find((acc => acc.owner == req.user.id));
        if(!myAccount){ return res.status(403).json({
            "status": 403,
            "error": "You do not have access to view this page"
        })};
        if(myAccount.accountNumber != req.params.accountNumber){
            return res.status(403).json({
                "status": 403,
                "errror": "You do not have access to view this page"
            });
        }else{
            next();
        };
    };
    
};