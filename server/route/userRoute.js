import {Router} from "express";
import { signup,signin,userCredits } from "../controller/userController.js";
import {userAuth} from "../middleware/auth.js";

const router = Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/credits',userAuth,userCredits);

export default router;