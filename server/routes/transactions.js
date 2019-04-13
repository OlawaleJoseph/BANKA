import express from 'express';
import  transaction from '../Controllers/transactions';
import {validateCashier } from '../middleware/validateStaff';

const router = express.Router();


router.post('/:accountNumber/debit', validateCashier,  transaction.debit);



export default router;