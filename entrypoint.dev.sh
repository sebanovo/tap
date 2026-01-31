#! /bin/bash

set -e

#############################
# CONFIGURACION DEL BACKEND #
#############################

envFile=./backend/.env

if [ ! -f $envFile ]; then
  echo "Error: $envFile not found!"
  exit 1
fi

source $envFile 
echo "Archivo $envFile cargado con éxito"

cd backend


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

##############################
# CONFIGURACION DEL FRONTEND #
##############################
cd ..

# envFile=./frontend/.env

# if [ ! -f $envFile ]; then
#   echo "Error: $envFile not found!"
#   exit 1
# fi

# source $envFile 
# echo "Archivo $envFile cargado con éxito"

# cd frontend

# echo "Instalar Dependencias (Frontend)"
# npm install
