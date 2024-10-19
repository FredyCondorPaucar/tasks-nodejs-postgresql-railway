const pool = require('./db');

// Función flecha asíncrona para verificar la conexión a la base de datos
const checkConnection = async () => {
    let client;
    try {
      client = await pool.connect(); // Intentar conectar
      console.log('Conexión exitosa con la base de datos');
    } catch (err) {
      console.error('Error al conectar con la base de datos', err.stack); // Manejo de error
    } finally {
      if (client) {
        client.release(); // Liberar el cliente después de usarlo
      }
    }
  };
  
  module.exports = checkConnection;