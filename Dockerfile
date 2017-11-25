FROM node:8

# Set environment variables
ENV APIENDPOINT=https://agent.navigatorglass.com/api/
ENV AUTHORITY=https://auth.informationcart.com

# Create and copy app directory
RUN mkdir -p /app
WORKDIR /app
COPY wwwroot ./wwwroot
COPY _package.json ./package.json
COPY server.js ./

RUN npm i

EXPOSE 8000
CMD [ "npm", "start" ]
