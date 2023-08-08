import {DataTypes} from 'sequelize';
import sequelizer from "../db/connection.db";


export const Product = sequelizer.define('product', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type:DataTypes.STRING,
        unique: true,
    },
    description:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.FLOAT
    },
    amount:{
        type: DataTypes.INTEGER
    },
    category:{
        type: DataTypes.STRING
    }
});