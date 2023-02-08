FROM node:14.21.2-alpine as builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm install --global serve

RUN npm run-script build

EXPOSE 3000

ENTRYPOINT serve build