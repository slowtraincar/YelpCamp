
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};



//CHECK CAMPGROUND OWNERSHIP
middlewareObj.checkCampgroundOwnership = function(req, res, next){
if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Sorry, that campground couldn't be found.")
            res.redirect("back");
        } else {
   //DOES USER OWN THE CAMPGROUND?
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "Sorry, only the campground creator can do that.")
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "Please login first!")
        res.redirect("back");
    }
};

//CHECK COMMENT OWNERSHIP
middlewareObj.checkCommentOwnership = function(req, res, next){
if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err || !foundComment){
            res.redirect("back");
        } else {
   //DOES USER OWN THE COMMENT?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                res.flash("error", "Only the comment author may do that.")
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "You must login first!")
        res.redirect("back");
    }
};

//IS LOGGED IN FUNCTION 
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
};



/////////////////////////////
module.exports = middlewareObj;