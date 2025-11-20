// MongoDB初始化脚本 - 开发环境
// 此脚本会在MongoDB容器首次启动时自动执行

// 切换到smartmediahub数据库
db = db.getSiblingDB('smartmediahub');

// 创建示例集合
db.createCollection('users');
db.createCollection('content');
db.createCollection('platformAccounts');
db.createCollection('statistics');

// 创建索引以提高查询性能
db.users.createIndex({ email: 1 }, { unique: true });
db.content.createIndex({ createdAt: -1 });
db.platformAccounts.createIndex({ platformType: 1, userId: 1 });

// 插入初始管理员用户（仅用于开发环境）
db.users.insertOne({
  username: 'admin',
  email: 'admin@example.com',
  password: 'admin123', // 注意：生产环境应使用加密密码
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
});

print('MongoDB初始化完成：已创建集合和初始数据');