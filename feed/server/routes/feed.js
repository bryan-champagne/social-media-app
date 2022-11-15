const express = require("express");
const axios = require("axios");
const { response } = require("express");
const router = express.Router();

//Gets posts from post service API
async function getPosts() {
  const response = await axios.get("http://localhost:8083/posts/post");
  console.log(response.data)
  return response.data;
}

//Gets likes from statistics service API
async function getLikes() {
  const response = await axios.get("http://localhost:8087/statistics/likes");
  return response.data;
}

//Gets views from statistics service API
async function getViews() {
  const response = await axios.get("http://localhost:8087/statistics/views");
  return response.data;
}

//Feed sorting algorithm
//Takes an array of post ID strings as input and returns post IDs in a sorted array of strings
async function sortPosts(posts) {
  const likes = await getLikes();
  const views = await getViews();

  var weights = [];
  for (i = 0; i < posts.length; i++) {
    let postObj = {
      "postID" : posts[i],
      "likes" : 0,
      "views" : 0,
      "weight" : 0
    };
    weights.push(postObj);
  }

  for (i = 0; i < posts.length; i++) {
    for (j = 0; j < likes.length; j++) {
      if (likes[j].postId == posts[i]) {
        weights[i].likes += 1;
      }
    }
    for (j = 0; j < views.length; j++) {
      if (views[j].postId == posts[i]) {
        weights[i].views += 1;
      }
    }
  }

  for (i = 0; i < weights.length; i++) {
    weights[i].weight = weights[i].likes + weights[i].views;
  }

  weights.sort(function(a, b){
    return b.weight - a.weight;
  });

  var sortedIDs = [];
  for (i = 0; i < posts.length; i++) {
    sortedIDs[i] = weights[i].postID;
  }
  
  return sortedIDs;
}

//Pagination function
//Takes starting position, page size, and postIDs as an array of strings as input and returns an array of the requested size
function paginate(startingPosition, pageSize, posts) {
  return posts.slice(startingPosition, startingPosition + pageSize);
}

//Full feed service for an anonymous user
router.route("/feed").get(async function (req, res) {
  const posts = await getPosts();
  console.log('dwdw')

  var postIDs = [];
  for (i = 0; i < posts.length; i++) {
    postIDs[i] = posts[i]._id;
  }

  const sortedPosts = await sortPosts(postIDs);

  let obj = {
    "feed" : sortedPosts
  };

  res.json(obj);
});

//Paginated feed service for an anonymous user
//Takes URI inputs of starting position and page size
router.route("/feed/:startingPosition/:pageSize").get(async function (req, res) {
  const posts = await getPosts();

  const startingPosition = parseInt(req.params.startingPosition);
  const pageSize = parseInt(req.params.pageSize);
  if (isNaN(startingPosition) || isNaN(pageSize)) return res.status(400).send("Error: invalid starting position and/or page size, starting position and page size must be a number.");
  
  var postIDs = [];
  for (i = 0; i < posts.length; i++) {
    postIDs[i] = posts[i]._id;
  }

  const sortedPosts = await sortPosts(postIDs);
  const page = paginate(startingPosition, pageSize, sortedPosts);

  let obj = {
    "feed" : page
  };

  res.json(obj);
});

//gets a list of the users that are followed from the logged in user
async function getFollowing(userId) {
const response = await axios.get(`http://localhost:8085/following/${userId}`);

  return response.data?.following;
}

//get posts from a specific user
async function getUsersPosts(){
 //iterate throught the list of the users from getFollowing
 //and display their posts
}
//returns sorted feed for the loged in user
router.route("/feed/:userId").get(async function (req, res) {
//shows the feed
});

getViews().then((e) => console.log(e))
module.exports = router;