FROM node:8

# Create and copy app directory
RUN mkdir -p /app
WORKDIR /app
COPY wwwroot ./wwwroot
COPY _package.json ./package.json
COPY server.js ./

RUN npm i

EXPOSE 8000
CMD [ "npm", "start" ]
