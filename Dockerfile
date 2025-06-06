FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 6000 7000 9000

CMD ["npm", "run", "servers"]