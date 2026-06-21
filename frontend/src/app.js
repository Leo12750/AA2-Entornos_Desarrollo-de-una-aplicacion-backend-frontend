import axios from 'axios';

// URL donde está funcionando el backend.
const apiUrl = 'http://localhost:8081';

// Elementos del formulario de categorías.
const categoryForm = document.getElementById('category-form');
const categoryId = document.getElementById('category-id');
const categoryName = document.getElementById('category-name');
const categoryDescription = document.getElementById('category-description');
const categoriesList = document.getElementById('categories-list');
const cancelCategory = document.getElementById('cancel-category');

// Elementos del formulario de videojuegos.
const videogameForm = document.getElementById('videogame-form');
const videogameId = document.getElementById('videogame-id');
const videogameTitle = document.getElementById('videogame-title');
const videogamePlatform = document.getElementById('videogame-platform');
const videogameYear = document.getElementById('videogame-year');
const videogamePrice = document.getElementById('videogame-price');
const videogameCategory = document.getElementById('videogame-category');
const videogamesList = document.getElementById('videogames-list');
const cancelVideogame = document.getElementById('cancel-videogame');

// Arrays donde guardamos temporalmente los datos recibidos del backend.
let categories = [];
let videogames = [];

// Carga los datos iniciales de la aplicación.
// Primero cargamos categorías porque los videojuegos necesitan el select de categorías.
async function loadData() {
  await loadCategories();
  await loadVideogames();
}

// Pide al backend todas las categorías.
async function loadCategories() {
  const response = await axios.get(`${apiUrl}/categories`);

  categories = response.data;

  printCategories();
  fillCategorySelect();
}

// Muestra las categorías en pantalla.
function printCategories() {
  // Limpiamos el listado antes de volver a pintar.
  categoriesList.innerHTML = '';

  categories.forEach(category => {
    const div = document.createElement('div');
    div.className = 'item';

    div.innerHTML = `
      <h3>${category.name}</h3>
      <p>${category.description || 'Sin descripción'}</p>
      <div class="item-actions">
        <button class="edit-category" data-id="${category.id}">Editar</button>
        <button class="delete delete-category" data-id="${category.id}">Eliminar</button>
      </div>
    `;

    categoriesList.appendChild(div);
  });

  // Añadimos los eventos a los botones de editar.
  document.querySelectorAll('.edit-category').forEach(button => {
    button.addEventListener('click', editCategory);
  });

  // Añadimos los eventos a los botones de eliminar.
  document.querySelectorAll('.delete-category').forEach(button => {
    button.addEventListener('click', deleteCategory);
  });
}

// Rellena el select de categorías del formulario de videojuegos.
function fillCategorySelect() {
  videogameCategory.innerHTML = '<option value="">Selecciona una categoría</option>';

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    videogameCategory.appendChild(option);
  });
}

// Evento del formulario de categorías.
// Sirve tanto para crear como para editar.
categoryForm.addEventListener('submit', async event => {
  event.preventDefault();

  // Validación sencilla en frontend.
  if (categoryName.value.trim() === '') {
    alert('El nombre de la categoría es obligatorio');
    return;
  }

  const category = {
    name: categoryName.value,
    description: categoryDescription.value
  };

  try {
    if (categoryId.value) {
      // Si hay id, hacemos PUT para editar.
      await axios.put(`${apiUrl}/categories/${categoryId.value}`, category);
    } else {
      // Si no hay id, hacemos POST para crear.
      await axios.post(`${apiUrl}/categories`, category);
    }

    resetCategoryForm();
    await loadData();
  } catch (error) {
    alert('No se ha podido guardar la categoría');
  }
});

// Pone los datos de una categoría en el formulario para editarla.
function editCategory(event) {
  const id = Number(event.target.dataset.id);
  const category = categories.find(category => category.id === id);

  categoryId.value = category.id;
  categoryName.value = category.name;
  categoryDescription.value = category.description || '';
}

// Elimina una categoría.
async function deleteCategory(event) {
  const id = event.target.dataset.id;

  if (!confirm('¿Seguro que quieres eliminar esta categoría?')) {
    return;
  }

  try {
    await axios.delete(`${apiUrl}/categories/${id}`);
    await loadData();
  } catch (error) {
    // Este error puede pasar si la categoría tiene videojuegos asociados.
    alert('No se puede borrar una categoría que tenga videojuegos');
  }
}

// Limpia el formulario de categorías.
function resetCategoryForm() {
  categoryId.value = '';
  categoryName.value = '';
  categoryDescription.value = '';
}

// Botón cancelar del formulario de categorías.
cancelCategory.addEventListener('click', resetCategoryForm);

// Pide al backend todos los videojuegos.
async function loadVideogames() {
  const response = await axios.get(`${apiUrl}/videogames`);

  videogames = response.data;

  printVideogames();
}

// Muestra los videojuegos en pantalla.
function printVideogames() {
  videogamesList.innerHTML = '';

  videogames.forEach(videogame => {
    const div = document.createElement('div');
    div.className = 'item';

    div.innerHTML = `
      <h3>${videogame.title}</h3>
      <p><strong>Plataforma:</strong> ${videogame.platform}</p>
      <p><strong>Año:</strong> ${videogame.release_year || 'Sin año'}</p>
      <p><strong>Precio:</strong> ${videogame.price} €</p>
      <p><strong>Categoría:</strong> ${videogame.category_name}</p>
      <div class="item-actions">
        <button class="edit-videogame" data-id="${videogame.id}">Editar</button>
        <button class="delete delete-videogame" data-id="${videogame.id}">Eliminar</button>
      </div>
    `;

    videogamesList.appendChild(div);
  });

  // Botones para editar videojuegos.
  document.querySelectorAll('.edit-videogame').forEach(button => {
    button.addEventListener('click', editVideogame);
  });

  // Botones para eliminar videojuegos.
  document.querySelectorAll('.delete-videogame').forEach(button => {
    button.addEventListener('click', deleteVideogame);
  });
}

// Evento del formulario de videojuegos.
// Sirve para crear y editar videojuegos.
videogameForm.addEventListener('submit', async event => {
  event.preventDefault();

  // Validaciones básicas antes de enviar al backend.
  if (videogameTitle.value.trim() === '') {
    alert('El título es obligatorio');
    return;
  }

  if (videogamePlatform.value.trim() === '') {
    alert('La plataforma es obligatoria');
    return;
  }

  if (videogamePrice.value === '' || Number(videogamePrice.value) < 0) {
    alert('El precio debe ser mayor o igual que 0');
    return;
  }

  if (videogameCategory.value === '') {
    alert('Debes seleccionar una categoría');
    return;
  }

  const videogame = {
    title: videogameTitle.value,
    platform: videogamePlatform.value,
    release_year: videogameYear.value,
    price: videogamePrice.value,
    category_id: videogameCategory.value
  };

  try {
    if (videogameId.value) {
      // Si hay id, editamos el videojuego.
      await axios.put(`${apiUrl}/videogames/${videogameId.value}`, videogame);
    } else {
      // Si no hay id, creamos un videojuego nuevo.
      await axios.post(`${apiUrl}/videogames`, videogame);
    }

    resetVideogameForm();
    await loadVideogames();
  } catch (error) {
    alert('No se ha podido guardar el videojuego');
  }
});

// Carga los datos de un videojuego en el formulario para poder editarlo.
function editVideogame(event) {
  const id = Number(event.target.dataset.id);
  const videogame = videogames.find(videogame => videogame.id === id);

  videogameId.value = videogame.id;
  videogameTitle.value = videogame.title;
  videogamePlatform.value = videogame.platform;
  videogameYear.value = videogame.release_year || '';
  videogamePrice.value = videogame.price;
  videogameCategory.value = videogame.category_id;
}

// Elimina un videojuego.
async function deleteVideogame(event) {
  const id = event.target.dataset.id;

  if (!confirm('¿Seguro que quieres eliminar este videojuego?')) {
    return;
  }

  await axios.delete(`${apiUrl}/videogames/${id}`);
  await loadVideogames();
}

// Limpia el formulario de videojuegos.
function resetVideogameForm() {
  videogameId.value = '';
  videogameTitle.value = '';
  videogamePlatform.value = '';
  videogameYear.value = '';
  videogamePrice.value = '';
  videogameCategory.value = '';
}

// Botón cancelar del formulario de videojuegos.
cancelVideogame.addEventListener('click', resetVideogameForm);

// Al abrir la página, cargamos los datos iniciales.
loadData();