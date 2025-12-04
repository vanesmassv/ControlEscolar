import { Router } from "express";
import { Login  } from '../controllers/loginController.js';
import { body } from 'express-validator';
import validateRequest from '../middleware/validateRequest.js';
const router = Router();

router.post('/login',[
    body('email').isEmail().withMessage('Debe ser un correo válido'),
    validateRequest,
], Login);

export default router;