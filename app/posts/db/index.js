const PostModel = require('./postModel');
/**
 * @function getPostByID : get a post by its unique id
<<<<<<< HEAD
 * @param {string} postID
 */
const getPostByID = (postID) => new Promise((resolve, reject) => {
  PostModel.findById(postID, null, { lean: true }, (error, post) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(post);
  });
});
/**
 * @function getPosts - get array of posts by a filter object
 * @param {object} obtions - filter object, could be null
 */
const getPosts = (options) => new Promise((resolve, reject) => {
  PostModel.find(options, null, { lean: true }, (error, posts) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(posts);
  });
});
/**
 * @function updatePostLike - update post like
 * @param {string} postID - post which is liked
 * @param {string} userID - user who interacts
 * @param {boolean} likeStatus - true for like, false for unlike
 */
const updatePostLike = (postID, userID, likeStatus) => new Promise((resolve, reject) => {
  const updateQuery = {
    [likeStatus ? '$push' : '$pull']: {
      likes: userID
    },
    $inc: {
      like_count: likeStatus ? 1 : -1
    }
  };
  PostModel.findByIdAndUpdate(postID, updateQuery,
    { new: true, lean: true },
    (error, post) => {
      if (error || !post) {
        reject(error || 'Could not find that post');
        return;
      }
      resolve(post);
    });
});
/**
 * @function updatePostData : update post data (other than likes)
 * @param {string} postID
 * @param {object} newData
 */
const updatePostData = (postID, newData) => new Promise((resolve, reject) => {
  PostModel.findByIdAndUpdate(postID, {
    $set: newData
  }, { new: true, lean: true }, (error, post) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(post);
  });
});

/**
 * @function saveNewPost : save new post
 * @param {object} data
 */
const saveNewPost = (data) => new Promise((resolve, reject) => {
  const newPost = new PostModel({
    ...data,
    like_count: 0,
    likes: [],
    comments: []
  });
  newPost.save((error, post) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(post);
=======
 * @param {string} postID 
 */
const getPostByID = (postID) => new Promise((resolve, reject)=>{
  PostModel.findById(postID, null, { lean: true }, (error, post)=>{
    if(error){
      reject(error);
      return;
    }
    resolve(post);
  });
});
/**
 * @function getPosts - get array of posts by a filter object
 * @param {object} obtions - filter object, could be null
 */
const getPosts = (options) => new Promise((resolve, reject)=>{
  PostModel.find(options, null, { lean: true }, (error, posts) => {
    if(error){
      reject(error);
      return;
    }
<<<<<<< HEAD
    if(!posts || !posts.length){
      resolve([]);
      return;
    }
    resolve(posts.toObject());
>>>>>>> eebcc1e... create post component: post show service
=======
    resolve(posts);
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
  });
});
/**
 * @function updatePostLike - update post like
 * @param {string} postID - post which is liked
 * @param {string} userID - user who interacts 
 * @param {boolean} likeStatus - true for like, false for unlike
 */
const updatePostLike = (postID, userID, likeStatus) => new Promise((resolve, reject)=>{
  const updateQuery = {
    [likeStatus ? '$push': '$pull']: {
      likes: userID
    },
    $inc:{
      like_count: likeStatus ? 1: -1
    }
  }
  PostModel.findByIdAndUpdate(postID, updateQuery, 
    { new: true, lean: true }, 
    (error, post)=>{
    if(error || !post){
      reject(error || "Could not find that post");
      return;
    }
    resolve(post);
  });
});
/**
 * @function updatePostData : update post data (other than likes)
 * @param {string} postID 
 * @param {object} newData 
 */
const updatePostData = (postID, newData) => new Promise((resolve, reject)=>{
  PostModel.findByIdAndUpdate(postID, {
    $set: newData
  }, { new: true, lean: true }, (error, post) => {
    if(error){
      reject(error);
      return;
    }
    resolve(post);
  });
});

/**
 * @function saveNewPost : save new post
 * @param {object} data 
 */
const saveNewPost = (data) => new Promise((resolve, reject)=>{
  const newPost = new PostModel({
    ...data,
    like_count: 0,
    likes: [],
    comments: []
  });
  newPost.save((error, post)=>{
    if(error){
      reject(error);
      return;
    }
    resolve(post);
  });
});

module.exports = {
<<<<<<< HEAD
<<<<<<< HEAD
  getPostByID, getPosts, updatePostLike, updatePostData, saveNewPost
};
=======
  getPostByID, getPosts
}
>>>>>>> eebcc1e... create post component: post show service
=======
  getPostByID, getPosts, updatePostLike, updatePostData, saveNewPost
}
>>>>>>> 998de7b... update post component: like and publish services