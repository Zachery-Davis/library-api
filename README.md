# FinalProject

A Node.js backend project using Express, PostgreSQL, and Prisma ORM for managing a library

## Setup

### Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Initialize Prisma:

   ```bash
   npx prisma init
   ```

3. Configure your PostgreSQL connection in `.env`.

4. Deploy migrations:

   ```bash
   npm run migrate:deploy
   ```

5. Start the server:
   ```bash
   npm run start
   ```

### Hosted API

You can also use the hosted API at:  
**https://library-api-mz6y.onrender.com**

- No local setup required.
- Use this URL as the base for your API requests.

## Scripts

- `npm run dev` - Start the server in development mode with file watching and .env support
- `npm start` - Start the Express server
- `npm run migrate:dev` - Run Prisma migrations in development mode
- `npm run migrate:deploy` - Deploy Prisma migrations to the database
- `npm run openapi` - Bundle the OpenAPI YAML file using Redocly CLI

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Prisma ORM
