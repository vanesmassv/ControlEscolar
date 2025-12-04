import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";
import bcrypt from "bcrypt";

const Usuarios = sequelize.define("Usuarios",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.password_hash) {
          usuario.password_hash = await bcrypt.hash(usuario.password_hash, 10);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed("password_hash")) {
          usuario.password_hash = await bcrypt.hash(usuario.password_hash, 10);
        }
      },
    },
  }
);

// Método de instancia
Usuarios.prototype.validarPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password_hash);
};

export default Usuarios;
