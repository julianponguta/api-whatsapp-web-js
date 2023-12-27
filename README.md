# WhatsApp Node API

This project is a messaging API using WhatsApp through Node.js, Express, and the whatsapp-web.js library. It allows you to send messages, authenticate, and handle WhatsApp sessions easily and efficiently.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, make sure you have Node.js installed and optionally Docker for container management.

### Installation

First, clone the repository to your local machine: `git clone https://github.com/julianponguta/api-whatsapp-web-js && cd api-whatsapp-web-js`

Install the necessary dependencies: `npm install`

To start the application, run: `node index.js`

Or, if you prefer to use Docker, build and run the container: `docker-compose up --build`

## Usage

Once the application is running, you have several endpoints available for interacting with the WhatsApp client:

### Authenticate with WhatsApp

- **Get QR Code for Authentication**
  - **Endpoint**: `GET /auth/qr`
  - **Description**: Visit this endpoint to request a QR code. You'll need to check the server's terminal where the application is running to scan the QR code with your WhatsApp mobile app.

### Session Management

- **Check Session Status**

  - **Endpoint**: `GET /auth/status`
  - **Description**: Use this endpoint to check the current status of the WhatsApp session. It will return the session's state, letting you know if you're authenticated or if the session is disconnected.

- **Log Out**
  - **Endpoint**: `POST /auth/logout`
  - **Description**: Send a request to this endpoint to log out of the active WhatsApp session. This will invalidate the current session, requiring re-authentication via QR code for future requests.

### Messaging

- **Send Messages**
  - **Endpoint**: `POST /messages/send`
  - **Description**: To send messages, use this endpoint with the required parameters. You need to provide the recipient's phone number in international format and the message text.
    - **Parameters**:
      - `number`: The recipient's phone number, including the country code.
      - `message`: The text message you want to send.
    - **Example**: `{ "number": "1234567890", "message": "Hello, World!" }`
  - **Response**: On success, you'll receive the status of the message and its ID. If there's an error, you'll get the error message.

Remember to authenticate and maintain an active session to use the messaging features successfully. Each endpoint provides specific feedback, so consult your terminal and the API responses for the most accurate and up-to-date information.

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [Express](https://expressjs.com/) - Framework for web applications.
- [whatsapp-web.js](https://wwebjs.dev/) - WhatsApp client for Node.js.

## Docker

The project includes `Dockerfile` and `docker-compose.yml` files to facilitate deployment and execution in Docker containers.

## Contributing

If you have suggestions to improve this project, feel free to fork it and then submit your pull requests or open an issue.

## Authors

- Julian P. - Initial development - [julianponguta](https://github.com/julianponguta/)

## License

This project is under the MIT License - see the `LICENSE` file for details.

## Acknowledgments

- Thanks to everyone who contributes to maintaining the libraries used in this project.
