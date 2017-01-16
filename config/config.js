module.exports = {
  db: process.env.MONGOLAB_URL || 'mongodb://localhost:27017/crimes',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'Don\'t tell anyone this secret.'
};
