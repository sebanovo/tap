### 1 Instala las dependencies

```shell
npm install
```

### 2. Create and seed the database

```shell
npx prisma init --db
```

```bash
cp .env.sample .env
```

```bash
# .env
DATABASE_URL=postgresql://user:password@host:port/database
```

```shell
npx prisma db seed
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Utils Commands

```shell
# Instalar prisma
npm install prisma --save-dev

# Ver comandos de prisma
npx prisma

# Inicializar prisma
npx prisma init

# Migrar las tablas
npx prisma migrate dev --name init

# Necesario para conectar la database con el codigo TS
npm install @prisma/client

# Para Generar los modelos con tipos
npx prisma generate

# Para resetear la base de datos
npx prisma migrate reset
```

### 3. Start the REST API server

```shell
npm run dev
```
