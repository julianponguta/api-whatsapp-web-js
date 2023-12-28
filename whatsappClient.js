const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
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

client.on("ready", () => {
  console.log("Cliente está listo!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

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

client.on("auth_failure", (msg) => {
  console.error("Error de autenticación:", msg);
});

client.on("disconnected", (reason) => {
  console.log("Cliente desconectado:", reason);
  if (fs.existsSync(SESSION_FILE_PATH)) {
    fs.unlinkSync(SESSION_FILE_PATH);
  }
  client.destroy();
  client.initialize();
});

const initialize = () => {
  client.initialize();
};

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

const getStatus = () => {
  return client.getState();
};

const sendMessage = (number, message) => {
  const chatId = number.includes("@c.us") ? number : `${number}@c.us`;
  return client.sendMessage(chatId, message);
};

//  Genera un código QR para la autenticación del cliente de WhatsApp.
const generateQR = () => {
  if (client) {
    client.destroy();
    client.initialize();
  }
};

client.on("message", (message) => {
  console.log(`Mensaje de: ${message.from} - ${message.body}`);
});

module.exports = { initialize, logout, getStatus, sendMessage, generateQR };
