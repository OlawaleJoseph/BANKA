import express from 'express';
import  transaction from '../Controllers/transactions';
import {validateCashier , validateAdmin} from '../middleware/validateStaff';
import {accountType} from '../middleware/validateAccount'

const router = express.Router();


router.post('/:accountNumber/debit', [accountType, validateCashier],  transaction.debit);

router.post('/:accountNumber/credit', [accountType, validateCashier],  transaction.credit);

router.get('/', transaction.getAll);

router.get('/:id', transaction.getOne)

router.delete('/:id', validateAdmin, transaction.deleteTransaction);

export default router;