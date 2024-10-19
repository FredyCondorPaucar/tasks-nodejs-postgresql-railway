// Importar sensibles 
const { config } = require('dotenv')

// Llamar al metodo config de dotenv
config();

module.exports = {
    db: {
        connectionString: process.env.DATABASE_URL,
    },
    serverPort:process.env.SERVER_PORT||4000
}