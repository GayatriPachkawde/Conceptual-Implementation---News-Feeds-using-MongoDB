const express = require("express");
const app = express();
const port = 8080;
const { newsArticleModel } = require("./connector");
const onePageArticleCount = 10;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", async (req, res) => {
  const limit = Number(req.params.limit || 10);
  const offset = Number(req.params.offset || 0);
  const data = await newsArticleModel.find({}).skip(offset).limit(limit);

  res.send(data);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
