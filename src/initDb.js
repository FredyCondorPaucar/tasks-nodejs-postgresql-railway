const pool = require('./db'); // Asegúrate de que la ruta sea correcta

const initDb = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS task (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE,
            description VARCHAR(255), 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log("Tabla 'tasks' creada o ya existe.");
    } catch (error) {
        console.error("Error al crear la tabla:", error);
    }
};

// Exportar la función
module.exports = initDb;
