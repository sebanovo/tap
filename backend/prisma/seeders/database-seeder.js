import UserSeeder from './user-seeder.js';

export default class DatabaseSeeder {
  static async run() {
    const databaseSeeder = [UserSeeder];

    for (const seeder of databaseSeeder) {
      seeder.run();
    }
    console.log('🚀 Todos los seeders ejecutados');
  }
}
