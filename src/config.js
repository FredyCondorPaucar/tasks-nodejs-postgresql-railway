// Importar sensibles 
const { config } = require('dotenv')

// Llamar al metodo config de dotenv
config();

module.exports = {
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    },
    serverPort:process.env.SERVER_PORT||4000
}