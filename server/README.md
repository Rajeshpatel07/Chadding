
## Contributer Guidelines

First of all thanks for showing interest in this project.

Please checkout the installation for setting up the Project.





## Installation

1. Fork the project.

2. Clone the Fork locally.

```bash
  git clone http://githu.com/<Your github Id>/Chadding
```
3. Go to the server and install the dependencies with this command.

```bash
yarn
```
4. For the `environment variables` checkout `.env.sample` file.

5. Setup the prisma by running these commands.

```bash
yarn prsima generate
yarn prisma migrate dev --name init --create-only
yarn prisma migrate deploy
```

6. Run the development server with this command.

```bash
yarn dev
```

The development server will run on port `5000`.
