# WhatsApp Node API

This project is a messaging API using WhatsApp through Node.js, Express, and the whatsapp-web.js library. It allows you to send messages, authenticate, and handle WhatsApp sessions easily and efficiently.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites

Before you begin, make sure you have Node.js installed and optionally Docker for container management.


### Instalación

First, clone the repository to your local machine:


Install the necessary dependencies:


To start the application, run:


Or, if you prefer to use Docker, build and run the container:


## Usage

Once the application is running, you can:

- **Authenticate with WhatsApp**: Visit `/auth/qr` to get the QR code and authenticate.
- **Send messages**: Use the `/messages/send` route with the appropriate parameters.
- **Log out**: Access  `/auth/logout` to log out of the active session.

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [Express](https://expressjs.com/) - Framework for web applications.
- [whatsapp-web.js](https://wwebjs.dev/) - WhatsApp client for Node.js.

## Docker

The project includes  `Dockerfile` and `docker-compose.yml` files to facilitate deployment and execution in Docker containers.

## Contributing

If you have suggestions to improve this project, feel free to fork it and then submit your pull requests or open an issue.

## Authors

- Julian P. -  Initial development - [julianponguta](https://github.com/julianponguta/)

## License

This project is under the MIT License - see the `LICENSE` file for details.

## Acknowledgments

- Thanks to everyone who contributes to maintaining the libraries used in this project.
