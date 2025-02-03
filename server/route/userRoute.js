import {Router} from "express";
import { signup,signin,userCredits, paymentRazorpay,verifyRazorpay } from "../controller/userController.js";
import {userAuth} from "../middleware/auth.js";

const router = Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/credits',userAuth,userCredits);
router.post('/pay-razor',userAuth,paymentRazorpay);
router.post('/verify-razor',verifyRazorpay);

export default router;