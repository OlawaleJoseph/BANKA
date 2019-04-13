import user from '../Controllers/users';
import express from 'express'
import validateToken from '../middleware/validateToken';
import {validateSignUp, verifyAdmin, staffSignup, validateLogin} from '../middleware/validateUser'

const router = express.Router();


router.post('/signup', validateSignUp, user.create);

router.post('/signupStaff', [verifyAdmin, staffSignup], user.createStaff);

router.post('/login', validateLogin, user.login);

router.get('/me',validateToken, user.getOne);

router.get('/', validateToken, user.getAll);

router.patch('/me', validateToken, user.update);

router.patch('/reset', user.passwordReset);

router.delete('/:id', validateToken, user.deleteUser);



export default router
