import CalificarAlumno from '../services/MaestroService.js'


export const asignarCalificacion = async (req, res, next) => {
    try {
        const usuarioId = req.user.id; // Del middleware auth
        const { alumnoid, materiaid, Calificacion, observaciones } = req.body;

        const nuevaCalificacion = await CalificarAlumno.asignarCalificacionPorGrupo(
            Calificacion,
            observaciones,
            alumnoid,
            materiaid,
            usuarioId
        );

        res.status(201).json({
            success: true,
            message: 'Calificación asignada exitosamente',
            data: nuevaCalificacion
        });
    } catch (error) {
        next(error);
    }
};

export const editarCalificacion = async (req, res, next) => {
        try{
            const { id } = req.params;
            const { Calificacion, observaciones} = req.body;
            const usuarioid = req.user.id;

            const data = await CalificarAlumno.editarCalificacion(
                Calificacion, observaciones, id, usuarioid
            );
            
            res.status(200).json({
                succes: true,
                message: 'Calificación editada exitosamente',
                data: data
            });
            

        }catch(error){
            next(error);
        }
    
};

export const obtenerAlumnos = async(req, res, next) => {
    try{
        const usuarioId = req.user.id;
        const result = await CalificarAlumno.obtenerAlumnos(usuarioId);

        res.status(200).json({
                succes: true,
                message: 'Alumnos del grupo asignado al maestro',
                data: result
            });
    }catch(error){
        console.error("Fallo al obtener alumnos:", error);
        next(error);
    }
};   


export default { editarCalificacion, asignarCalificacion, obtenerAlumnos};