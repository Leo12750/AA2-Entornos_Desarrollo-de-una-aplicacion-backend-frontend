const categoryService = require('../services/category-service');

// Función sencilla para validar los datos de una categoría.
// Devuelve un mensaje de error si algo está mal.
// Si todo está bien, devuelve null.
function checkCategoryData(body) {
  if (!body.name || body.name.trim() === '') {
    return 'El nombre de la categoría es obligatorio';
  }

  return null;
}

// Controlador para listar todas las categorías.
async function getCategories(req, res) {
  const categories = await categoryService.findAll();
  res.json(categories);
}

// Controlador para buscar una categoría por su id.
async function getCategory(req, res) {
  const category = await categoryService.findById(req.params.id);

  // Si no existe, devolvemos error 404.
  if (!category) {
    return res.status(404).json({ error: 'Categoría no encontrada' });
  }

  res.json(category);
}

// Controlador para crear una categoría nueva.
async function createCategory(req, res) {
  const error = checkCategoryData(req.body);

  // Si la validación falla, devolvemos error 400.
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const newCategory = await categoryService.create({
      name: req.body.name,
      description: req.body.description || ''
    });

    // 201 significa que se ha creado correctamente.
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: 'No se ha podido crear la categoría' });
  }
}

// Controlador para editar una categoría.
async function updateCategory(req, res) {
  const error = checkCategoryData(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const updatedCategory = await categoryService.update(req.params.id, {
      name: req.body.name,
      description: req.body.description || ''
    });

    // Si no existe la categoría que se quiere editar, devolvemos 404.
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: 'No se ha podido editar la categoría' });
  }
}

// Controlador para eliminar una categoría.
async function deleteCategory(req, res) {
  try {
    const deletedRows = await categoryService.remove(req.params.id);

    // Si no se ha eliminado ninguna fila, significa que no existía.
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // 204 significa que se ha eliminado correctamente y no se devuelve contenido.
    res.status(204).send();
  } catch (error) {
    // Este error suele salir si intentamos borrar una categoría con videojuegos asociados.
    res.status(400).json({
      error: 'No puedes borrar una categoría que tenga videojuegos'
    });
  }
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};