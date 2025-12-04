import models from '../models/index.js';


const { sequelize, Rol, Usuarios, Maestros, Grupo, Alumnos, Materias, Calificaciones } = models;

const seedDatabase = async () => {
    try {
        // 1. LIMPIEZA DE BD
        await sequelize.sync({ force: true });
        console.log('🗑️  Base de datos limpiada.');

        // ----------------------------------------------
        // 2. CREAR ROLES
        // ----------------------------------------------
        const rolAdmin = await Rol.create({ 
            nombre: 'CONTROL_ESCOLAR', 
            descripcion: 'Administrador del sistema' 
        });
        
        const rolMaestro = await Rol.create({ 
            nombre: 'MAESTRO', 
            descripcion: 'Profesor docente' 
        });
        console.log('✅ Roles creados');

        // ----------------------------------------------
        // 3. CREAR USUARIOS (1 Admin + 3 Maestros)
        // ----------------------------------------------
        
        
        // --- ADMIN ---
        await Usuarios.create({
            nombre: 'Director Principal',
            email: 'admin@escuela.com',
            password_hash: '123', 
            rol_id: rolAdmin.id
        });

        // --- MAESTRO 1 (Juan) ---
        const userJuan = await Usuarios.create({
            nombre: 'Juan Pérez',
            email: 'juan@escuela.com',
            password_hash: '123',
            rol_id: rolMaestro.id
        });

        // --- MAESTRO 2 (María) ---
        const userMaria = await Usuarios.create({
            nombre: 'María González',
            email: 'maria@escuela.com',
            password_hash: '123',
            rol_id: rolMaestro.id
        });

        // --- MAESTRO 3 (Carlos) ---
        const userCarlos = await Usuarios.create({
            nombre: 'Carlos López',
            email: 'carlos@escuela.com',
            password_hash: '123',
            rol_id: rolMaestro.id
        });
        
        console.log('✅ Usuarios creados');

        // ----------------------------------------------
        // 4. CREAR PERFILES DE MAESTROS
        // ----------------------------------------------
        const profeJuan = await Maestros.create({
            matricula: 'DOC-001',
            usuario_id: userJuan.id
        });

        const profeMaria = await Maestros.create({
            matricula: 'DOC-002',
            usuario_id: userMaria.id
        });

        const profeCarlos = await Maestros.create({
            matricula: 'DOC-003',
            usuario_id: userCarlos.id
        });
        
        console.log('✅ Perfiles de Maestros creados');

        // ----------------------------------------------
        // 5. CREAR GRUPOS (Asignados a maestros)
        // ----------------------------------------------
        const grupoA = await Grupo.create({ 
            nombre: '1-A',
            maestros_id: profeJuan.id  // ← Juan es maestro del grupo 1-A
        });
        
        const grupoB = await Grupo.create({ 
            nombre: '1-B',
            maestros_id: profeMaria.id  // ← María es maestra del grupo 1-B
        });
        console.log('✅ Grupos creados y asignados a maestros');

        // ----------------------------------------------
        // 6. CREAR MATERIAS (3 Materias)
        // ----------------------------------------------
        const materiaMate = await Materias.create({
            codigo: 'MAT-101',
            nombre: 'Matemáticas I',
            descripcion: 'Álgebra y Aritmética básica',
            maestro_id: profeJuan.id
        });

        const materiaHis = await Materias.create({
            codigo: 'HIS-101',
            nombre: 'Historia Universal',
            descripcion: 'Historia del mundo contemporáneo',
            maestro_id: profeMaria.id
        });

        const materiaCie = await Materias.create({
            codigo: 'CIE-101',
            nombre: 'Ciencias Naturales',
            descripcion: 'Biología y medio ambiente',
            maestro_id: profeCarlos.id
        });

        console.log('✅ Materias creadas');

        // ----------------------------------------------
        // 7. CREAR ALUMNOS (15 Alumnos)
        // ----------------------------------------------
        const alumnosData = await Alumnos.bulkCreate([
            // --- GRUPO A (8 Alumnos - Maestro Juan) ---
            { nombre: 'Ana García', matricula: 'A001', fecha_nacimiento: '2010-01-15', grupo_id: grupoA.id },
            { nombre: 'Luis Rodríguez', matricula: 'A002', fecha_nacimiento: '2010-03-22', grupo_id: grupoA.id },
            { nombre: 'Sofía Martínez', matricula: 'A003', fecha_nacimiento: '2010-05-10', grupo_id: grupoA.id },
            { nombre: 'Miguel Hernández', matricula: 'A004', fecha_nacimiento: '2010-07-04', grupo_id: grupoA.id },
            { nombre: 'Elena López', matricula: 'A005', fecha_nacimiento: '2010-09-18', grupo_id: grupoA.id },
            { nombre: 'David González', matricula: 'A006', fecha_nacimiento: '2010-11-30', grupo_id: grupoA.id },
            { nombre: 'Lucía Pérez', matricula: 'A007', fecha_nacimiento: '2010-02-14', grupo_id: grupoA.id },
            { nombre: 'Jorge Sánchez', matricula: 'A008', fecha_nacimiento: '2010-04-01', grupo_id: grupoA.id },
            
            // --- GRUPO B (7 Alumnos - Maestra María) ---
            { nombre: 'Carmen Ramírez', matricula: 'B001', fecha_nacimiento: '2010-06-25', grupo_id: grupoB.id },
            { nombre: 'Raúl Torres', matricula: 'B002', fecha_nacimiento: '2010-08-12', grupo_id: grupoB.id },
            { nombre: 'Isabel Flores', matricula: 'B003', fecha_nacimiento: '2010-10-05', grupo_id: grupoB.id },
            { nombre: 'Fernando Rivera', matricula: 'B004', fecha_nacimiento: '2010-12-20', grupo_id: grupoB.id },
            { nombre: 'Patricia Gómez', matricula: 'B005', fecha_nacimiento: '2010-01-30', grupo_id: grupoB.id },
            { nombre: 'Diego Díaz', matricula: 'B006', fecha_nacimiento: '2010-03-15', grupo_id: grupoB.id },
            { nombre: 'Rosa Morales', matricula: 'B007', fecha_nacimiento: '2010-05-28', grupo_id: grupoB.id }
        ]);

        console.log('✅ Alumnos creados (15 en total)');

        // ----------------------------------------------
        // 8. CREAR CALIFICACIONES DE PRUEBA
        // ----------------------------------------------
        await Calificaciones.bulkCreate([
            // Calificaciones para Ana García (alumno_id = 1, Grupo A, Maestro Juan)
            {
                alumno_id: alumnosData[0].id,  // Ana García
                materia_id: materiaMate.id,
                maestro_id: profeJuan.id,  // ← Registrado por Juan
                nota: 9.8,
                fecha_registro: '2025-10-01',
                observaciones: 'Excelente rendimiento en matemáticas.'
            },
            {
                alumno_id: alumnosData[0].id,  // Ana García
                materia_id: materiaHis.id,
                maestro_id: profeMaria.id,  // ← Registrado por María
                nota: 8.5,
                fecha_registro: '2025-10-01',
                observaciones: 'Muy buena participación en historia.'
            },

            // Calificaciones para Luis Rodríguez (alumno_id = 2)
            {
                alumno_id: alumnosData[1].id,  // Luis Rodríguez
                materia_id: materiaMate.id,
                maestro_id: profeJuan.id,
                nota: 7.5,
                fecha_registro: '2025-10-01',
                observaciones: 'Aprobado, puede mejorar.'
            },

            // Calificaciones para Carmen Ramírez (alumno_id = 9, Grupo B, Maestra María)
            {
                alumno_id: alumnosData[8].id,  // Carmen Ramírez
                materia_id: materiaHis.id,
                maestro_id: profeMaria.id,
                nota: 9.0,
                fecha_registro: '2025-10-01',
                observaciones: 'Excelente desempeño.'
            },
            {
                alumno_id: alumnosData[8].id,  // Carmen Ramírez
                materia_id: materiaCie.id,
                maestro_id: profeCarlos.id,
                nota: 8.0,
                fecha_registro: '2025-10-01',
                observaciones: 'Muy bien en ciencias.'
            },

            // Calificaciones para Raúl Torres (alumno_id = 10)
            {
                alumno_id: alumnosData[9].id,  // Raúl Torres
                materia_id: materiaMate.id,
                maestro_id: profeJuan.id,
                nota: 7.0,
                fecha_registro: '2025-10-01',
                observaciones: 'Aprobado justo.'
            },
            {
                alumno_id: alumnosData[9].id,  // Raúl Torres
                materia_id: materiaHis.id,
                maestro_id: profeMaria.id,
                nota: 9.0,
                fecha_registro: '2025-10-01',
                observaciones: 'Muy bien en historia.'
            }
        ]);

        console.log('✅ Calificaciones de prueba creadas');
        
        // ----------------------------------------------
        // 9. RESUMEN
        // ----------------------------------------------
        console.log('\n📊 RESUMEN DEL SEEDING:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`👥 Usuarios: 4 (1 Admin + 3 Maestros)`);
        console.log(`👨‍🏫 Maestros: 3`);
        console.log(`🏫 Grupos: 2 (1-A con Juan, 1-B con María)`);
        console.log(`📚 Materias: 3 (Matemáticas, Historia, Ciencias)`);
        console.log(`👨‍🎓 Alumnos: 15 (8 en grupo A, 7 en grupo B)`);
        console.log(`📝 Calificaciones: 7 registros de prueba`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('🔐 CREDENCIALES DE ACCESO:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Admin:');
        console.log('  📧 Email: admin@escuela.com');
        console.log('  🔑 Password: 123456\n');
        console.log('Maestro Juan (Grupo 1-A):');
        console.log('  📧 Email: juan@escuela.com');
        console.log('  🔑 Password: 123456\n');
        console.log('Maestro María (Grupo 1-B):');
        console.log('  📧 Email: maria@escuela.com');
        console.log('  🔑 Password: 123456\n');
        console.log('Maestro Carlos:');
        console.log('  📧 Email: carlos@escuela.com');
        console.log('  🔑 Password: 123456');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('🚀 ¡SEEDING COMPLETADO EXITOSAMENTE!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error en el Seeder:', error);
        console.error('Detalles:', error.message);
        process.exit(1);
    }
};

seedDatabase();