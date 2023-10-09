import { Model, DataTypes} from 'sequelize';
import { sequelize } from "../config/db.config";

export const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING
    }
});
