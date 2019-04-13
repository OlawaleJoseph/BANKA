import express from 'express';
import Account from '../Controllers/account'
import { noMultipleAccounts, staffOnly, viewMyAccount } from '../middleware/ValidateAccount';


const router = express.Router();

router.post('/', noMultipleAccounts, Account.create);

router.get('/', staffOnly, Account.getAll);

router.get('/:accountNumber', viewMyAccount, Account.getOne);




export default router;