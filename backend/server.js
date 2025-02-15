// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors = require('cors');
const app = express();

// 连接 MongoDB（替换为你的数据库地址）
mongoose.connect('mongodb+srv://user:password@your-cluster.mongodb.net/shortener');

// 数据模型
const ShortUrl = mongoose.model('ShortUrl', new mongoose.Schema({
  shortCode: { type: String, unique: true },
  originalUrl: String,
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}));

app.use(express.json());
app.use(cors());

// 生成短链
app.post('/api/create', async (req, res) => {
  const { url, customCode } = req.body;
  const shortCode = customCode || shortid.generate();
  const data = await ShortUrl.create({ shortCode, originalUrl: url });
  res.json({ 
    shortUrl: `https://0e.pw/${shortCode}`,
    statsUrl: `https://0e.pw/stats/${shortCode}` // 统计页面地址
  });
});

// 获取统计数据
app.get('/api/stats/:code', async (req, res) => {
  const data = await ShortUrl.findOne({ shortCode: req.params.code });
  res.json(data);
});

// 跳转逻辑
app.get('/:code', async (req, res) => {
  const data = await ShortUrl.findOne({ shortCode: req.params.code });
  if (data) {
    data.clicks++;
    await data.save();
    res.redirect(data.originalUrl);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(3000, () => console.log('后端已启动！'));
