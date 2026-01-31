#! /bin/bash

set -e

#############################
# CONFIGURACION DEL BACKEND #
#############################

envFile=./.env

if [ ! -f $envFile ]; then
  echo "Error: $envFile not found!"
  exit 1
fi

source $envFile 
echo "Archivo $envFile cargado con éxito"

echo "Instalar Dependencias...(backend)"
npm install 

echo "Esperando a PostgreSQL en $POSTGRES_HOST:$POSTGRES_PORT..."
until node ./src/scripts/test-connection-db.js; do
  echo "DB no disponible, reintentando..."
  sleep 1
done
echo "PostgreSQL listo."

echo "Inicializar los modelos"
npx prisma generate

echo "Ejecutar las migraciones en la DB"
npx prisma migrate dev --name init

echo "Ejecutar los seeders"
node prisma/seeders/seed.js

echo "Iniciando el servidor"
npm run start
