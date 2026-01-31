import net from 'net';
import { Env } from '../constants/env.js';

const host = Env.POSTGRES_HOST;
const port = parseInt(Env.POSTGRES_PORT, 10);

function checkConnection() {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host, port }, () => {
      socket.end();
      resolve(true);
    });

    socket.on('error', () => {
      reject(false);
    });
  });
}

async function main() {
  try {
    await checkConnection();
    console.log('PostgreSQL listo.');
    process.exit(0);
  } catch {
    process.exit(1);
  }
}

main();
