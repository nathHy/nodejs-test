FROM node:10.4

RUN mkdir /app
WORKDIR /app

RUN npm i -g yarn

COPY package.json package.json
COPY yarn.lock  yarn.lock

RUN yarn

COPY src src

CMD ["node", "src/index.js"]