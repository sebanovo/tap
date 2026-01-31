import bcrypt from 'bcrypt';
import prisma from '../../src/service/prisma.client.js';

export default class UserSeeder {
  static async run() {
    const users = [
      {
        email: 'messi@gmail.com',
        name: 'messi',
        password: await bcrypt.hash('password', 10),
      },
      {
        email: 'nicolas@gmail.com',
        name: 'nicolas',
        password: await bcrypt.hash('password', 10),
      },
      {
        email: 'cristiano@gmail.com',
        name: 'cristiano',
        password: await bcrypt.hash('password', 10),
      },
    ];

    for (const user of users) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      });
    }

    console.log('✅ UserSeeder ejecutado');
  }
}
