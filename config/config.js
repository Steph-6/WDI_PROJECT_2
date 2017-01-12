module.exports = {
  db: process.env.MONGOLAB_URL || 'mongodb://localhost:27017/crimes',
  port: process.env.PORT || 3000
};
