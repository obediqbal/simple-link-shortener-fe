FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY package-lock.json ./
RUN rm -rf node_modules
RUN npm install

# Add app
COPY . ./

# Start app
EXPOSE 3000
CMD [ "npm", "run", "docker"]