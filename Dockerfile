FROM registry.uwm-nm-te-capstone.com:8083/node-docker:latest

COPY . /app

# Create app directory
WORKDIR /app

RUN npm install && npm run build

CMD ["npm", "start"]