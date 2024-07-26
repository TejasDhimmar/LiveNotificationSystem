import { db } from "../config/db.confg";
import { QueryTypes } from "sequelize";

const sequelize = db.sequelize;
const Notification = db.notification;

const createNotification = async (notification: any) => {
    let notificationData = {
        title: notification.title,
        description: notification.description,
        channel_id: notification.channel_id,
    }
    const data = await Notification.create(notificationData);
    return data;
}

const getNotification = async () => {
    const strQuery = `SELECT n.title,n.description,c.name channel,DATE_FORMAT(n.created_at,'%d-%m-%Y %H:%i:%s') created_at FROM notifications n
                    INNER JOIN channels c ON c.id=n.channel_id
                    WHERE n.deleted_at IS NULL
                    ORDER BY n.created_at DESC`;
    const data = await sequelize.query(strQuery, { type: QueryTypes.SELECT })
    return data;
}

const getChannelNotificationCount = async () => {
    const strQuery = `SELECT c.name channel,COUNT(n.channel_id) notification_count FROM channels c
                    INNER JOIN notifications n ON n.channel_id=c.id AND n.deleted_at IS NULL
                    GROUP BY c.id`;
    const data = await sequelize.query(strQuery, { type: QueryTypes.SELECT })
    return data;
}

const getUserNotification = async (userId: number) => {
    const strQuery = `SELECT n.title,n.description,c.name channel,DATE_FORMAT(n.created_at,'%d-%m-%Y %H:%i:%s') created_at FROM users u
                    INNER JOIN user_channels uc ON uc.user_id=u.id AND uc.deleted_at IS NULL
                    INNER JOIN notifications n ON n.channel_id=uc.channel_id
                    INNER JOIN channels c ON c.id=uc.channel_id
                    WHERE u.id=?
                    ORDER BY created_at DESC`;
    const data = await sequelize.query(strQuery, { replacements: [userId], type: QueryTypes.SELECT })
    return data;
}

export {
    createNotification,
    getNotification,
    getChannelNotificationCount,
    getUserNotification
}