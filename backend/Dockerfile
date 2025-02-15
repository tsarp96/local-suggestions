FROM node:18.19.0-slim

# Show initial state
RUN pwd && ls -la

# Create and set working directory
WORKDIR /usr/src/app

# Show working directory
RUN echo "Working directory:" && pwd && ls -la

# Copy package files first
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

# Verify package files
RUN echo "After copying package files:" && ls -la

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . /usr/src/app/

# Verify final state
RUN echo "Final contents:" && ls -la

EXPOSE 5000

# Start with explicit path
CMD ["node", "/usr/src/app/src/index.js"] 