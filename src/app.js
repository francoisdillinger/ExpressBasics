'use strict';

var express = require('express'),
    posts = require('./fakedata/posts.json');
var postLists = Object.keys(posts).map(function(value){
    return posts[value]});
var app = express();
// use() defines middleware, which is logic that tells express how to handle a request between the time a request is made by a client but before it arrives at a route
app.use('/static',express.static( __dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');
//debugger;
app.get('/', function(req, res){
    res.render('index');
});
app.get('/blog/:title?', function(req, res){
    var title = req.params.title;
    if(title === undefined){
        res.status(503);
        res.render('blog', {posts: postLists});
    }
    else{
       var post = posts[title] || {};
       res.render('post', {post: post}); 
    }
    
});
app.listen(3000, function() {
    console.log('The frontend server is on port 3000 you genius!');
});