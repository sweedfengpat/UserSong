
FROM node:16
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run typeorm migration:run && npm run start:dev"]