import user from '../Controllers/users';
import express from 'express'
import {validateSignUp, verifyAdmin, staffSignup} from '../middleware/validateUser'

const router = express.Router();


router.post('/signup', validateSignUp, user.create);

router.post('/signupStaff', [verifyAdmin, staffSignup], user.createStaff);



export default router
