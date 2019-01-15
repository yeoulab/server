#FROM node:8.15.0-jessie
#RUN apt-get update && apt-get install nodejs npm -y net-tools curl git
#RUN git clone https://github.com/yeoulab/server.git
#WORKDIR /server
#RUN npm install
#WORKDIR /home/server/

#EXPOSE 4000
#CMD [ "npm", "start" ]
FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
