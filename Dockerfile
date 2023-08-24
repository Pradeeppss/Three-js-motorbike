# Use an official lightweight Node.js image
FROM node:14-alpine
# Set the working directory to /app
WORKDIR /app
# Copy the package.json and package-lock.json files to the container
COPY . /app/
RUN npm install -g rollup servez concurrently
EXPOSE 8080
# Start the web server and serve the HTML page
CMD ["npm", "run", "dev"]
