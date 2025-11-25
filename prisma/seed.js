import 'dotenv/config';
import prisma from '../src/config/db.js';
import bcrypt from 'bcrypt';

async function main() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE 
      "book_genres", "book_authors", "checkouts", "books", "authors", "genres", "users"
    RESTART IDENTITY CASCADE;
  `);

  const hashedPassword = await bcrypt.hash('securepassword', 10);

  const librarian = await prisma.user.create({
    data: {
      email: 'librarian@example.com',
      password: hashedPassword,
      fullName: 'Libby Rarian',
      role: 'librarian',
      status: 'active',
    },
  });

  const member = await prisma.user.create({
    data: {
      email: 'member@example.com',
      password: hashedPassword,
      fullName: 'Manny Member',
      role: 'member',
      status: 'active',
    },
  });

  const author1 = await prisma.author.create({
    data: {
      firstName: 'Jane',
      lastName: 'Austen',
      bio: 'English novelist known for her six major novels.',
    },
  });

  const author2 = await prisma.author.create({
    data: {
      firstName: 'Mark',
      lastName: 'Twain',
      bio: 'American writer, humorist, entrepreneur, publisher, and lecturer.',
    },
  });

  const genre1 = await prisma.genre.create({
    data: {
      name: 'Classic',
      description: 'Classic literature',
    },
  });

  const genre2 = await prisma.genre.create({
    data: {
      name: 'Fiction',
      description: 'Fictional works',
    },
  });

  const book1 = await prisma.book.create({
    data: {
      isbn: '9780141439518',
      title: 'Pride and Prejudice',
      published: new Date('1813-01-28'),
      copiesTotal: 5,
      copiesAvailable: 4,
      description: 'A romantic novel of manners written by Jane Austen.',
      bookAuthors: {
        create: [{ authorId: author1.authorId, role: 'Author' }],
      },
      bookGenres: {
        create: [{ genreId: genre1.genreId }, { genreId: genre2.genreId }],
      },
    },
  });

  const book2 = await prisma.book.create({
    data: {
      isbn: '9780486280615',
      title: 'Adventures of Huckleberry Finn',
      published: new Date('1884-12-10'),
      copiesTotal: 3,
      copiesAvailable: 2,
      description:
        'A novel by Mark Twain, first published in the United Kingdom.',
      bookAuthors: {
        create: [{ authorId: author2.authorId, role: 'Author' }],
      },
      bookGenres: {
        create: [{ genreId: genre2.genreId }],
      },
    },
  });

  await prisma.checkout.create({
    data: {
      userId: member.userId,
      bookId: book1.bookId,
      dueAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'open',
    },
  });

  await prisma.checkout.create({
    data: {
      userId: member.userId,
      bookId: book2.bookId,
      dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'open',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
