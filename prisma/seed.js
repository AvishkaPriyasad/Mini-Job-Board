// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash: 'hashed_password_here' // In real use, hash with bcrypt
    }
  });

  await prisma.job.createMany({
    data: [
      {
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'Remote',
        jobType: 'Full-time',
        description: 'React experience required',
        published: true,
        userId: user.id
      },
      {
        title: 'Backend Engineer',
        company: 'Data Systems',
        location: 'Hybrid',
        jobType: 'Full-time',
        description: 'Node.js and database skills',
        published: true,
        userId: user.id
      }
    ]
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });