import { db } from "../config/db.confg";
import { QueryTypes } from "sequelize";

const sequelize = db.sequelize;
const UserChannel = db.user_channel;

const createUserChannel = async (userId: number, paymentId: string, channels: number[]) => {
    let channelData = []
    for (let i = 0; i < channels.length; i++) {
        const data = {
            user_id: userId,
            channel_id: channels[i],
            payment_id: paymentId,
            created_at: new Date()
        }
        channelData.push(data);
    }

    const data = await UserChannel.bulkCreate(channelData);
    return data;
}

const getUserChannel = async (userId: number) => {
    const strQuery = `SELECT c.id channel_id,c.name channel,c.socket_room_name FROM users u
                    INNER JOIN user_channels uc ON uc.user_id=u.id AND uc.deleted_at IS NULL
                    INNER JOIN channels c ON c.id=uc.channel_id
                    WHERE u.id=?`;
    const data = await sequelize.query(strQuery, { replacements: [userId], type: QueryTypes.SELECT })
    return data;
}

export {
    createUserChannel,
    getUserChannel
}