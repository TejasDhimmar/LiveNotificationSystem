import { Request, Response } from "express";
import { createNotification, getNotification } from "../services/notification.service";
import { getChannelList } from "../services/channel.service";
import { response } from "../util/restResponse";

const sendNotification = async (req: Request, res: Response) => {
    try {
        const param = req.body;

        const notificationData = await createNotification(param);

        let serverRoom = "ANNOUCEMENTS";
        if (param.channel_id == 2) {
            serverRoom = "NODEJS_LEARNING";
        }
        if (param.channel_id == 3) {
            serverRoom = "NODEJS_SUPPORT";
        }

        io.to(serverRoom).emit("new_notification",notificationData);

        return response(res, 201, notificationData, "Notification sent successfully");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const notificationList = async (req: Request, res: Response) => {
    try {
        const param = req.body;

        const notificationData = await getNotification();

        return response(res, 201, notificationData, "Notification list");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const channelList = async (req: Request, res: Response) => {
    try {
        const channelData = await getChannelList();

        return response(res, 201, channelData, "Channel list");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

export {
    sendNotification,
    notificationList,
    channelList
}