import models from '../models/index.js';
import { BadRequestError } from '../errors/BadRequest.js';
import NotFoundError from '../errors/NotFoundError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

class CalificarAlumno {
    async obtenerAlumnos(usuarioId){
        const maestroProfile = await models.Maestros.findOne({
            where: { usuario_id: usuarioId},
            attributes: ['id']
        });
        
        if(!maestroProfile){
            throw new NotFoundError('No se encontro el perfil de maestro asociado');
        }

        const grupoAsignado = await models.Grupo.findOne({
            where: { maestros_id: maestroProfile.id } 
        });

        if(!grupoAsignado){
            throw new NotFoundError('No tienes un grupo asignado');
        }

        const alumnos = await models.Alumnos.findAll({
            where: {
                grupo_id: grupoAsignado.id 
            },
            attributes: ['id','nombre','matricula'],
            include: [{ 
                model: models.Calificaciones,
                as: 'calificaciones', 
                attributes: ['id', 'nota', 'observaciones', 'fecha_registro'],
                include: [{ 
                    model: models.Materias,
                    as: 'materia', 
                    attributes: ['id', 'nombre', 'codigo']
                }]
            }]
        });

        const materiasImpartidas = await models.Materias.findAll({
            where: { maestro_id: maestroProfile.id },
            attributes: ['id', 'nombre', 'codigo']
        });

        return {
            grupo:{
                id: grupoAsignado.id,
                nombre: grupoAsignado.nombre
            },
            alumnos: alumnos,
            materias: materiasImpartidas
        };
    }
    
    async asignarCalificacionPorGrupo(Calificacion, observaciones, alumnoid, materiaid, usuarioId){
    // 1. Validar maestro
    const maestroProfile = await models.Maestros.findOne({ 
        where: { usuario_id: usuarioId },
        include: [{
            model: models.Grupo,
            as: 'grupo',
            include: [{
                model: models.Alumnos,
                as: 'alumnos'
            }]
        }]
    });
    
    if (!maestroProfile) {
        throw new UnauthorizedError('Perfil de Maestro no encontrado.');
    }

    // 2. Validar que el maestro tenga un grupo asignado
    if (!maestroProfile.grupo) {
        throw new UnauthorizedError('No tienes un grupo asignado.');
    }

    // 3. Validar que el alumno existe y pertenece al grupo del maestro
    const alumno = await models.Alumnos.findOne({
        where: { 
            id: alumnoid,
            grupo_id: maestroProfile.grupo.id  
        }
    });
    
    if (!alumno) {
        throw new UnauthorizedError('El alumno no pertenece a tu grupo o no existe.');
    }

    // 4. Validar materia (que sea del maestro)
    const materia = await models.Materias.findOne({
        where: {
            id: materiaid,
            maestro_id: maestroProfile.id  // ← Solo sus materias
        }
    });
    
    if (!materia) {
        throw new UnauthorizedError('La materia no existe o no es tuya.');
    }

    // 5. Validar rango
    if (Calificacion < 0 || Calificacion > 10) {
        throw new BadRequestError('La calificación debe estar entre 0 y 10');
    }
    
    // 6. Verificar si ya existe
    const calificacionExistente = await models.Calificaciones.findOne({
        where: {
            alumno_id: alumnoid,
            materia_id: materiaid
        }
    });

    if (calificacionExistente) {
        throw new BadRequestError(
            'Este alumno ya tiene una calificación en esta materia. ' +
            'Usa la opción de editar para modificarla.'
        );
    }

    // 7. Crear calificación
    const newCalificacion = await models.Calificaciones.create({
        alumno_id: alumnoid,   
        materia_id: materiaid, 
        nota: Calificacion, 
        maestro_id: maestroProfile.id,
        fecha_registro: new Date(),
        observaciones: observaciones || ''
    });

        return newCalificacion;
    }

    async editarCalificacion(Calificacion, observaciones, calificacion_id, usuarioId){ 
        const maestroProfile = await models.Maestros.findOne({ 
            where: { usuario_id: usuarioId } 
        });
        
        if (!maestroProfile) {
            throw new UnauthorizedError('Perfil de Maestro no encontrado.');
        }

        const calificacionExiste = await models.Calificaciones.findByPk(calificacion_id, {
            include: [{
                model: models.Materias,
                as: 'materia',
                attributes: ['maestro_id']
            }]
        });

        if(!calificacionExiste){
            throw new NotFoundError('Calificacion no encontrada');
        }
        
        if (calificacionExiste.materia.maestro_id !== maestroProfile.id) {
            throw new UnauthorizedError('No tienes permiso para editar esta calificación.');
        }

        if (Calificacion < 0 || Calificacion > 10) {
            throw new BadRequestError('La calificación debe estar entre 0 y 10');
        }
        
        calificacionExiste.nota = Calificacion;
        calificacionExiste.observaciones = observaciones || '';
        calificacionExiste.fecha_registro = new Date(); 

        await calificacionExiste.save();
        
        return calificacionExiste;
    }
    
    async eliminarCalificacion(calificacion_id, usuarioId) {

        const usuario = await models.Usuarios.findByPk(usuarioId, {
            attributes: ['rol'] 
        });

        if (!usuario) {
            throw new NotFoundError('Usuario no encontrado.');
        }

        if (usuario.rol !== 'ADMIN') {
            throw new UnauthorizedError('Solo los administradores pueden eliminar calificaciones.');
        }
        // Agregar validación de permisos
        const calificacionExiste = await models.Calificaciones.findByPk(calificacion_id);

        if (!calificacionExiste) {
            throw new NotFoundError('Calificación no encontrada');
        }

        await calificacionExiste.destroy();

        return true; 
    }
}

export default new CalificarAlumno();