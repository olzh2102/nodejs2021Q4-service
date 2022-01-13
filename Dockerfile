FROM node:16.13-alpine

RUN mkdir -p /app/ 
WORKDIR /app/
COPY package*.json /app/

RUN npm install
COPY . /app/

EXPOSE ${PORT}

CMD ["npm", "start"]