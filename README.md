<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Proyecto 01

## Descripción:

- El cliente necesita una API para gestionar tareas personales. Cada tarea tiene un título, una descripción y un estado (pendiente o completada).

## Requerimientos Funcionales:

1. Crear una nueva tarea.
2. Listar todas las tareas.
3. Editar una tarea (título, descripción o estado).
4. Eliminar una tarea.

## Requerimientos No Funcionales:

1. Validar los datos de entrada (título obligatorio, descripción opcional).
2. Persistir los datos en una base de datos MySQL.
3. Documentar la API con Swagger.

## Endpoints Ejemplo:

```
POST /tasks → Crear una tarea.
Body:
{
  "title": "Comprar pan",
  "description": "Comprar pan en la panadería del centro"
}
GET /tasks → Listar todas las tareas.
PUT /tasks/:id → Editar una tarea.
DELETE /tasks/:id → Eliminar una tarea.
```

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
pnpm i
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up -d
```

5. Clonar el archivo **.env.template** y renombrar la copia a **.env**

6. Llenar las variables de entorno definidas en el `.env`

7. Ejecutar la aplicación en dev:

```
pnpm start:dev || npm start:dev || yarn start:dev
```

8. Reconstruir la base de datos con la semilla

```
http://localhost:3000/api/v1/seed
```

## Stack Usado

- Mysql
- Nest JS

## Tiempo empleado

- 2 Horas.
