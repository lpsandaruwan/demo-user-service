import {DataTypes} from 'sequelize';
import {sequelize} from "../config/db.config";

export const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING
    }
});
