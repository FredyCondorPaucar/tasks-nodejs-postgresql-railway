// Importar dependencia
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const { serverPort } = require('./config');
const initDb = require('./initDb'); 

const app = express();
console.log('Servidor iniciando...')

// Importar servicio
const checkConnection = require('./connectDatabase');

checkConnection();

// Configurar morgan
app.use(morgan('dev'));

// Configurar CORS
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cargar conf rutas
const tasksRoutes = require("./routes/tasks");

app.use("/api/tasks", tasksRoutes);

// Manejar rutas no encontradas (404)
app.use((req, res, next) => {
    return res.status(404).json({ message: 'Route not found' });
  });

// Manejar los errores generales
app.use((error, req, res, next) => {
  return res.json({
    message: error.message
  })
})  

// Configurar Puerto a escuchar
const PORT = serverPort;

initDb(); // Llama al script para inicializar la base de datos

// Configurar el puerto que va escuchar el servidor
app.listen(PORT, ()=>{    
    console.log(`El servidor escucha el puerto ${PORT}`)    
})