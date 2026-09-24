# React dev image. Compose starts this as the "frontend" service.
# node:22-bookworm-slim is Node 22 on a small Debian Linux image.
FROM node:22-bookworm-slim

# Every path below is relative to /app inside the image.
WORKDIR /app

# Copy the dependency files first. Docker reuses this layer when only app code changes.
COPY package.json package-lock.json ./
# Install the exact versions recorded in package-lock.json.
RUN npm ci

# Copy the rest of the frontend source into the image.
COPY . .

# The Vite dev server listens on 5173. docker-compose.yml publishes that port to the host.
EXPOSE 5173

# Bind to 0.0.0.0 so a browser on the host can reach the server inside the container.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
