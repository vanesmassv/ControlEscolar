# ControlEscolar
Prueba Tecnica 2

# Guía de Instalación del Proyecto

**React + Vite \| Express.js \| PostgreSQL**

Este documento describe los pasos necesarios para instalar y ejecutar
correctamente el proyecto en un entorno local.

------------------------------------------------------------------------

## Requisitos Previos

-   Node.js (versión 18 o superior)\
-   npm\
-   PostgreSQL\
-   Git

------------------------------------------------------------------------

## Clonar el repositorio

``` bash
git clone URL_DEL_REPOSITORIO
cd nombre-del-proyecto
```

------------------------------------------------------------------------

# Instalación del Backend (Express.js)

``` bash
cd backend
npm install
```

### Configurar el archivo .env

``` env
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=escuela
DB_HOST=localhost
DB_PORT=5432

PORT=3000
NODE_ENV=development

JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=1h
```

### Crear la base de datos

``` sql
CREATE DATABASE escuela;
```

### seed

``` bash
npm run seed
```

### Iniciar servidor

``` bash
npm run dev
```

------------------------------------------------------------------------

# Instalación del Frontend (React + Vite)

``` bash
cd frontend
npm install
npm run dev
```

Abre en tu navegador:

    http://localhost:5173

------------------------------------------------------------------------

