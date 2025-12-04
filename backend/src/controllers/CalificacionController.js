import CalificacionGeneral from '../services/CalificacionService.js';

export const obtenerReporteGlobal = async(req, res, next) =>{
    try{

        const usuarioId = req.user.id;
        const result = await CalificacionGeneral.obtenerReporteGlobal(usuarioId);

        res.status(200).json({
                succes: true,
                message: 'Reporte global',
                data: result
            });
        
    }catch(error){
        console.log("Error al obtener las Calificaciones");
        next(error);
    }
}
