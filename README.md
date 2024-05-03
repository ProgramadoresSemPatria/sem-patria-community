# Comunidade Sem Pátria 💻

## 📌 Table of Contents

- [Comunidade Sem Pátria 💻](#comunidade-sem-pátria-)
  - [📌 Table of Contents](#-table-of-contents)
  - [🚀 Get Started](#-get-started)
    - [🖥 Installation](#-installation)
    - [Configuration](#configuration)
      - [🪪 Credentials](#-credentials)
    - [Running](#running)

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
    cp .env.example .env.local
```

Set env values according to your credentials.

#### 🪪 Credentials

1. Generate a personal key in your GitHub
  1.1 Click in your user -> Settings -> Developer Settings -> Personal access tokens -> Generate a classic token
2. Change the value of variable `GITHUB_TOKEN` with the created token
3. Change the value of variable `USERS_WHITELIST` to your github username

>**⚠️ DO NOT COMMIT YOUR PERSONAL TOKEN**

### Running

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your favorite browser.
