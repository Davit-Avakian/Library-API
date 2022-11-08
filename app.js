const db = require('#models');
const { Authors, Publishers, Publishers_Authors } = require('#models');
const app = require('#routes');
require('dotenv').config();

// many to many relationship for publishers and authors
Publishers.belongsToMany(Authors, { through: Publishers_Authors });
Authors.belongsToMany(Publishers, { through: Publishers_Authors });

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  res.status(err.status).json({ status: 'error', message: err.message });
});

db.sequelize.sync({ logging: false, alter: true }).then(() => {
  app.listen(process.env.APP_PORT);
});
