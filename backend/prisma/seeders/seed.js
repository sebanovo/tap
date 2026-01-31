import DatabaseSeeder from './database-seeder.js';
import prisma from '../../src/service/prisma.client.js';

async function main() {
  await DatabaseSeeder.run();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
