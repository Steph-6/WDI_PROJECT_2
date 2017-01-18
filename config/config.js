module.exports = {
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/crimes',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'Don\'t tell anyone this secret.'
};
