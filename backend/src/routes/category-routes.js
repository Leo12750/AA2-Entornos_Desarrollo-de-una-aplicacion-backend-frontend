const express = require('express');
const categoryController = require('../controllers/category-controller');

// Creamos un router de Express.
// Aquí se agrupan todas las rutas relacionadas con categorías.
const router = express.Router();

// GET /categories
// Devuelve todas las categorías.
router.get('/', categoryController.getCategories);

// GET /categories/:id
// Devuelve una categoría concreta por su id.
router.get('/:id', categoryController.getCategory);

// POST /categories
// Crea una categoría nueva.
router.post('/', categoryController.createCategory);

// PUT /categories/:id
// Edita una categoría existente.
router.put('/:id', categoryController.updateCategory);

// DELETE /categories/:id
// Elimina una categoría.
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;