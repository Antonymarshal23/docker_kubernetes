# Use the latest Node.js image
FROM node:18-alpine
# if app is exist make it as work dir or create one for the app
WORKDIR /app
# add everything from this CWD to app in docker
ADD package*.json .
# Install the dependencies listed in package.json
RUN npm i
ADD . .
# Start the application using `npm start`
CMD ["npm", "start"]