import { Router } from 'express';
import auth from '../middleware/auth.js'; 
import admin from '../middleware/admin.js'; 
import { eliminarCalificacion } from '../controllers/AdminController.js';
import { obtenerReporteGlobal } from '../controllers/CalificacionController.js'
const router = Router();

router.delete('/calificacion/:id', 
    auth,   
    admin,  
    eliminarCalificacion
);

router.get('/reporteGlobal',auth,admin,obtenerReporteGlobal);


export default router;