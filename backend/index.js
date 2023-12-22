const app = require("./app");
const db = require('./config/database');
app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`succesfully run on port ${process.env.PORT}`);
});


