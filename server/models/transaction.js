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
}

export default new Transaction();
