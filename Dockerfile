FROM node:argon

COPY . /app
WORKDIR /app
RUN npm install

CMD npm run start
