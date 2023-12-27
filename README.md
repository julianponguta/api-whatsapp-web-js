# WhatsApp Node API

Este proyecto es una API de mensajería utilizando WhatsApp a través de Node.js, Express y la biblioteca whatsapp-web.js. Permite enviar mensajes, autenticarse y manejar sesiones de WhatsApp de manera sencilla y eficiente.

## Comenzando

Sigue estas instrucciones para obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos

Antes de empezar, asegúrate de tener instalado Node.js y opcionalmente Docker para la gestión de contenedores.


### Instalación

Primero, clona el repositorio a tu máquina local:


Instala las dependencias necesarias:


Para iniciar la aplicación, ejecuta:


O, si prefieres usar Docker, construye y ejecuta el contenedor:


## Uso

Una vez que la aplicación esté corriendo, podrás:

- **Autenticarte con WhatsApp**: Visita `/auth/qr` para obtener el código QR y autenticarte.
- **Enviar mensajes**: Usa la ruta `/messages/send` con los parámetros adecuados.
- **Cerrar sesión**: Accede a `/auth/logout` para cerrar la sesión activa.

## Construido con

- [Node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript.
- [Express](https://expressjs.com/) - Framework para aplicaciones web.
- [whatsapp-web.js](https://wwebjs.dev/) - Cliente de WhatsApp para Node.js.

## Docker

El proyecto incluye archivos `Dockerfile` y `docker-compose.yml` para facilitar el despliegue y la ejecución en contenedores Docker.

## Contribuyendo

Si tienes sugerencias para mejorar este proyecto, siéntete libre de realizar un fork y luego enviar tus pull requests o abrir un issue.

## Autores

- Julian P. - Desarrollo inicial - [julianponguta](https://github.com/julianponguta/)

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo `LICENSE` para detalles.

## Agradecimientos

- Agradecimiento a todos los que contribuyen a mantener las librerías utilizadas en este proyecto.
