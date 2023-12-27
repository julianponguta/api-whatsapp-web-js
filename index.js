const express = require("express");
const whatsappClient = require("./whatsappClient");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware para parsear JSON
whatsappClient.initialize(); // Inicializa el cliente de WhatsApp

app.use("/", routes); // Usar las rutas definidas en routes.js

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
