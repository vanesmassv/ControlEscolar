import models from "../models/index.js";


class CalificacionGeneral {
    async obtenerReporteGlobal() {
        const promediosPorMateria = await models.Calificaciones.findAll({
            attributes: [
                [models.sequelize.fn('AVG', models.sequelize.col('nota')), 'promedio_materia'],
                'alumno_id',
                'materia_id',
            ],
            
            group: [
                'alumno_id', 
                'materia_id', 
                'alumno.id', // PK del modelo incluido
                'alumno.nombre', 
                'alumno.matricula',
                'materia.id', // PK del modelo incluido
                'materia.nombre'
            ], 
            raw: true, 
            include: [{ 
                model: models.Alumnos,
                as: 'alumno',
                attributes: ['nombre', 'matricula']
            },
            { 
                model: models.Materias,
                as: 'materia',
                attributes: ['nombre']
            }],
        });

        // 2. Calcular el promedio general de todos los alumnos
        const promedioGeneral = await models.Calificaciones.findAll({
            attributes: [
                [models.sequelize.fn('AVG', models.sequelize.col('nota')), 'promedio_general'],
            ],
            raw: true,
        });
        
        // 3. Calcular el promedio general por materia (para el resumen)
        const promediosGeneralesPorMateria = await models.Calificaciones.findAll({
            attributes: [
                [models.sequelize.fn('AVG', models.sequelize.col('nota')), 'promedio_materia'],
                'materia_id',
            ],
            group: ['materia_id', 'materia.id', 'materia.nombre'],
            raw: true,
            include: [{
                    model: models.Materias,
                    as: 'materia',
                    attributes: ['nombre']
            }],
        });

        return {
            promedioGeneral: promedioGeneral[0].promedio_general 
                ? parseFloat(promedioGeneral[0].promedio_general).toFixed(2) 
                : 'N/A', 
            resumenPorMateria: promediosGeneralesPorMateria.map(item => ({
                materia: item['materia.nombre'],
                promedio: parseFloat(item.promedio_materia).toFixed(2)
            })),
            detallesPorAlumnoYMateria: promediosPorMateria.map(item => ({
                alumno: item['alumno.nombre'],
                matricula: item['alumno.matricula'],
                materia: item['materia.nombre'],
                promedio: parseFloat(item.promedio_materia).toFixed(2)
            }))
        };
    }
    
}

export default new CalificacionGeneral();