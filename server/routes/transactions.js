import express from 'express';
import  transaction from '../Controllers/transactions';
import {validateCashier , validateAdmin} from '../middleware/validateStaff';

const router = express.Router();


router.post('/:accountNumber/debit', validateCashier,  transaction.debit);

router.post('/:accountNumber/credit', validateCashier,  transaction.credit);

router.get('/', transaction.getAll);

router.get('/:id', transaction.getOne)

router.delete('/:id', validateAdmin, transaction.deleteTransaction);

export default router;