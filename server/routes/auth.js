import user from '../Controllers/users';
import express from 'express'
import {validateSignUp} from '../middleware/validateUser'

const router = express.Router();


router.post('/signup', validateSignUp, user.create);



export default router
