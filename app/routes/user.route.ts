import { Router } from "express";
import { registerUser, login, notificationList, subscribeChannel, userChannels } from "../controllers/user.controller";
import { userValidation } from "../validators/user.validator";
import { userJWT } from "../middleware/jwt"

const router = Router();

router.post("/register", userValidation.register, registerUser);
router.post("/login", userValidation.login, login);

router.get("/notificationlist", userJWT, notificationList);
router.post("/subscribechannel", userJWT, subscribeChannel);
router.get("/userchannels", userJWT, userChannels);

export { router as userRoutes }