//require express
var express = require('express');
var path = require('path');
var User = require('../model/user');
var Post = require('../model/post');
//create our router object
var router = express.Router();

//export our router
module.exports = router;


var auth = function(req, res, next) {
  if (req.session && req.session.email)
    return next();
  else
    return res.redirect('/login');
};
router.get('/', auth, function(req, res, next) {
  if (req.session && req.session.email) {
    User.findOne({
      email: req.session.email
    }, function(err, user) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        Post.find({
          author: user._id.toString()
        }, function(err, posts) {

          sum=0;
          for(i=0;i<posts.length;i++)
          {
            sum=sum+posts[i].likes.length;
          }
          console.log(sum);
          var render_data = {
            title: "Clean India",
            name: user.name,
            email: user.email,
            location: user.city,
            image: user.image,
            like_count: sum,
            posts: posts,
            current_userid: req.session.userid,
            author: user._id.toString()
          }
          res.render('./pages/profile', render_data);
        })

      }


    });
  }

})
