# Proyecto: CRUD con Vue 3 y Flask REST API

Este repositorio contiene la integración de un Backend moderno con Flask (trabajando de manera 100% headless como REST API) y un Frontend desarrollado de manera reactiva e independiente empleando **Vue 3**.

## Características principales
- **Desacoplamiento Frontend/Backend**: La aplicación Flask actúa como un microservicio prestando APIs consumibles.
- **Frontend con Vue 3**: Módulo refactorizado hacia un enfoque moderno empleando la herramienta `Vite` y abandonando el antiguo Vue CLI.
- **Operaciones Asíncronas (AJAX)**: Implementación total de las operaciones de CRUD (Crear, Leer, Modificar, Eliminar) interactuando hacia el servidor usando la API de JavaScript nativa, `fetch()`. Además, se hace uso del protocolo `FormData` para enviar POST.
- **CORS Autorizado**: Backend de Flask equipado y configurado con la biblioteca `Flask-CORS` para tolerar las consultas en modo cliente-servidor, que por default caen sobre la misma directiva de dominios estrictos que impone el navegador.
- **Tránsito de Componentes**: Demostración y arquitectura sobre el paso de mensajes robusto y ágil entre componentes en una estructura de `Padre-Hijo`, usando inyección por referencias de propiedades y emitiendo directrices descendientes a través del notificador nativo (`$emit`) en caso de eventos personalizados generados por acciones visuales en pantalla.

## Instalación y ejecución

### Backend (Flask REST API)
1. Instala el conector general y la herramienta `flask-cors`.
2. Lanza tu servidor (usualmente sobre el puerto `5000`).

### Frontend (Vue 3 sobre Vite)
1. Abre tu consola y sitúate directamente en la carpeta donde reside el proyecto y el `package.json`.
2. Descarga y sincroniza las dependencias NPM usando:
   ```bash
   npm install
   ```
3. Activa tu entorno de desarrollo en vivo vía vite ingresando:
   ```bash
   npm run dev
   ```

## Más información
Encuentra todos los pormenores, paso a paso y lineamientos de código sobre todas estas áreas de programación web integradas en nuestra serie de estudio oficial:
[Curso de Flask en Desarrollo Libre](https://www.desarrollolibre.net/blog/flask/curso-flask)
