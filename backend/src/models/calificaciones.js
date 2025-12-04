import { DataTypes} from 'sequelize';
import sequelize from '../database/sequelize.js';

const calificaciones = sequelize.define('calificacion',{
    nota: {
        type: DataTypes.DECIMAL(5,2),
        allowNull:false
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull:false
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},{ 
    tableName: 'calificiones',
    timestamps: true,
    underscored: true,
    paranoid: true,
    indexes: [
        {
            unique: true,
            fields: ['alumno_id', 'materia_id'],
            name: 'unique_alumno_materia'
        }
    ]
});

export default calificaciones; 