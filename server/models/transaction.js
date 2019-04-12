import moment from 'moment';

class Transaction {
  constructor() {
    this.transactionDb = [];
  }

  createTransaction(transactionDetails) {
    const { amount } = transactionDetails;

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
    return this.transactionDb.find(transaction => transaction.id === id);
  }

  getAllTransactions() {
    return this.transactionsDb;
  }

  deleteTransaction(id) {
    const transaction = this.getAtransaction(id);
    const index = this.transactionsDb.indexOf(transaction);
    return this.transactionsDb.splice(index, 1);
  }
}

export default new Transaction();
