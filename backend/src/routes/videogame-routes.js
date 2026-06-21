const express = require('express');
const videogameController = require('../controllers/videogame-controller');

// Creamos un router de Express.
// Aquí se agrupan todas las rutas relacionadas con videojuegos.
const router = express.Router();

// GET /videogames
// Devuelve todos los videojuegos.
router.get('/', videogameController.getVideogames);

// GET /videogames/:id
// Devuelve un videojuego concreto por su id.
router.get('/:id', videogameController.getVideogame);

// POST /videogames
// Crea un videojuego nuevo.
router.post('/', videogameController.createVideogame);

// PUT /videogames/:id
// Edita un videojuego existente.
router.put('/:id', videogameController.updateVideogame);

// DELETE /videogames/:id
// Elimina un videojuego.
router.delete('/:id', videogameController.deleteVideogame);

module.exports = router;