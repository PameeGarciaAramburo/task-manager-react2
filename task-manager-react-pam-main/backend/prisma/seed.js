const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Tarea de ejemplo para pruebas",
      completed: false,
    },
  });

  console.log("✅ Seed ejecutado correctamente");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });