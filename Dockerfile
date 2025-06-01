# Build stage for the client
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Build stage for the server
FROM node:20-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy server files
COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=server-builder /app/server/package*.json ./server/
COPY --from=server-builder /app/server/node_modules ./server/node_modules

# Copy client files
COPY --from=client-builder /app/client/dist ./client/dist

# Set working directory to server
WORKDIR /app/server

# Expose the port your app runs on
EXPOSE 5001

# Start the server
CMD ["node", "dist/index.js"] 