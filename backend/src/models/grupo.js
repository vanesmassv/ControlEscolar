import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const grupo = sequelize.define('grupo',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false

    }
},  { timestamps: false });

export default grupo; 