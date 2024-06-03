"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const song_1 = __importDefault(require("./routes/song"));
const User_1 = require("./entity/User");
const Song_1 = require("./entity/Song");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, typeorm_1.createConnection)({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User_1.User, Song_1.Song],
    synchronize: true,
}).then(connection => {
    app.use('/users', user_1.default);
    app.use('/songs', song_1.default);
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch(error => console.log(error));
