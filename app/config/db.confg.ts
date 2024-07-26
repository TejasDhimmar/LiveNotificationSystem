import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USERNAME || '', process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000
    },
    dialectOptions: { "useUTC": false, "connectTimeout": 60000 },
    timezone: '+05:30',
    logging: true,
    models: []
});

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    user : require('../models/user.model')(sequelize, Sequelize),
    channel : require('../models/channel.model')(sequelize, Sequelize),
    user_channel : require('../models/user_channel.model')(sequelize, Sequelize),
    notification : require('../models/notification.model')(sequelize, Sequelize),
    user_payment : require('../models/user_payment.model')(sequelize, Sequelize),
};

export { db };