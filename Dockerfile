FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 8000 7000 9000

CMD ["npm", "run", "production"]