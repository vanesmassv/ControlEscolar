import { Router } from 'express';
import { getAlumnos } from '../controllers/AlumnoController.js';

const router = Router();

router.get('/allAlumnos',getAlumnos);

export default router;
