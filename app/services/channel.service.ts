import { db } from "../config/db.confg";
import { QueryTypes } from "sequelize";

const sequelize = db.sequelize;
const Channel = db.channel;

const getChannelList = async () => {
    const data = await Channel.findAll()
    return data;
}

const getChannelUserCount = async () => {
    const strQuery = `SELECT c.name channel,COUNT(uc.user_id) user_count FROM channels c
                    INNER JOIN user_channels uc ON uc.channel_id=c.id
                    GROUP BY uc.channel_id`;
    const data = await sequelize.query(strQuery, { type: QueryTypes.SELECT })
    return data;
}

export {
    getChannelList,
    getChannelUserCount
}