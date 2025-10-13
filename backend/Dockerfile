FROM node:20-alpine

WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装仅生产环境依赖
RUN npm install --omit=dev

# 复制所有源码文件
COPY . .

# 构建TypeScript代码
RUN npx tsc

# 设置环境变量
ENV NODE_ENV=production

# 暴露端口
EXPOSE 3001

# 启动生产服务
CMD ["node", "app.js"]