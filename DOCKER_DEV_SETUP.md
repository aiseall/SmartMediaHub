# SmartMediaHub Docker 环境配置指南

本指南将帮助您使用Docker Compose管理SmartMediaHub的开发和生产环境，包括前端、后端和MongoDB数据库。

## 前提条件

请确保您的系统已安装以下软件：
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 环境说明

项目提供了两种Docker环境配置：
1. **开发环境**：适用于开发调试，支持代码热重载，使用开发专用配置
2. **生产环境**：适用于部署，优化性能和安全性，使用生产专用配置

## 开发环境

### 开发环境文件
- **docker-compose.yml**: 开发环境主配置文件
- **frontend/Dockerfile.dev**: 前端开发环境构建文件
- **backend/Dockerfile.dev**: 后端开发环境构建文件

### 开发环境特性
- 支持代码热重载（修改代码后自动刷新）
- 挂载本地文件到容器，确保本地更改立即反映
- 使用开发模式启动服务
- 暴露所有开发端口以便调试

### 启动开发环境

在项目根目录下执行以下命令：

```bash
# 使用开发环境配置启动
# Windows/Linux/Mac通用命令
docker-compose -f docker-compose.yml up

# 或者在后台启动（推荐）
docker-compose -f docker-compose.yml up -d
```

### 首次启动说明

首次启动时，Docker会自动：
1. 拉取必要的Docker镜像
2. 为前端和后端构建Docker开发镜像
3. 安装所有开发依赖包
4. 启动所有服务

这可能需要一些时间，请耐心等待。

### 访问开发环境应用

服务启动后，您可以通过以下地址访问应用：
- 前端应用：[http://localhost:5173](http://localhost:5173)
- 后端API：[http://localhost:3001](http://localhost:3001)
- MongoDB：通过端口27017连接

### 开发环境日志查看

```bash
# 查看所有服务的日志
docker-compose -f docker-compose.yml logs

# 查看特定服务的日志（例如前端）
docker-compose -f docker-compose.yml logs frontend

# 实时查看日志
docker-compose -f docker-compose.yml logs -f
```

### 停止开发环境

```bash
docker-compose -f docker-compose.yml down
```

## 生产环境

### 生产环境文件
- **docker-compose.prod.yml**: 生产环境主配置文件
- **frontend/Dockerfile**: 前端生产环境构建文件
- **backend/Dockerfile**: 后端生产环境构建文件
- **frontend/nginx.conf**: 前端Nginx配置文件（用于生产环境）

### 生产环境特性
- 优化的构建过程，减小镜像体积
- 使用Nginx提供前端静态文件服务
- API代理配置，确保前后端通信
- MongoDB添加认证安全配置
- 自动重启策略，提高服务可靠性
- 移除开发依赖，提高安全性

### 启动生产环境

在项目根目录下执行以下命令：

```bash
# 使用生产环境配置启动
# Windows/Linux/Mac通用命令
docker-compose -f docker-compose.prod.yml up

# 或者在后台启动（推荐）
docker-compose -f docker-compose.prod.yml up -d
```

### 访问生产环境应用

服务启动后，您可以通过以下地址访问应用：
- 前端应用：[http://localhost](http://localhost)（端口80）
- 后端API：[http://localhost:3001](http://localhost:3001)（或通过前端代理访问）
- MongoDB：需要通过认证连接

### 生产环境日志查看

```bash
# 查看所有服务的日志
docker-compose -f docker-compose.prod.yml logs

# 查看特定服务的日志（例如前端）
docker-compose -f docker-compose.prod.yml logs frontend

# 实时查看日志
docker-compose -f docker-compose.prod.yml logs -f
```

### 停止生产环境

```bash
docker-compose -f docker-compose.prod.yml down
```

## 通用操作

### 重建镜像

当Dockerfile或依赖发生变化时，需要重建镜像：

```bash
# 开发环境重建镜像
docker-compose -f docker-compose.yml build

# 生产环境重建镜像
docker-compose -f docker-compose.prod.yml build
```

### 查看容器状态

```bash
# 开发环境容器状态
docker-compose -f docker-compose.yml ps

# 生产环境容器状态
docker-compose -f docker-compose.prod.yml ps
```

## 重要配置说明

### 环境变量

**开发环境关键环境变量**：
- `VITE_BACKEND_URL`: 前端访问后端的URL
- `MONGO_URI`: MongoDB连接字符串
- `JWT_SECRET`: JWT密钥

**生产环境关键环境变量**：
- `MONGO_INITDB_ROOT_USERNAME`: MongoDB管理员用户名
- `MONGO_INITDB_ROOT_PASSWORD`: MongoDB管理员密码
- `MONGO_URI`: MongoDB连接字符串（包含认证信息）
- `JWT_SECRET`: JWT密钥（生产环境应使用强密钥）

### 数据持久化

两个环境使用不同的数据卷来存储MongoDB数据：
- 开发环境：`mongo-data`
- 生产环境：`mongo-data-prod`

## 安全注意事项

1. 生产环境中，请修改默认的MongoDB密码和JWT密钥
2. 生产环境不应将MongoDB端口暴露到公网
3. 确保使用最新的Docker镜像以获取安全更新

## 故障排除

1. **端口冲突**：如果端口被占用，请修改docker-compose文件中的端口映射
2. **数据库连接问题**：检查MONGO_URI环境变量和MongoDB容器日志
3. **依赖安装失败**：尝试删除node_modules和重建镜像
4. **权限问题**：确保文件权限正确，特别是在Linux/Mac系统上

## 部署建议

1. 在正式部署前，确保修改所有默认密码和密钥
2. 考虑使用Docker Swarm或Kubernetes进行更复杂的部署
3. 为生产环境配置HTTPS（可以使用Nginx或Traefik等反向代理）
4. 定期备份MongoDB数据卷