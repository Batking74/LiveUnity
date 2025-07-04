FROM node:18.20-alpine
WORKDIR /app
COPY . .
EXPOSE 1000
CMD ["npm", "start"]