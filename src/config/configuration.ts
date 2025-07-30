export default () => ({
  port: parseInt(process.env.PORT || '3000', 10) || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/url_shortener',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
});
