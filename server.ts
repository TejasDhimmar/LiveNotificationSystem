import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { Server } from 'socket.io';
import http from "http";
import { exec } from 'child_process';
import util from 'util';
import { db } from "./app/config/db.confg";
import { userRoutes } from "./app/routes/user.route";
import { adminRoutes } from "./app/routes/admin.route";

const app = express();
const execPromise = util.promisify(exec);

let socketServer = http.createServer(app);
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 500000 }));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static('frontend'));

const checkTableExists = async (tableName: string) => {
    const query = `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = '${process.env.DB_NAME}' AND table_name = '${tableName}'`;
    const [results] = await db.sequelize.query(query);
    return (results as any)[0].count > 0;
};

const syncDatabase = async () => {
    try {
        const tableExists = await checkTableExists('users');
        if (!tableExists) {
            await db.sequelize.sync({ force: true });
            console.log('Database synchronized successfully.');

            console.log('Running seed files...');
            await execPromise('npx sequelize-cli db:seed:all');
            console.log('Seed files executed successfully.');
        } else {
            console.log('Table already exists. Skipping seed files.');
        }
    } catch (error) {
        console.error('Error syncing database and running seed files:', error);
    }
};

syncDatabase();

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

const port: number = parseInt(process.env.PORT || '8000');
socketServer.listen(port, () => {
    console.log(`Socket Server listening on port ${port}`);
});

declare global {
    var io: Server;
}

global.io = new Server(socketServer);

io.on("connection", (socket) => {
    socket.on("client_connect", (roomData) => {
        roomData.forEach((room: any) => {
            socket.join(room.socket_room_name);
        });
    })
})
