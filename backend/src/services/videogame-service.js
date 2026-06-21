const { db } = require('../database');

// Devuelve todos los videojuegos.
// Con el join unimos videogames con categories para mostrar el nombre de la categoría.
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
// También hacemos join para que devuelva el nombre de la categoría.
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

// Crea un videojuego nuevo.
async function create(videogame) {
  const ids = await db('videogames').insert(videogame);

  // Después de crearlo, devolvemos el videojuego completo con su categoría.
  return findById(ids[0]);
}

// Edita un videojuego existente.
async function update(id, videogame) {
  const updatedRows = await db('videogames')
    .where({ id })
    .update(videogame);

  // Si no se ha actualizado ninguna fila, significa que no existía.
  if (updatedRows === 0) {
    return null;
  }

  // Devolvemos el videojuego actualizado con el nombre de su categoría.
  return findById(id);
}

// Elimina un videojuego por su id.
function remove(id) {
  return db('videogames')
    .where({ id })
    .del();
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};