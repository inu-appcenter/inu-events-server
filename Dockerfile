FROM node:14

WORKDIR /opt/inu-events-server

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul

COPY . .

RUN npm ci

EXPOSE 8080

CMD ["npm", "start"]
