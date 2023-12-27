FROM node:latest
# Instala las dependencias necesarias para Puppeteer
RUN apt-get update \
    && apt-get install -y wget unzip fontconfig locales gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils


# Copia los archivos de la aplicación al directorio /app
WORKDIR /app
COPY . /app

# Instala las dependencias de Node (incluyendo Puppeteer)
RUN npm install
RUN npm uninstall puppeteer
RUN npm install puppeteer

# Ejecuta tu script de Node.js
CMD ["node", "index.js"]
