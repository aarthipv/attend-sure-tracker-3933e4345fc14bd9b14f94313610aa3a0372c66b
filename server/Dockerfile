# Use official Node.js LTS image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy source code
COPY . .

# Build TypeScript (if needed)
# RUN npm run build  # Uncomment if you have a build step

# Expose the port your app runs on
EXPOSE 5001

# Set environment variables (can be overridden in Azure)
ENV NODE_ENV=production

# Start the server
CMD ["npm", "run", "dev"]
