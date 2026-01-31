import { PrismaClient } from '../generated/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Env } from '../constants/env.js';

const pool = new PrismaPg({ connectionString: Env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: pool });
export default prisma;
