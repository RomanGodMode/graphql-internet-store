FROM node:14 AS development


WORKDIR /usr/src/app

#COPY package*.json ./
#
#RUN npm install

COPY . .
#
#RUN npm run start:dev

FROM node:14 AS production

RUN npm install

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app .

CMD [ "node", "dist/main" ]
