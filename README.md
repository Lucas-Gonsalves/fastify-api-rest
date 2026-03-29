# Fastify REST API

A simple REST API built with Fastify and TypeScript to manage financial transactions. The project uses cookies to keep each user's transactions isolated by session, validates input with Zod, and persists data with Knex.

## Features

- Create credit and debit transactions
- Store transactions by session cookie
- List all transactions from the current session
- Fetch a specific transaction by ID
- Get a transaction summary for the current session
- Run database migrations with Knex
- Test the API with Vitest and Supertest

## Tech Stack

- Node.js 18
- TypeScript
- Fastify
- Knex
- SQLite by default
- PostgreSQL support through environment configuration
- Zod
- Vitest
- Supertest

## How It Works

When a transaction is created, the API checks for a `sessionId` cookie:

- If the cookie does not exist, the server creates one and sends it back to the client.
- Protected routes use that cookie to return only the transactions that belong to the current session.

This means the following routes require a valid `sessionId` cookie:

- `GET /transactions`
- `GET /transactions/:id`
- `GET /transactions/summary`

If the cookie is missing, the API responds with `401 Unauthorized`.

## API Endpoints

### `POST /transactions`

Creates a new transaction.

Request body:

```json
{
  "title": "Freelance payment",
  "amount": 5000,
  "type": "credit"
}
```

Notes:

- `type` must be either `credit` or `debit`
- Debit transactions are stored as negative amounts
- The route returns `201 Created`
- A `sessionId` cookie is created automatically on the first request

### `GET /transactions`

Returns all transactions from the current session.

### `GET /transactions/:id`

Returns a single transaction from the current session.

### `GET /transactions/summary`

Returns the sum of all transaction amounts from the current session.

Example response:

```json
{
  "summary": {
    "amount": 3000
  }
}
```

## Requirements

- Node.js 18
- npm

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
DATABASE_CLIENT=sqlite
DATABASE_URL=./db/app.db
PORT=3333
```

For tests, create a `.env.test` file based on `.env.test.example`:

```env
DATABASE_CLIENT=sqlite
DATABASE_URL=./db/test.db
PORT=3334
```

If you want to use PostgreSQL instead of SQLite, change:

```env
DATABASE_CLIENT=pg
DATABASE_URL=postgres://user:password@localhost:5432/database_name
```

### 3. Run database migrations

```bash
npm run knex migrate:latest
```

### 4. Start the development server

```bash
npm run dev
```

By default, the app runs on `http://localhost:3333`.

## Available Scripts

- `npm run dev` starts the development server with file watching
- `npm run build` builds the project into the `build/` directory
- `npm run knex migrate:latest` runs pending migrations
- `npm run knex migrate:rollback` rolls back the latest migration batch
- `npm run lint:fix` fixes lint issues
- `npm test` runs Vitest in watch mode

If you want to run tests only once, use:

```bash
npx vitest run
```

## Example Usage

Create a transaction and save the session cookie:

```bash
curl -i -c cookies.txt -X POST http://localhost:3333/transactions \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Salary\",\"amount\":5000,\"type\":\"credit\"}"
```

List transactions for the same session:

```bash
curl -b cookies.txt http://localhost:3333/transactions
```

Get the summary:

```bash
curl -b cookies.txt http://localhost:3333/transactions/summary
```

## Testing

The integration tests cover:

- transaction creation
- session cookie creation
- transaction listing
- fetching a transaction by ID
- summary calculation

Before each test, the suite rolls back all migrations and applies them again to keep the database state clean.

## Project Structure

```text
.
|-- db/
|   `-- migrations/
|-- src/
|   |-- env/
|   |-- middlewares/
|   |-- routes/
|   |-- app.ts
|   |-- database.ts
|   `-- server.ts
`-- test/
    `-- routes/
```

## License

This project is licensed under the ISC License.
