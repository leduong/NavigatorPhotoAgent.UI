FROM node:6

# Set environment variables
# ENV APIENDPOINT=https://agent.navigatorglass.com/api/
# ENV APIENDPOINT=http://informationcart.eastus2.cloudapp.azure.com:6500/api/

# Create and copy app directory
RUN mkdir -p /app
WORKDIR /app
COPY wwwroot ./wwwroot
COPY _package.json ./package.json
COPY server.js ./

RUN npm i

EXPOSE 8000
CMD [ "npm", "start" ]