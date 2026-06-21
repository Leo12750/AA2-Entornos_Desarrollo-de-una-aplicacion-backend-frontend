const express = require('express');
const cors = require('cors');

const { initDatabase } = require('./database');
const categoryRoutes = require('./routes/category-routes');
const videogameRoutes = require('./routes/videogame-routes');

// Creamos la aplicación de Express.
// Express será el encargado de levantar el servidor backend.
const app = express();

// Puerto donde se ejecutará la API.
const port = 8081;

// Activamos CORS para que el frontend pueda hacer peticiones al backend.
// Sin esto, el navegador podría bloquear las peticiones entre frontend y backend.
app.use(cors());

// Permitimos que Express entienda datos en formato JSON.
// Esto es necesario para recibir datos en POST y PUT.
app.use(express.json());

// Ruta principal para comprobar que el backend está funcionando.
app.get('/', (req, res) => {
  res.json({ message: 'API de videojuegos funcionando correctamente' });
});

// Rutas de categorías.
// Todas las rutas de category-routes.js empezarán por /categories.
app.use('/categories', categoryRoutes);

// Rutas de videojuegos.
// Todas las rutas de videogame-routes.js empezarán por /videogames.
app.use('/videogames', videogameRoutes);

// Antes de arrancar el servidor, inicializamos la base de datos.
// Si las tablas no existen, se crean automáticamente.
initDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor iniciado en http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error al iniciar la base de datos:', error);
  });