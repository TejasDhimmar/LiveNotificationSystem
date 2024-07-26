import { Request, Response } from "express";
import { getUserByEmail } from "../services/user.service";
import { getChannelNotificationCount } from "../services/notification.service";
import { getChannelUserCount } from "../services/channel.service";
import { response } from "../util/restResponse";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const login = async (req: Request, res: Response) => {
    let param = req.body;

    let userData = await getUserByEmail(param.email);
    if (userData.length == 0) {
        return response(res, 401, userData, "Invalid email");
    }
    userData = userData[0].dataValues;
    if (userData.user_type != 1) {
        return response(res, 401, userData, "Unauthorised user");
    }
    let validPassword = await bcrypt.compare(param.password, userData.password);
    if (!validPassword) {
        return response(res, 401, userData, "Invalid password");
    }
    
    let tokenData = {
        id: userData.id,
        name: userData.name,
        email: userData.email
    }
    let token: string;
    token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY_ADMIN || "jwt1233545521secretadmin", {});
    const loginData = {
        ...userData,
        token
    }

    return response(res, 200, loginData, "User login successfully");
}

const dashboardData = async (req: Request, res: Response) => {
    try {
        const notificationData = await getChannelNotificationCount();

        const channelData = await getChannelUserCount();

        const responseData = {
            notificationData: notificationData,
            channelData: channelData
        }

        return response(res, 201, responseData, "Dashboard Data");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

export {
    login,
    dashboardData
}