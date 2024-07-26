import { Router } from "express";
import { dashboardData, login } from "../controllers/admin.controller";
import { userValidation } from "../validators/user.validator";
import { channelList, notificationList, sendNotification } from "../controllers/notification.controller";
import { notificationValidation } from "../validators/notification.validator";
import { adminJWT } from "../middleware/jwt";

const router = Router();

router.post("/login", userValidation.login, login);

router.get("/dashboard", adminJWT, dashboardData);
router.post("/sendnotification", adminJWT, notificationValidation.notification, sendNotification);
router.get("/notifications", adminJWT, notificationList);
router.get("/channels", adminJWT, channelList);

export { router as adminRoutes }