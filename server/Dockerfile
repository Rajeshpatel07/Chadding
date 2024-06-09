FROM node:lts-alpine

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn && yarn run build

COPY . .

RUN npx prisma generate

CMD ["node", "./dist/index.js"]
