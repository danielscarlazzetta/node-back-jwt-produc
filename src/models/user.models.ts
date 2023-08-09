import {DataTypes} from 'sequelize';
import sequelizer from "../db/connection.db";


export const User = sequelizer.define('user', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type:DataTypes.STRING(100),
    },
    username:{
        type:DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    phone:{
        type: DataTypes.STRING(16),
        unique: true,
    },
    address:{
        type: DataTypes.STRING(100),
    },
    typeofuser:{
        type: DataTypes.STRING(20),
        allowNull: false,
    }
});