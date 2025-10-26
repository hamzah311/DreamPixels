import express from 'express';
import { 
  loginUser, 
  registerUser, 
  userCredits, 
  paymentRazorpay, 
  verifyRazorpay 
} from '../controllers/userController.js';
import authUser from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', authUser, userCredits);         // Auth required
userRouter.post('/pay-razor', authUser, paymentRazorpay);  // Auth required
userRouter.post('/verify-razor', authUser, verifyRazorpay); // Auth required

export default userRouter;
