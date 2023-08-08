import { Sequelize } from "sequelize";

const sequelizer = new Sequelize('rrhh2', 'root', 'pantera', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelizer;