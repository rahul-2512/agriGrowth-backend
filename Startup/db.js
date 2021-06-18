const config = require("../config");
const mongoose = require("mongoose");

module.exports = function () {
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true
  };
  mongoose.connect(config.DBURL, options, (err) => {
    if (err) {
      console.log("Connection to Database Failed");
      process.exit();
    }
    console.log("************   DB connected successfully  **************");
  });
};
