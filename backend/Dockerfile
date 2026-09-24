# Express API image. Compose starts this as the "backend" service.
# node:22-bookworm-slim is Node 22 on a small Debian Linux image.
FROM node:22-bookworm-slim

# Every path below is relative to /app inside the image.
WORKDIR /app

# Copy the dependency files first. Docker reuses this layer when only app code changes.
COPY package.json package-lock.json ./
# Install the exact versions recorded in package-lock.json.
RUN npm ci

# Copy the rest of the backend source into the image.
COPY . .

# The API listens on 5000. docker-compose.yml publishes that port to the host.
EXPOSE 5000

# Default start command. Compose overrides this with nodemon so code changes restart the API.
CMD ["npm", "start"]
