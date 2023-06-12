FROM node:19.7.0-bullseye-slim

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

CMD ["npm", "run", "dev"]