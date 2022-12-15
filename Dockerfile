FROM node

WORKDIR /app

ARG node_env=production

COPY package*.json ./

RUN npm install

COPY /src ./src

CMD ["npm", "run", "start"]