"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizer = new sequelize_1.Sequelize('rrhh2', 'root', 'pantera', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = sequelizer;
