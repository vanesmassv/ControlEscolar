import env from './database/env.js';
import app from './app.js';
import sequelize from './database/sequelize.js';
import './models/index.js';


sequelize.sync({ alter: true })
    .then(() => console.log("Tablas sincronizadas"))
    .catch(err => console.error("Error sync:", err));

app.listen(env.port, () => {
    console.log(`Servidor corriendo en el puerto ${env.port}`);
});