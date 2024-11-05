FROM node:16-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend/. .

EXPOSE 3000  # Or your backend port

CMD ["npm", "start"] # Or your start command
