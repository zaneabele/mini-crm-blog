
# Deployment Instructions – Day 5.3

## 1. Local Deployment with Docker

### 1.1. Docker Image Creation
```bash
docker build -t mini-crm-blog .
```

### 1.2. Running the Container
```bash
docker run -p 8000:8000 mini-crm-blog
```

## 2. Production Deployment

### 2.1. Prerequisites
- Docker installed and running
- Environment variables configured
- Database credentials set up

### 2.2. Build and Push
```bash
docker build -t mini-crm-blog:latest .
docker push your-registry/mini-crm-blog:latest
```

### 2.3. Deploy to Server
```bash
docker pull your-registry/mini-crm-blog:latest
docker run -d -p 8000:8000 --name mini-crm-blog your-registry/mini-crm-blog:latest
```

## 3. Verification
- Check container status: `docker ps`
- View logs: `docker logs mini-crm-blog`
- Test endpoint: `http://localhost:8000`
