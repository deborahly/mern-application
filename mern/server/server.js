require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;
// get driver connection
const dbo = require('./db/conn');
// get app
const app = require('./app');

app.listen(port, function () {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
