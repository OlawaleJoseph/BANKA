import express from 'express';
import  transaction from '../Controllers/transactions';
import {validateCashier } from '../middleware/validateStaff';

const router = express.Router();


router.post('/:accountNumber/debit', validateCashier,  transaction.debit);

router.post('/:accountNumber/credit', validateCashier,  transaction.credit);

router.get('/', transaction.getAll)



export default router;