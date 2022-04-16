FROM node:14 AS development

WORKDIR /usr/src/app
COPY . .

FROM node:14 AS production

WORKDIR /usr/src/app
COPY --from=development /usr/src/app .
RUN npm install

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD npm run start
