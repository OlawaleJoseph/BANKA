import user from '../Controllers/users';
import express from 'express'
import validateToken from '../middleware/ValidateToken';
import {validateSignUp, verifyAdmin, staffSignup, validateLogin} from '../middleware/validateUser'

const router = express.Router();


router.post('/signup', validateSignUp, user.create);

router.post('/signupStaff', [verifyAdmin, staffSignup], user.createStaff);

router.post('/login', validateLogin, user.login);

router.get('/me',validateToken, user.getOne);



export default router
