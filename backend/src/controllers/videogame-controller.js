const videogameService = require('../services/videogame-service');

// Función para validar los datos que llegan desde el frontend.
// Si algo está mal, devuelve un mensaje de error.
// Si todo está correcto, devuelve null.
function checkVideogameData(body) {
  if (!body.title || body.title.trim() === '') {
    return 'El título es obligatorio';
  }

  if (!body.platform || body.platform.trim() === '') {
    return 'La plataforma es obligatoria';
  }

  if (body.price === undefined || Number(body.price) < 0) {
    return 'El precio debe ser mayor o igual que 0';
  }

  if (!body.category_id) {
    return 'La categoría es obligatoria';
  }

  return null;
}

// Esta función prepara el objeto videojuego antes de guardarlo en la base de datos.
// Convertimos price y category_id a número porque desde el formulario llegan como texto.
function buildVideogame(body) {
  return {
    title: body.title,
    platform: body.platform,
    release_year: body.release_year || null,
    price: Number(body.price),
    category_id: Number(body.category_id)
  };
}

// Controlador para listar todos los videojuegos.
async function getVideogames(req, res) {
  const videogames = await videogameService.findAll();
  res.json(videogames);
}

// Controlador para buscar un videojuego por su id.
async function getVideogame(req, res) {
  const videogame = await videogameService.findById(req.params.id);

  if (!videogame) {
    return res.status(404).json({ error: 'Videojuego no encontrado' });
  }

  res.json(videogame);
}

// Controlador para crear un videojuego nuevo.
async function createVideogame(req, res) {
  const error = checkVideogameData(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const newVideogame = await videogameService.create(buildVideogame(req.body));
    res.status(201).json(newVideogame);
  } catch (error) {
    // Puede fallar si la categoría indicada no existe.
    res.status(400).json({ error: 'No se ha podido crear el videojuego' });
  }
}

// Controlador para editar un videojuego existente.
async function updateVideogame(req, res) {
  const error = checkVideogameData(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const updatedVideogame = await videogameService.update(
      req.params.id,
      buildVideogame(req.body)
    );

    if (!updatedVideogame) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }

    res.json(updatedVideogame);
  } catch (error) {
    res.status(400).json({ error: 'No se ha podido editar el videojuego' });
  }
}

// Controlador para eliminar un videojuego.
async function deleteVideogame(req, res) {
  const deletedRows = await videogameService.remove(req.params.id);

  if (deletedRows === 0) {
    return res.status(404).json({ error: 'Videojuego no encontrado' });
  }

  res.status(204).send();
}

module.exports = {
  getVideogames,
  getVideogame,
  createVideogame,
  updateVideogame,
  deleteVideogame
};