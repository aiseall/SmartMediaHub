FROM node:20-alpine as build

WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有源码文件
COPY . .

# 构建生产版本
RUN npm run build

# 使用Nginx提供静态文件服务
FROM nginx:alpine

# 复制构建产物到Nginx的静态文件目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义Nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]