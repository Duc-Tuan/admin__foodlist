FROM node:16-alpine AS development
WORKDIR /app
COPY . .
RUN npm cache clean --force
# RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
# Install app dependencies
# COPY package.json /src
RUN npm install

CMD ["npm", "start"]