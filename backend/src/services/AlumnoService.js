import Alumnos from "../models/alumnos.js"; 
import Grupo from "../models/grupo.js";
import Calificaciones from "../models/calificaciones.js"; 

export const getAllAlumnos = async () => {
    
    return await Alumnos.findAll({ 
        attributes: ['id','matricula', 'nombre'], 
        include: [
            {
                model: Grupo,
                as: 'grupo',
                attributes: ['nombre'] 
            },
            {
                model: Calificaciones, 
                as: 'calificaciones',
                attributes: ['nota', 'observaciones'] 
            }
        ]
    });
};

export default getAllAlumnos;