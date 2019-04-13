import express from 'express';
import Account from '../Controllers/account'
import { noMultipleAccounts, staffOnly } from '../middleware/ValidateAccount';


const router = express.Router();

router.post('/', noMultipleAccounts, Account.create);

router.get('/', staffOnly, Account.getAll);




export default router;