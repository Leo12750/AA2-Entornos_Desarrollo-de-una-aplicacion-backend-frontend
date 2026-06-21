const { db } = require('../database');

// El service es la capa que trabaja directamente con la base de datos.
// El controller recibe la petición y el service hace las consultas.

// Devuelve todas las categorías ordenadas por id.
function findAll() {
  return db('categories').select('*').orderBy('id');
}

// Busca una categoría concreta por su id.
function findById(id) {
  return db('categories').where({ id }).first();
}

// Crea una categoría nueva.
async function create(category) {
  const ids = await db('categories').insert(category);

  // En SQLite, Knex devuelve el id insertado dentro de un array.
  return findById(ids[0]);
}

// Edita una categoría existente.
async function update(id, category) {
  const updatedRows = await db('categories').where({ id }).update(category);

  // Si no se ha actualizado ninguna fila, significa que no existía.
  if (updatedRows === 0) {
    return null;
  }

  return findById(id);
}

// Elimina una categoría por su id.
function remove(id) {
  return db('categories').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};