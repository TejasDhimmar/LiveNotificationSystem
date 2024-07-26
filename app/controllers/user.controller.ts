import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../services/user.service";
import { getUserNotification } from "../services/notification.service";
import { createPayment } from "../services/user_payment.service";
import { createUserChannel, getUserChannel } from "../services/user_channel.service";
import { response } from "../util/restResponse";
import jwt from 'jsonwebtoken';
import moment from 'moment';
import bcrypt from 'bcrypt';

const registerUser = async (req: Request, res: Response) => {
    try {
        const param = req.body;

        const emailExist = await getUserByEmail(param.email);
        if (emailExist.length > 0) {
            return response(res, 409, param, "Email already exist");
        }

        const salt = await bcrypt.genSalt(10);
        param.password = await bcrypt.hash(param.password, salt);
        const userData = await createUser(param);

        await createUserChannel(userData.id,"0",[1])

        return response(res, 201, userData, "User registration successfully");
    }
    catch (e) {
        console.log(e)
        const errormsg = (typeof e === 'string') ? e : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const login = async (req: Request, res: Response) => {
    let param = req.body;

    let userData = await getUserByEmail(param.email);
    if (userData.length == 0) {
        return response(res, 401, userData, "Invalid email");
    }
    userData = userData[0].dataValues;
    if (userData.user_type != 2) {
        return response(res, 401, userData, "Unauthorised user");
    }
    let validPassword = await bcrypt.compare(param.password, userData.password);
    if (!validPassword) {
        return response(res, 401, userData, "Invalid password");
    }

    let userChannel = await getUserChannel(userData.id);

    let channels = []
    for (let i = 0; i < userChannel.length; i++) {
        const channel = userChannel[i]
        channels.push(channel);
    }

    let tokenData = {
        userId: userData.id,
        name: userData.name,
        email: userData.email,
        channels: channels
    }
    let token: string;
    token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY || "jwt1233545521secretuser", {});
    const loginData = {
        ...userData,
        channels,
        token
    }

    return response(res, 200, loginData, "User login successfully");
}

const notificationList = async (req: Request, res: Response) => {
    try {
        const param = req.body;
        const userId = req.user?.userId;
        const notificationData = await getUserNotification(userId || 0);

        return response(res, 200, notificationData, "Notification list");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const subscribeChannel = async (req: Request, res: Response) => {
    try {
        const param = req.body;
        const userId = req.user?.userId;
        param.user_id = userId;
        param.transaction_id = `Pay_${moment().format("DDMMYYHHmmss")}_${userId}`
        const paymentData = await createPayment(param);
        const paymentId = paymentData.dataValues.id;
        const channelData = await createUserChannel(userId || 0, paymentId, param.channels);
        return response(res, 200, {}, "Channel subscribed");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const userChannels = async (req: Request, res: Response) => {
    try {
        const param = req.body;
        const userId = req.user?.userId;
        let userChannel = await getUserChannel(userId || 0)

        return response(res, 200, userChannel, "Channel list");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

export {
    registerUser,
    login,
    notificationList,
    subscribeChannel,
    userChannels
}
