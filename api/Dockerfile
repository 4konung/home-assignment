FROM node:16.13.2

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

CMD ["yarn", "run", "start:prod"]
