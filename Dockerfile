# Node server
FROM node:16 as node-server
WORKDIR /backend/app
COPY . /backend/server
COPY . /frontend/app
COPY package*.json ./
RUN rm -f package-lock.json \
    ;rm -rf node_modules \
    ;npm install --production --silent && mv node_modules ../
COPY . .

# Final image
# CMD ["node", "server.js"]
CMD ["npm", "prod"]
