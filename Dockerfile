FROM node:20.8.0

WORKDIR /workspace

COPY package*.json .
RUN npm install
