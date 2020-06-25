# angular-web-core

Proyecto Front-End de Angular para proyecto de Ingeniería Web.

## Funcionalidad
Permite registrar usuarios, y libros para realizar intercambios entre usuarios.
Antes de ejecutar, se debe ejecutar el script `setup.sql` para ingresar roles y usuarios por defecto.

## Usuarios por defecto
Usuario: admin
Clave: admin

## Requerimientos
- [Node.js](https://nodejs.org/en/).
- [Angular CLI](https://cli.angular.io/).
- [Base de datos Postgres](https://www.postgresql.org/) y un [DBMS](https://www.pgadmin.org/) (en el archivo `postgres.sql` se encuentra un backup de la base para restaurar en pgadmin).
- Datos ingresados a la base.
- [Proyecto Back-End de Node.js](https://github.com/Centeno448/node-web-core). El proyecto de Node.js **debe** estar en ejecución mientras se ejecute el proyecto de Angular.
- Ganas de leer los mensajes de error que inevitablemente saldran al tratar de instalar.

## Pasos
1. Clonear el repositorio.
2. Desde la consola, navegar a la ubicacion del proyecto.
3. Ejecutar el comando `npm install` para instalar todas las dependencias del proyecto
4. Ejecutar el comando `ng serve -o` para ejecutar el proyecto. (si falla, usar `npm start`)
