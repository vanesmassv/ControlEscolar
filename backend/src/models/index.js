import sequelize from "../database/sequelize.js";
import Usuarios from "./usuarios.js";
import Rol from "./rol.js";
import Alumnos from "./alumnos.js"; 
import Calificaciones from "./calificaciones.js";
import Grupo from "./grupo.js";
import Maestros from "./maestros.js";
import Materias from "./materias.js";

// ==========================================
// RELACIONES
// ==========================================

// 1. ROL - USUARIOS (Un rol tiene muchos usuarios)
Rol.hasMany(Usuarios, { 
    foreignKey: 'rol_id', 
    as: 'usuarios' 
});
Usuarios.belongsTo(Rol, { 
    foreignKey: 'rol_id', 
    as: 'rol' 
});

// 2. USUARIOS - MAESTROS (Un usuario puede ser un maestro)
Usuarios.hasOne(Maestros, { 
    foreignKey: 'usuario_id',
    as: 'maestro'
});
Maestros.belongsTo(Usuarios, { 
    foreignKey: 'usuario_id',
    as: 'usuario'
});

// 3. MAESTROS - GRUPO (Un maestro tiene UN grupo, un grupo pertenece a un maestro)
Maestros.hasOne(Grupo, { 
    foreignKey: 'maestros_id',
    as: 'grupo'
});
Grupo.belongsTo(Maestros, { 
    foreignKey: 'maestros_id',
    as: 'maestro'
});

// 4. GRUPO - ALUMNOS (Un grupo tiene muchos alumnos)
Grupo.hasMany(Alumnos, { 
    foreignKey: 'grupo_id', 
    as: 'alumnos' 
});
Alumnos.belongsTo(Grupo, { 
    foreignKey: 'grupo_id', 
    as: 'grupo' 
});

// 5. MAESTROS - MATERIAS (Un maestro puede dar muchas materias)
Maestros.hasMany(Materias, { 
    foreignKey: 'maestro_id',
    as: 'materias'
});
Materias.belongsTo(Maestros, { 
    foreignKey: 'maestro_id',
    as: 'maestro'
});

// 6. ALUMNOS - CALIFICACIONES (Un alumno tiene muchas calificaciones)
Alumnos.hasMany(Calificaciones, { 
    foreignKey: 'alumno_id', 
    as: 'calificaciones' 
});
Calificaciones.belongsTo(Alumnos, { 
    foreignKey: 'alumno_id', 
    as: 'alumno' 
});

// 7. MATERIAS - CALIFICACIONES (Una materia tiene muchas calificaciones)
Materias.hasMany(Calificaciones, { 
    foreignKey: 'materia_id',
    as: 'calificaciones'
});
Calificaciones.belongsTo(Materias, { 
    foreignKey: 'materia_id', 
    as: 'materia' 
});

// 8. MAESTROS - CALIFICACIONES (Un maestro crea muchas calificaciones)
Maestros.hasMany(Calificaciones, {
    foreignKey: 'maestro_id',
    as: 'calificaciones'
});
Calificaciones.belongsTo(Maestros, {
    foreignKey: 'maestro_id',
    as: 'maestro'
});

// ==========================================
// EXPORTAR MODELOS
// ==========================================
const models = {
    sequelize, 
    Rol, 
    Usuarios, 
    Maestros, 
    Grupo, 
    Alumnos,
    Calificaciones, 
    Materias
};

export default models;