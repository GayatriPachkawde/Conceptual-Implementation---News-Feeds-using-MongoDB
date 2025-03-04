const express = require("express");
const app = express();
const port = 8080;
const { newsArticleModel } = require("./connector");
const onePageArticleCount = 10;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const verify = (result) => {
  if (Number(result) && result > 0) {
    return true;
  }
  return false;
};

app.get("/newFeeds", async (req, res) => {
  const limit = verify(req.query.limit) ? Number(req.query.limit) : 10;
  const offset = verify(req.query.offset) ? Number(req.query.offset) : 0;
  const data = await newsArticleModel.find({}).skip(offset).limit(limit);

  res.status(200).send(data);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
