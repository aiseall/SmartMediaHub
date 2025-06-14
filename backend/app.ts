import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import platformAccountRoutes from './routes/platformAccountRoutes';
import contentRoutes from './routes/contentRoutes';
import scheduledPublishRoutes from './routes/scheduledPublishRoutes';
import statisticsRoutes from './routes/statisticsRoutes';
import analyticsRoutes from './routes/analyticsRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/platform-accounts', platformAccountRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/scheduled-publish', scheduledPublishRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
  res.send('欢迎使用智媒通（SmartMediaHub）API！');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SmartMediaHub 后端服务已启动，端口：${PORT}`);
}); 