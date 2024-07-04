const express = require("express");
const {
  logout,
  getStatus,
  sendMessage,
  generateQR,
  fetchLastMessages,
} = require("./whatsappClient");

const router = express.Router();

// Middleware para autenticación básica
const basicAuth = (req, res, next) => {
  // Las credenciales codificadas que esperamos recibir en la cabecera de autorización
  const auth = { login: "admin", password: "admin123" };

  // parse login and password from headers
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  // Verificar credenciales
  if (login && password && login === auth.login && password === auth.password) {
    // Si las credenciales son correctas, procedemos al siguiente middleware
    return next();
  }

  // Acceso denegado. Se envía un requerimiento de autenticación.
  res.set("WWW-Authenticate", 'Basic realm="401"'); // Cambia este "401" por algo más descriptivo si lo deseas
  res.status(401).send("Authentication required."); // o puedes redirigir a una página de "Acceso Denegado"
};

// Ruta para solicitar el código QR para la autenticación
router.get("/auth/qr", (req, res) => {
  generateQR(); // Llama a la función para generar un nuevo QR
  res.send("QR solicitado, revisa la terminal del servidor");
});

// Ruta para obtener el estado actual de la sesión de WhatsApp
router.get("/auth/status", (req, res) => {
  getStatus()
    .then((state) => {
      res.send({ status: state });
    })
    .catch((err) => {
      res.status(500).send("Error al obtener el estado: " + err.toString());
    });
});

// Ruta para cerrar la sesión de WhatsApp
router.post("/auth/logout", (req, res) => {
  logout();
  res.send("Sesión cerrada correctamente");
});

// Ruta para enviar mensajes de WhatsApp
router.post("/messages/send", (req, res) => {
  const { number, message } = req.body;
  sendMessage(number, message)
    .then((response) => {
      res.send({
        status: "Mensaje enviado",
        messageId: response.id._serialized,
      });
    })
    .catch((err) => {
      res.status(500).send("Error al enviar mensaje: " + err.toString());
    });
});

router.get("/messages/last/:number", basicAuth, async (req, res) => {
  const { number } = req.params;
  const chatId = number.includes("@c.us") ? number : `${number}@c.us`;

  try {
    const messages = await fetchLastMessages(chatId);
    res.send({ messages });
  } catch (err) {
    res.status(500).send("Error al obtener los mensajes: " + err.toString());
  }
});

// Exportamos el router de express
module.exports = router;
