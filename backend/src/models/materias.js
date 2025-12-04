import { DataTypes} from 'sequelize';
import  sequelize from '../database/sequelize.js';

const materias = sequelize.define('materia',{
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull:false
    }
},{ timestamps: true })

export default materias;