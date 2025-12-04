import { DataTypes } from 'sequelize';
import  sequelize  from '../database/sequelize.js';

const Rol = sequelize.define('Rol', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull:true
  }

  // id se crea automático
}, { timestamps: false });

export default Rol; 