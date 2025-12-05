import { Router } from 'express';
import { editarCalificacion, asignarCalificacion, obtenerAlumnos } from '../controllers/MaestroController.js';
import validateRequest from '../middleware/validateRequest.js';
import { body } from 'express-validator';
import auth from '../middleware/auth.js';


const router = Router();

router.post('/calificaciones', 
    auth,
    [
        body('alumnoid') 
            .notEmpty()
            .withMessage('El ID del alumno es requerido')
            .isInt()
            .withMessage('El ID del alumno debe ser un número'),
        body('materiaid') 
            .notEmpty()
            .withMessage('El ID de la materia es requerido')
            .isInt()
            .withMessage('El ID de la materia debe ser un número'),
        body('Calificacion')
            .notEmpty()
            .withMessage('La calificación es requerida')
            .isFloat({min: 0, max: 10})
            .withMessage('La calificación debe estar entre 0 y 10'),
        body('observaciones')
            .optional()
            .isString()
    ], 
    validateRequest, 
    asignarCalificacion
);

//ruta para actualizar por id calificacion
router.patch('/calificacion/:id',auth,[body('Calificacion').notEmpty().withMessage('la calificacion es requerida').isFloat({min: 0, max: 10}).withMessage('La calificacion debe de estar entre 10 y 0'),
    body('observaciones').optional().isString().withMessage('texto')],validateRequest,editarCalificacion);


router.get('/misalumnos',auth, obtenerAlumnos);

export default router;