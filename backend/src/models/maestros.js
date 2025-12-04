import { DataTypes} from 'sequelize';
import sequelize from '../database/sequelize.js';

const maestros = sequelize.define('maestro',{
    matricula: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{ timestamps: false });

export default maestros;