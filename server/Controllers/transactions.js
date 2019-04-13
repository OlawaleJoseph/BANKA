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
          "accountNumber": parseIn(transaction.accountNumber, 10),
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
          "accountNumber": parseIn(transaction.accountNumber, 10),
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
                    "status": 204,
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

    getOne(req, res) {
        
        if(req.user.type.toLowerCase() === "client"){
            const account = accountModel.accountsDb.find((account) => account.owner === req.user.id);
            if(!account){
               return res.status(400).json({
                    "status": 400,
                    "error": "User has no account"
                });
            };
            const id = parseInt(req.params.id, 10)
            const singleTransaction = transactionModel.getATransaction(id)
            if(!singleTransaction){
                return res.status(404).json({
                    "status": 404,
                    "error": `User has no transaction with the id ${id}`
                });
            }else{
                if(parseInt(singleTransaction.accountNumber, 10) === account.accountNumber){
                    return res.status(200).json({
                        "status": 200,
                        "data": singleTransaction
                    })
                }else{
                    return res.status(404).json({
                        "status": 404,
                        "error": `User has no transaction with the id ${id}`
                    });
                }
                
            }

        }else{
            const foundTransaction = transactionModel.getATransaction(req.params.id)
            return res.status(200).json({
                "status": 200,
                "data": foundTransaction
            })
        }
        
    }

    deleteTransaction(req, res){
        const id = parseInt(req.params.id, 10)
        const unwantedTransaction = transactionModel.deleteTransaction(id);
        console.log(unwantedTransaction)
        if(unwantedTransaction.length > 0){
           return  res.status(203).json({
                "status": 203,
                "message": "Transaction successfully deleted",
            });
        }else{
           return res.status(404).json({
                "status": 404,
                "error": "Transaction not found",
            });
        }
        
    }
}

export default new Transaction();