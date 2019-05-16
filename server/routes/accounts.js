import express from 'express';
import Account from '../Controllers/account'
import { noMultipleAccounts, staffOnly, viewMyAccount, updateStatus, verifyAdmin,  accountType } from '../middleware/validateAccount';

const router = express.Router();

router.post('/', noMultipleAccounts, Account.create);

router.get('/', staffOnly, Account.getAll);

router.get('/:accountNumber', [accountType, viewMyAccount], Account.getOne);

router.patch('/:accountNumber', [accountType, verifyAdmin, updateStatus], Account.update);

router.delete('/:accountNumber', [accountType, verifyAdmin], Account.deleteAccount);




export default router;