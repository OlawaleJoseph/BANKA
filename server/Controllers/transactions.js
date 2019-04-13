import transactionModel from '../models/transaction';
import accountModel from '../models/account';
import dotenv from 'dotenv';

dotenv.config();


class Transaction {
  
  async debit(req, res){
    const transaction = transactionModel.createTransaction(req.body.amount);
    if(!transaction){return res.status(400).send('Invalid Input')};
      transaction.accountNumber = req.params.accountNumber;
      transaction.type = "Debit";
      const account = accountModel.getAccount(transaction.accountNumber);
      transaction.oldBalance = parseFloat(account.balance);
      transaction.newBalance = transaction.oldBalance - parseFloat(transaction.amount);
      account.balance = transaction.newBalance;
      res.status(201).json({
        "status": 201,
        "data": {
          "id": transaction.id,
          "type": transaction.type,
          "accountNumber": transaction.accountNumber,
          "cashier": req.user.id,
          "type": "Debit",
          "oldBalance": transaction.oldBalance,
          "newBalance": transaction.newBalance,
        }
      })
  };

  async credit(req, res) {
    const transaction = transactionModel.createTransaction(req.body.amount);
    if(!transaction){return res.status(400).send('Invalid Input')};
      transaction.accountNumber = req.params.accountNumber;
      transaction.type = "Credit";
      const account = accountModel.getAccount(transaction.accountNumber);
      transaction.oldBalance = parseFloat(account.balance);
      transaction.newBalance = transaction.oldBalance + parseFloat(transaction.amount);
      account.balance = transaction.newBalance;
  
      res.status(201).json({
        "status": 201,
        "data": {
          "id": transaction.id,
          "type": transaction.type,
          "accountNumber": transaction.accountNumber,
          "cashier": req.user.id,
          "oldBalance": transaction.oldBalance,
          "newBalance": transaction.newBalance,
        }
      })
    };

    getAll(req, res){
        if(req.user.type.toLowerCase() === "client"){
            const account = accountModel.accountsDb.find((account) => account.owner === req.user.id);
            if(!account){
               return res.status(400).json({
                    "status": 400,
                    "error": "User has no account"
                });
            };
            const transactionList = transactionModel.transactionDb.filter((trans) => parseInt(trans.accountNumber) === account.accountNumber);
            if(!transactionList){
                return res.status(204).json({
                    "status": 400,
                    "error": "User has no transaction"
                });
            }else{
                return res.status(200).json({
                    "status": 200,
                    "data": transactionList
                })
            }

        }else{
            const transactions = transactionModel.getAllTransactions();
            return res.status(200).json({
                "status": 200,
                "data": transactions
            })
        }
        
    };
}

export default new Transaction();