import user from '../Controllers/users';
import express from 'express'
import {validateSignUp, verifyAdmin, staffSignup, validateLogin} from '../middleware/validateUser'

const router = express.Router();


router.post('/signup', validateSignUp, user.create);

router.post('/signupStaff', [verifyAdmin, staffSignup], user.createStaff);

router.post('/login', validateLogin, user.login);



export default router
