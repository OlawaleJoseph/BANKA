import express from 'express';
import Account from '../Controllers/account'
import { noMultipleAccounts } from '../middleware/ValidateAccount';


const router = express.Router();

router.post('/', noMultipleAccounts, Account.create);




export default router;