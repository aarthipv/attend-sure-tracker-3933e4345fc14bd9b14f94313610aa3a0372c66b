# Backend-Only Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy server package files
COPY server/package*.json ./

# Install production dependencies
RUN npm install --production

# Copy server source code
COPY server/ ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80

# Expose port
EXPOSE 80

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

# Start the server
CMD ["npm", "start"]