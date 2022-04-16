FROM node:14 AS development


WORKDIR /usr/src/app

COPY . .

FROM node:14 AS production

RUN npm install

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app .

CMD npm run start
