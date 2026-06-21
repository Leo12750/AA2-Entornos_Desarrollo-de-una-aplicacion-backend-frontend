const path = require('path');
const knex = require('knex');

// Creamos la conexión con la base de datos SQLite.
// Knex nos permite trabajar con la base de datos usando JavaScript.
const db = knex({
  client: 'sqlite3',
  connection: {
    // La base de datos se guardará dentro de backend/database/videogames.db
    filename: path.join(__dirname, '..', 'database', 'videogames.db')
  },
  useNullAsDefault: true
});

// Esta función se ejecuta al iniciar el backend.
// Sirve para crear las tablas y meter datos de ejemplo si todavía no existen.
async function initDatabase() {
  // Activamos las claves foráneas en SQLite.
  // Esto sirve para que un videojuego tenga que pertenecer a una categoría real.
  await db.raw('PRAGMA foreign_keys = ON');

  // Comprobamos si ya existe la tabla categories.
  const existsCategories = await db.schema.hasTable('categories');

  // Si la tabla no existe, la creamos.
  if (!existsCategories) {
    await db.schema.createTable('categories', table => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.string('description');
    });

    // Insertamos algunas categorías iniciales para poder probar la app.
    await db('categories').insert([
      { name: 'RPG', description: 'Juegos de rol y aventura' },
      { name: 'Acción', description: 'Juegos con combates y mucha acción' },
      { name: 'Deportes', description: 'Juegos relacionados con deportes' }
    ]);
  }

  // Comprobamos si ya existe la tabla videogames.
  const existsVideogames = await db.schema.hasTable('videogames');

  // Si la tabla no existe, la creamos.
  if (!existsVideogames) {
    await db.schema.createTable('videogames', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('platform').notNullable();
      table.integer('release_year');
      table.float('price').notNullable();

      // Este campo relaciona cada videojuego con una categoría.
      table.integer('category_id').unsigned().notNullable();

      // Clave foránea hacia la tabla categories.
      // onDelete('RESTRICT') evita borrar una categoría si tiene videojuegos asociados.
      table.foreign('category_id').references('categories.id').onDelete('RESTRICT');
    });

    // Insertamos algunos videojuegos iniciales para probar el listado.
    await db('videogames').insert([
      {
        title: 'The Legend of Zelda',
        platform: 'Nintendo Switch',
        release_year: 2017,
        price: 59.99,
        category_id: 1
      },
      {
        title: 'God of War',
        platform: 'PlayStation',
        release_year: 2018,
        price: 39.99,
        category_id: 2
      },
      {
        title: 'FIFA 24',
        platform: 'PC',
        release_year: 2023,
        price: 49.99,
        category_id: 3
      }
    ]);
  }
}

module.exports = {
  db,
  initDatabase
};