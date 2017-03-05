FROM node:6

# Set environment variables
ENV APIENDPOINT=http://informationcart.eastus2.cloudapp.azure.com:6500/api/

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app/
RUN npm install
RUN npm run build


# Bundle app source
COPY . /app

EXPOSE 3000
CMD [ "npm", "start" ]