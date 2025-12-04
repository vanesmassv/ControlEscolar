import { getAllAlumnos } from '../services/AlumnoService.js';


export const getAlumnos = async (req, res) => {
    try {
        const alumnos = await getAllAlumnos();
        
        return res.status(200).json({ 
            ok: true, 
            data: alumnos 
        });
        
    } catch (error) {
        console.error("Fallo al obtener alumnos:", error);
        return res.status(500).json({ 
            ok: false, 
            message: "Error interno del servidor al obtener alumnos." 
        });
    }
};

export default getAlumnos;