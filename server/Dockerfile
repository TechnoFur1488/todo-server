FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm", "start"]