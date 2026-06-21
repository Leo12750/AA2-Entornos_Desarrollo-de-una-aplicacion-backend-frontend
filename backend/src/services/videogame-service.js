const { db } = require('../database');

// Devuelve todos los videojuegos.
// Hacemos un join con categories para mostrar también el nombre de la categoría.
function findAll() {
  return db('videogames')
    .select(
      'videogames.id',
      'videogames.title',
      'videogames.platform',
      'videogames.release_year',
      'videogames.price',
      'videogames.category_id',
      'categories.name as category_name'
    )
    .join('categories', 'videogames.category_id', 'categories.id')
    .orderBy('videogames.id');
}

// Busca un videojuego concreto por su id.
// También se une con categories para devolver el nombre de la categoría.
function findById(id) {
  return db('videogames')
    .select(
      'videogames.id',
      'videogames.title',
      'videogames.platform',
      'videogames.release_year',
      'videogames.price',
      'videogames.category_id',
      'categories.name as category_name'
    )
    .join('categories', 'videogames.category_id', 'categories.id')
    .where('videogames.id', id)
    .first();
}

// Crea un videojuego nuevo en la base de datos.
async function create(videogame) {
  const ids = await db('videogames').insert(videogame);

  // Devolvemos el videojuego recién creado.
  return findById(ids[0]);
}

// Edita un videojuego existente.
async function update(id, videogame) {
  const updatedRows = await db('videogames').where({ id }).update(videogame);

  // Si no se ha actualizado ninguna fila, el videojuego no existía.
  if (updatedRows === 0) {
    return null;
  }

  return findById(id);
}

// Elimina un videojuego por su id.
function remove(id) {
  return db('videogames').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};