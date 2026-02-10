FROM node:20-slim

# Copiar proyecto
COPY ./frontend /app

WORKDIR /app

# Instalar dependencias
RUN npm install

# Comando para iniciar el servidor de desarrollo de Vite con hot reload
CMD ["npm", "run", "dev"]