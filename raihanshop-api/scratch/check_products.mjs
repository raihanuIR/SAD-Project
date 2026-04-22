import { prisma } from '../lib/prisma.js';

async function main() {
  const count = await prisma.product.count();
  console.log(`Product count: ${count}`);
  
  const products = await prisma.product.findMany({ take: 5 });
  console.log('Sample products:', JSON.stringify(products, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
