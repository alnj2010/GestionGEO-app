FROM node:8
WORKDIR /usr/src/app
RUN npm i npm@latest express -g
COPY . .
RUN npm install 
EXPOSE 3000
CMD npm run build && npm run start-prod