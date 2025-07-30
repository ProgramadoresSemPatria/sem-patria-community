# Borderless Coding

<div align="center">
  <img src="public/logo.svg" width="100" height="100" alt="Borderless Coding Logo" />
</div>

A collaborative platform for the Borderless community to connect, share knowledge, and collaborate on coding projects. Features include user profiles, content sharing, leaderboards, and an educational system with classrooms and modules.

## Technical Stack

### Core Technologies

- [Next.js](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Prisma](https://www.prisma.io/) - Type-safe ORM with migrations
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Accessible component system

### Notable Implementations

- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) for data operations
- [CASL](https://casl.js.org/) for permissions management
- [TipTap](https://tiptap.dev/) for rich text editing
- [Discord Webhooks](https://discord.com/developers/docs/resources/webhook) for notifications
- [Inter Font](https://fonts.google.com/specimen/Inter) for typography

## Project Structure

```
sem-patria-community/
├── actions/             # Server actions for data operations
├── app/                 # Next.js app router structure
│   ├── (auth)/          # Authentication routes
│   ├── (private)/       # Protected routes
│   ├── (root)/          # Public routes
│   └── api/             # API endpoints
├── assets/              # Static assets and fonts
├── components/          # Reusable UI components
│   ├── editor/          # Rich text editor components
│   ├── leaderboard/     # Leaderboard components
│   ├── modals/          # Modal dialog components
│   └── ui/              # Base UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
├── prisma/              # Database schema and migrations
├── providers/           # React context providers
└── services/            # External service integrations
```

- **[actions/](./actions/)** - Server-side logic using [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- **[prisma/migrations/](./prisma/migrations/)** - Database schema evolution history with 40+ migrations
- **[components/editor/](./components/editor/)** - Custom rich text editor implementation with [TipTap](https://tiptap.dev/)
- **[hooks/](./hooks/)** - Domain-specific custom React hooks organized by feature

## Installation

```bash
git clone https://github.com/ProgramadoresSemPatria/sem-patria-community.git

cd sem-patria-community
```

Once you have cloned the repository, you need to install the project's dependencies.

**Use the recommended node version which is >=20.x**

If you have [nvm](https://github.com/nvm-sh/nvm#installing-and-updating):

```bash
    nvm use
```

Install dependencies (Node >=20.x recommended)

`pnpm i`

### Configure environment

`cp .env.example .env`

> [!NOTE]
> If you have any doubts about the values, please contact any of the builders on Discord. Look for the `Builder` role badge.

### Running

Before start development server, you need to ensure that database is configured.

#### Migrations

To set up the database schema and apply any pending migrations, execute the following command:

```bash
pnpm prisma-migrate
```

This command will ensure that your database is up to date with the latest changes defined in your Prisma schema.

#### Using Prisma Studio

To visually explore and interact with your database, you can use [Prisma Studio](https://www.prisma.io/studio). Run the following command:

```bash
pnpm prisma studio
```

This will open Prisma Studio in your default web browser, allowing you to view and manipulate your data directly.

#### Development server

- **Ensures users set up PostgreSQL correctly** (via Homebrew, Apt, or Docker).
- **Guides users through creating a Clerk account** and configuring authentication.

> With the cloud database url

```bash
pnpm dev
```

> Without the cloud database url (running PostgreSQL locally with docker)

```bash
pnpm dev:local
```

Open [http://localhost:3000](http://localhost:3000) with your favorite browser.
