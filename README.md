# AA2 Entornos - Aplicación backend + frontend

Aplicación web sencilla para gestionar videojuegos y categorías.

Está hecha siguiendo la idea de los apuntes del profesor de backend + frontend:

- Backend con Node.js, Express, SQLite y Knex.
- Frontend con HTML, CSS, JavaScript y Axios.
- Backend y frontend separados.
- API REST con CRUD completo.

## Modelo de datos

La aplicación tiene 2 elementos principales:

1. `categories`
2. `videogames`

Un videojuego pertenece a una categoría mediante `category_id`.

## Endpoints del backend

### Categorías

- `GET /categories` - listar categorías
- `GET /categories/:id` - ver una categoría
- `POST /categories` - crear categoría
- `PUT /categories/:id` - editar categoría
- `DELETE /categories/:id` - eliminar categoría

### Videojuegos

- `GET /videogames` - listar videojuegos
- `GET /videogames/:id` - ver un videojuego
- `POST /videogames` - crear videojuego
- `PUT /videogames/:id` - editar videojuego
- `DELETE /videogames/:id` - eliminar videojuego

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

- Registrar categorías.
- Visualizar categorías.
- Editar categorías.
- Eliminar categorías.

### Videojuegos

- Registrar videojuegos.
- Visualizar videojuegos.
- Editar videojuegos.
- Eliminar videojuegos.
- Asignar una categoría a cada videojuego.

## Notas importantes

No se puede eliminar una categoría si tiene videojuegos asociados. Primero hay que borrar o editar esos videojuegos.

No se debe subir la carpeta `node_modules` al repositorio.
