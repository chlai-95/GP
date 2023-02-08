FROM node:14.21.2-alpine as builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm install --global serve

EXPOSE 3000