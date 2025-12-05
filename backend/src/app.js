import express from 'express';
import helmet from 'helmet';
import cors from 'cors';


//import usuarioRoutes from './routes/usuarioRoutes.js';
import loginRoute from './routes/loginRoutes.js';
import alumnoRoutes from './routes/alumnoRoutes.js'
import maestroRoutes from './routes/maestroRoutes.js'
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());


app.use('/api/auth', loginRoute);
app.use('/api/alumno',alumnoRoutes);
app.use('/api/maestros', maestroRoutes);
app.use('/api/admin', adminRoutes);



export default app;