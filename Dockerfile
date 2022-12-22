FROM node:16.18-alpine

WORKDIR /repo

COPY package*.json ./

RUN npm install
RUN npm audit fix
