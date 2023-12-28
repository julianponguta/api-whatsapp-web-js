const express = require("express");
const {
  logout,
  getStatus,
  sendMessage,
  generateQR,
} = require("./whatsappClient");

const router = express.Router();

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

// Exportamos el router de express
module.exports = router;
