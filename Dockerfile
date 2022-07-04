# syntax=docker/dockerfile:1
FROM node:16-alpine

WORKDIR /app
COPY . .

RUN npm install --silent
RUN npm -v

EXPOSE 3000

CMD ["npm", "start"]