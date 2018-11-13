var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var CommentSchema = new Schema({

    note: String

});

var Comment = mongoose.model("Comment",CommentSchema);

module.exports = Comment;