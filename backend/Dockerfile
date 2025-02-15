FROM node:18

# Create and set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package files
COPY package.json .
COPY package-lock.json .

# Show contents for debugging
RUN ls -la

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Show final contents for debugging
RUN ls -la

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "start"] 