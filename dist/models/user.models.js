"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
exports.User = connection_db_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    username: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(16),
        unique: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    typeofuser: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    }
});
