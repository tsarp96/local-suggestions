FROM node:18

# Set working directory
WORKDIR /app

# Debug: Print working directory
RUN pwd && ls -la

# Copy package files first
COPY package*.json ./

# Debug: Show copied files
RUN ls -la

# Install dependencies with production flags
RUN npm install --production --no-optional --prefer-offline

# Copy the rest of the application
COPY . .

# Debug: Show all files
RUN ls -la

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "start"] 