FROM node:20-slim

# Instalar dependencias necesarias
RUN apt-get update

# Copiar proyecto
COPY ./backend /app

WORKDIR /app

# Exponer el puerto en el que React/Vite corre (por defecto 5173)
EXPOSE 3000 

# Dar permisos
RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]
