var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	"email" : String ,		//email
	"password" : String ,	//密码，加密之后的密码
	"username" : String,
    "avata_url" : String,
    "realname" : String,
    "mobile" : Number,
    "weixin" : String,
    "gangwei" : String
});

module.exports = mongoose.model("User" , schema);