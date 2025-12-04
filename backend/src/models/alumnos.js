import { DataTypes} from 'sequelize';
import sequelize from '../database/sequelize.js';

const alumnos = sequelize.define('alumno',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{ timestamps: true,
    underscored: true
 });

export default alumnos; 