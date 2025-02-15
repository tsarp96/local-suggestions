FROM node:18.19.0-slim

# Set working directory
WORKDIR /app

# Debug: Show current directory
RUN pwd && ls -la

# First copy only package files
COPY ["package.json", "./"]
COPY ["package-lock.json", "./"]

# Debug: Show files after package copy
RUN pwd && ls -la

# Install dependencies
RUN npm install --production --verbose

# Copy the rest of the application
COPY . .

# Debug: Show all files
RUN pwd && ls -la

EXPOSE 5000

CMD ["node", "src/index.js"] 