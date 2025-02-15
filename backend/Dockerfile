FROM node:18.19.0-slim

# Show initial state
RUN pwd && ls -la

# Set working directory
WORKDIR /app

# Show working directory
RUN echo "Working directory:" && pwd && ls -la

# Copy package files first
COPY package.json ./
COPY package-lock.json ./

# Verify package files
RUN echo "After copying package files:" && ls -la

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Verify final state
RUN echo "Final contents:" && ls -la

EXPOSE 5000

# Start with relative path
CMD ["node", "src/index.js"] 