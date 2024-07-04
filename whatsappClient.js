// Importar las dependencias necesarias
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");

// Ruta del archivo de sesión
const SESSION_FILE_PATH = "./session.json";

let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

// Añadir configuraciones de Puppeteer aquí
const client = new Client({
  authStrategy: new LocalAuth(),
  session: sessionCfg,
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

// Evento que se ejecuta cuando el cliente está listo
client.on("ready", () => {
  console.log("Cliente está listo!");
});

// Evento que se ejecuta cuando se genera un código QR
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Evento que se ejecuta cuando el cliente se autentica exitosamente
client.on("authenticated", (session) => {
  console.log("Autenticado exitosamente");
  if (session) {
    const sessionData = JSON.stringify(session);
    fs.writeFile(SESSION_FILE_PATH, sessionData, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Datos de sesión guardados correctamente.");
      }
    });
  } else {
    console.log("No hay datos de sesión para guardar.");
  }
});

// Evento que se ejecuta cuando hay un error de autenticación
client.on("auth_failure", (msg) => {
  console.error("Error de autenticación:", msg);
});

// Evento que se ejecuta cuando el cliente se desconecta
client.on("disconnected", (reason) => {
  console.log("Cliente desconectado:", reason);
  if (fs.existsSync(SESSION_FILE_PATH)) {
    fs.unlinkSync(SESSION_FILE_PATH);
  }
  client.destroy();
  client.initialize();
});

// Función para inicializar el cliente de WhatsApp
const initialize = () => {
  client.initialize();
};

// Función para cerrar sesión
const logout = () => {
  client
    .logout()
    .then(() => {
      console.log("Sesión cerrada");
      if (fs.existsSync(SESSION_FILE_PATH)) {
        fs.unlinkSync(SESSION_FILE_PATH);
      }
    })
    .catch((err) => {
      console.error("Error al cerrar sesión:", err);
    });
};

// Función para obtener el estado del cliente
const getStatus = () => {
  return client.getState();
};

// Función para enviar un mensaje
const sendMessage = (number, message) => {
  const chatId = number.includes("@c.us") ? number : `${number}@c.us`;
  return client.sendMessage(chatId, message);
};

// Función para generar un código QR para la autenticación del cliente de WhatsApp
const generateQR = () => {
  if (client) {
    client.destroy();
    client.initialize();
  }
};

// Evento que se ejecuta cuando se recibe un mensaje
client.on("message", (message) => {
  console.log(`Mensaje de: ${message.from} - ${message.body}`);
});

// Función para obtener los últimos mensajes de un chat
const fetchLastMessages = async (chatId, limit = 20) => {
  try {
    const chat = await client.getChatById(chatId);
    const messages = await chat.fetchMessages({ limit: limit, fromMe: true });
    return messages;
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
  }
};

// Exportar las funciones y eventos necesarios
module.exports = {
  initialize,
  logout,
  getStatus,
  sendMessage,
  generateQR,
  fetchLastMessages,
};
