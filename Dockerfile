FROM node:14

EXPOSE 3000
RUN npm install npm@latest -g
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
WORKDIR /usr
COPY . .

CMD [ "node", "app/server.js"]