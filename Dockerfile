FROM node:14

WORKDIR /opt/inu-events-server

COPY . .

RUN npm ci

EXPOSE 8080

CMD ["npm", "start"]
