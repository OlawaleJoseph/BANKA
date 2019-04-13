import express from 'express';
import Account from '../Controllers/account'
import { noMultipleAccounts, staffOnly, viewMyAccount, updateStatus, verifyAdmin } from '../middleware/ValidateAccount';


const router = express.Router();

router.post('/', noMultipleAccounts, Account.create);

router.get('/', staffOnly, Account.getAll);

router.get('/:accountNumber', viewMyAccount, Account.getOne);

router.patch('/:accountNumber', [verifyAdmin, updateStatus], Account.update);




export default router;