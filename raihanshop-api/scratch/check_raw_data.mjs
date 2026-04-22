import { prisma } from '../lib/prisma.js';

async function main() {
  // Use raw query to bypass Prisma's relation checks if they are causing issues
  const products = await prisma.$queryRaw`SELECT * FROM Product LIMIT 10`;
  console.log('Raw products:', JSON.stringify(products, null, 2));
  
  const categories = await prisma.$queryRaw`SELECT * FROM Category`;
  console.log('Raw categories:', JSON.stringify(categories, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
