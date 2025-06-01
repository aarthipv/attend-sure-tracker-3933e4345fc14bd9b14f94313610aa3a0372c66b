
# Student Attendance Tracker

This repository contains a CI/CD pipeline setup for the Student Attendance Tracker web application with monitoring using Prometheus and Grafana.

## Components

- **Docker**: Used for containerization of the application
- **Prometheus**: For monitoring and metrics collection
- **Grafana**: For metrics visualization
- **GitHub Actions**: For CI/CD workflow

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Node.js and npm
- GitHub account for CI/CD

### Local Development

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the local development environment:
   ```
   npm run dev
   ```

4. For Docker-based development:
   ```
   make build
   make run
   ```

5. View logs:
   ```
   make logs
   ```

6. Stop the services:
   ```
   make stop
   ```

### CI/CD Pipeline

The CI/CD pipeline automatically runs when:
- Code is pushed to the main branch
- A pull request is opened against the main branch

The pipeline performs the following steps:
1. Builds the application
2. Uploads the build artifacts
3. Deploys to production (if on main branch)

### Deployment Configuration

To enable deployment, add the following secrets to your GitHub repository:
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password or token

For SSH deployment, also add:
- `SSH_PRIVATE_KEY`: Your SSH private key
- `SSH_KNOWN_HOSTS`: SSH known hosts file contents
- `SSH_USER`: SSH username
- `SSH_HOST`: SSH host address

### Monitoring

- Prometheus is available at http://localhost:9090
- Grafana is available at http://localhost:3000

Initial Grafana login:
- Username: admin
- Password: admin

## Common Commands

See the Makefile for common commands:
- `make build`: Build the application containers
- `make run`: Start all services
- `make stop`: Stop all services
- `make logs`: View service logs
- `make clean`: Remove containers and volumes
# Testing Workflow
