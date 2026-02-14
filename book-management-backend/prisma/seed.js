import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Hash Password
  const adminPassword = await bcrypt.hash("1234", 10);
  const userPassword = await bcrypt.hash("1234", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: adminPassword,
      role: "admin",
    },
  });

  await prisma.user.upsert({
    where: { username: "user" },
    update: {},
    create: {
      username: "user",
      password: userPassword,
      role: "user",
    },
  });

  const books = [
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      publishedYear: 2008,
      genre: "Programming",
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt, David Thomas",
      publishedYear: 1999,
      genre: "Programming",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      publishedYear: 2018,
      genre: "Self-help",
    },
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      publishedYear: 2011,
      genre: "Psychology",
    },
    {
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      publishedYear: 1997,
      genre: "Fantasy",
    },
  ];

  await prisma.book.createMany({
    data: books,
    skipDuplicates: true,
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
