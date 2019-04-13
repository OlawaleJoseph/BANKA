import moment from 'moment';

class Transaction {
  constructor() {
    this.transactionDb = [];
  }

  createTransaction(amount) {

    try {
      const newTransaction = {
        id: this.transactionDb.length + 1,
        amount: parseFloat(amount),
        createdOn: moment(),
      };
      this.transactionDb.push(newTransaction);
      return newTransaction;
    } catch (err) {
      console.log(err);
    }
  }

  getATransaction(id) {
    const foundID = this.transactionDb.find(transaction => transaction.id === id);
    if(foundID){ return foundID
    }else{
        return null
    }
  }

  getAllTransactions() {
    return this.transactionDb;
  }

  deleteTransaction(id) {
    const transaction = this.getATransaction(id);
    const index = this.transactionDb.indexOf(transaction);
    return this.transactionDb.splice(index, 1);
  }
}

export default new Transaction();
