FROM node:6

# Set environment variables
ENV APIENDPOINT=http://informationcart.eastus2.cloudapp.azure.com:6500/api/

RUN npm install -g gulp
RUN npm install -g typings
RUN npm install -g npm3


# Create app directory
RUN mkdir -p /app
WORKDIR /app


# Install app dependencies
COPY package.json /app/
RUN npm install

# Bundle app source
COPY . /app
#RUN npm run build




#EXPOSE 3000
#CMD [ "npm", "start" ]


ENTRYPOINT ["/bin/echo", "Hello"]
CMD ["world"]


