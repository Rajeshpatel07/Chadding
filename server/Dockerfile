
FROM node:21.5.0-slim

RUN apt-get update -y && apt-get install -y openssl curl

WORKDIR /home/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn 

COPY . .

RUN yarn build

COPY .env ./dist
COPY ./src/prisma ./dist
COPY ./mysql-config ./dist

# Download wait-for-it.sh
RUN curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x wait-for-it.sh

# Copy prisma-init.sh script
COPY prisma-init.sh ./dist

WORKDIR ./dist

RUN yarn prisma generate

EXPOSE 5000

# Start the application using prisma-init.sh
CMD ["./prisma-init.sh", "node", "index.js"]

