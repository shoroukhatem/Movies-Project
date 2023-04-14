const express = require("express")
const app = express();
const marketRouter = require('./thecinmema')


app.use("/cinema/movies", marketRouter);
app.listen(5000, () => {
  console.log("server running")
});