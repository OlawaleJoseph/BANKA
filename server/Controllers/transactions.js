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
      res.json({
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
}

export default new Transaction();