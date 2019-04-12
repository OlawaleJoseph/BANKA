import moment from 'moment';

class Account {
  constructor() {
    this.accountsDb = [];
  }

  generateAccountNumber() {
    let accountNumber = '1';
    while (accountNumber.length !== 10) {
      accountNumber += Math.floor(Math.random() * 9);
    }

    return parseInt(accountNumber);
  }

  createAccount(data, owner) {
    let status;
    const {
      type, amount,
    } = data;
    if (!/\d/.test(amount) || /[^a-z]/gi.test(type)) {
      return null;
    }
    const accountNumber = this.generateAccountNumber();
    if (parseFloat(amount, 10) === 0) {
      status = 'draft';
    } else {
      status = 'active';
    }
    const newAccount = {
      id: this.accountsDb.length + 1,
      accountNumber,
      type,
      balance: parseFloat(amount),
      createdDate: moment(),
      owner,
      status,
    };

    this.accountsDb.push(newAccount);
    return newAccount;
  }
}
export default new Account();
