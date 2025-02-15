FROM node:18

# Set working directory
WORKDIR /app

# Copy the entire backend directory
COPY . /app/

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "start"] 