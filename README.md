# AA2 Entornos - Aplicación backend + frontend

Aplicación web sencilla para gestionar videojuegos y categorías.

Está hecha siguiendo la idea de los apuntes del profesor de backend + frontend:

* Backend con Node.js, Express, SQLite y Knex.
* Frontend con HTML, CSS, JavaScript y Axios.
* Backend y frontend separados.
* API REST con CRUD completo.

## Modelo de datos

La aplicación tiene 2 elementos principales:

1. `categories`
2. `videogames`

Un videojuego pertenece a una categoría mediante `category_id`.

La relación es:

```text
videogames.category_id → categories.id
```

Además, en el backend se usa un `join` para mostrar también el nombre de la categoría de cada videojuego.

## Endpoints del backend

### Categorías

* `GET /categories` - listar categorías.
* `GET /categories/:id` - ver una categoría.
* `POST /categories` - crear categoría.
* `PUT /categories/:id` - editar categoría.
* `DELETE /categories/:id` - eliminar categoría.

### Videojuegos

* `GET /videogames` - listar videojuegos.
* `GET /videogames/:id` - ver un videojuego.
* `POST /videogames` - crear videojuego.
* `PUT /videogames/:id` - editar videojuego.
* `DELETE /videogames/:id` - eliminar videojuego.

## Cómo ejecutar el backend

Entrar en la carpeta del backend:

```bash
cd backend
npm install
npm run dev
```

El backend se ejecuta en:

```text
http://localhost:8081
```

La base de datos SQLite se crea automáticamente en:

```text
backend/database/videogames.db
```

## Cómo ejecutar el frontend

Abrir otra terminal y entrar en la carpeta del frontend:

```bash
cd frontend
npm install
npm start
```

El frontend se abre en:

```text
http://localhost:1234
```

## Funcionalidades

### Categorías

* Registrar categorías.
* Visualizar categorías.
* Editar categorías.
* Eliminar categorías.

### Videojuegos

* Registrar videojuegos.
* Visualizar videojuegos.
* Editar videojuegos.
* Eliminar videojuegos.
* Asignar una categoría a cada videojuego.

## Validaciones

El frontend valida los datos antes de enviarlos al backend.

Por ejemplo:

* El nombre de la categoría no puede estar vacío.
* El título del videojuego no puede estar vacío.
* La plataforma no puede estar vacía.
* El precio debe ser mayor o igual que 0.
* El videojuego debe tener una categoría seleccionada.

## Colección Postman

Se ha añadido una colección Postman para probar los endpoints de la API.

Archivo:

```text
backend/docs/videogames-api.postman.json
```

Incluye peticiones de ejemplo para:

* Listar, crear, editar y eliminar categorías.
* Listar, crear, editar y eliminar videojuegos.

## Wiki

El repositorio incluye una wiki con la especificación de la API desarrollada como backend.

## Trabajo con ramas y Pull Requests

El desarrollo se ha dividido en ramas de trabajo y se ha fusionado mediante Pull Requests.

Algunas ramas usadas:

* `feature/estructura-inicial`
* `feature/backend-base`
* `feature/backend-categorias`
* `feature/backend-videojuegos`
* `feature/frontend-base`
* `feature/frontend-crud`
* `feature/postman-collection`
* `feature/relacion-videojuegos-categorias`

## Notas importantes

No se puede eliminar una categoría si tiene videojuegos asociados. Primero hay que borrar o editar esos videojuegos.

No se debe subir la carpeta `node_modules` al repositorio.

No se debe subir la base de datos generada automáticamente:

```text
backend/database/videogames.db
```

La base de datos se genera al ejecutar el backend.
