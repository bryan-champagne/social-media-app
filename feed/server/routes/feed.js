const express = require("express");
const axios = require("axios");
const router = express.Router();

// This section will get a list of all the post ids.
router.route("/feed").get(async function (req, res) {
  const response = await axios.get("http://localhost:8083/posts/post");
  const posts = response.data;
  var ids = [];
  for (i = 0; i < posts.length; i++) {
    ids[i] = posts[i]._id;
  }
  let obj = {
    "feed" : ids
  }
  res.json(obj);
});

router.route("/feed/:startingPosition/:pageSize").get(async function (req, res) {
  const response = await axios.get("http://localhost:8083/posts/post");
  const posts = response.data;
  var ids = [];
  const startingPosition = parseInt(req.params.startingPosition);
  const pageSize = parseInt(req.params.pageSize);
  for (i = 0; i < posts.length; i++) {
    ids[i] = posts[i]._id;
  }
  const page = ids.slice(startingPosition, startingPosition + pageSize);
  let obj = {
    "feed" : page
  }
  res.json(obj);
});

module.exports = router;