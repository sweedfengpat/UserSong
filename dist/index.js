"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const song_1 = __importDefault(require("./routes/song"));
const typeorm_1 = require("typeorm");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const port = process.env.PORT || 3000;
(0, typeorm_1.createConnection)().then(() => {
    console.log('Data Source has been initialized!');
    // Use routes after the connection has been initialized
    exports.app.use('/users', user_1.default);
    exports.app.use('/songs', song_1.default);
    exports.app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});
