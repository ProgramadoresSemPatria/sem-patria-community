<h1 align="center">Borderless Coding
<img src="src/assets/logo.svg" width="36" height="36" alt="Logo" /></h1>

A platform for Borderless members to connect, collaborate, and share knowledge within the community.

## 📌 Table of Contents

- [📌 Table of Contents](#-table-of-contents)
- [🚀 Get Started](#-get-started)
  - [🖥 Installation](#-installation)
  - [Configuration](#configuration)
    - [🪪 Credentials](#-credentials)
  - [Running](#running)
    - [Migrations](#migrations)
    - [Using Prisma Studio](#using-prisma-studio)
    - [Development server](#development-server)

## 🚀 Get Started

To clone the repository to your local machine, follow these steps:
1. Open a terminal
2. Navigate to the directory where you want to clone the repository
3. Execute the following command:

```shell
    git clone git@github.com:ProgramadoresSemPatria/sem-patria-community.git
```

or if you use HTTPS:
```shell
    git clone https://github.com/ProgramadoresSemPatria/sem-patria-community.git
```

```bash
    cd sem-patria-community
```

### 🖥 Installation

Once you have cloned the repository, you need to install the project's dependencies.

**Use the recommended node version which is >=18.x**

If you have [nvm](https://github.com/nvm-sh/nvm#installing-and-updating):

```shell
    nvm use
```

Install dependencies:

>pnpm recommended

```bash
pnpm i
```

### Configuration

Copy env example:

```shell
    cp .env.example .env
```

Set env values according to your credentials.

#### 🪪 Credentials

1. Generate a personal key in your GitHub
  1.1 Click in your user -> Settings -> Developer Settings -> Personal access tokens -> Generate a classic token
2. Change the value of variable `GITHUB_TOKEN` with the created token
3. Change the value of variable `USERS_WHITELIST` to your github username

>**⚠️ DO NOT COMMIT YOUR PERSONAL TOKEN**

### Running

Before start development server, you need to ensure that database is configured.

#### Migrations

To set up the database schema and apply any pending migrations, execute the following command:

```bash
pnpm migrate dev
```

This command will ensure that your database is up to date with the latest changes defined in your Prisma schema.

#### Using Prisma Studio

To visually explore and interact with your database, you can use [Prisma Studio](https://www.prisma.io/studio). Run the following command:

```bash
pnpm prisma studio
```

This will open Prisma Studio in your default web browser, allowing you to view and manipulate your data directly.

#### Development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your favorite browser.
