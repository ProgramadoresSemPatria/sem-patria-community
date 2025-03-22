<div align="center" style="display: flex; align-items: center; justify-content: center;">
  <h1 style="margin-right: 10px;">Borderless Coding</h1>
  <img src="public/logo.svg" width="36" height="36" alt="Logo" style="margin-top:12px" />
</div>

A platform for Borderless members to connect, collaborate, and share knowledge within the community.

## 📌 Table of Contents

- [📌 Table of Contents](#-table-of-contents)
- [🚀 Get Started](#-get-started)
  - [🖥 Installation](#-installation)
  - [Configuration](#configuration)
  - [Running](#running)
    - [Migrations](#migrations)
    - [Using Prisma Studio](#using-prisma-studio)
    - [Development Server](#development-server)

## 🚀 Get Started

To clone the repository to your local machine, follow these steps:

1. Open a terminal.
2. Navigate to your desired directory.
3. Run the following command:

```shell
git clone git@github.com:ProgramadoresSemPatria/sem-patria-community.git
```

Or, if you prefer HTTPS:

```shell
git clone https://github.com/ProgramadoresSemPatria/sem-patria-community.git
```

Then, navigate into the project directory:

```bash
cd sem-patria-community
```

### 🖥 Installation

After cloning the repository, install the project's dependencies.

**Use Node version >=20.x.**

If you have [nvm](https://github.com/nvm-sh/nvm#installing-and-updating):

```shell
nvm use
```

Install dependencies using:

> **Recommended:** pnpm

```bash
pnpm i
```

### Configuration

Copy the environment example:

```shell
cp .env.example .env
```

Set the environment variables according to your needs.

> **Important:** Do not commit secrets.

### Running

Before starting the development server, ensure your database is configured.

#### Migrations

To set up the database schema and apply any pending migrations, run:

```bash
pnpm prisma-migrate
```

This command updates your database to match the latest changes in your Prisma schema.

#### Using Prisma Studio

To visually explore and interact with your database, use [Prisma Studio](https://www.prisma.io/studio). Run:

```bash
pnpm prisma studio
```

This opens Prisma Studio in your default web browser, allowing you to view and manipulate your data.

#### Development Server

You have two options to run the server locally:

1. **With the cloud database URL:**

```bash
pnpm dev
```

2. **Without the cloud database URL** (running PostgreSQL locally with Docker):

```bash
pnpm dev:local
```

- Ensure PostgreSQL is set up correctly (via Homebrew, Apt, or Docker).
- Follow the instructions to create a Clerk account and configure authentication.

Open [http://localhost:3000](http://localhost:3000) in your favorite browser.

