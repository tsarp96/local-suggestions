FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the entire application
COPY . .

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "start"] 