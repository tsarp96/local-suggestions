FROM node:18.19.0-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy entire context
COPY . /usr/src/app/

# Show contents for debugging
RUN ls -la

# Install dependencies
RUN cd /usr/src/app && npm install --production

# Show final contents
RUN ls -la

EXPOSE 5000

CMD ["node", "src/index.js"] 