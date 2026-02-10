FROM node:20-slim

# Instalar dependencias necesarias
RUN apt-get update

# Copiar proyecto
COPY ./backend /app

WORKDIR /app

# Dar permisos
RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]
