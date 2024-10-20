const { Pool } = require('pg');
const { db } = require('./config');

// Configurar el pool de conexiones
const pool = new Pool({
  connectionString: db.connectionString    
});

module.exports = pool;