FROM node:14

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY ./ ./

RUN npm install
RUN npm run build

EXPOSE 3002
CMD ["npm", "start"]