var mongoose = require("mongoose");

module.exports = mongoose.model("Car", {
    "id": Number,
    "brand": String,
    "series": String,
    "color": String,
    "owner": String,
    "km": Number,
    "price": Number,
    "buydate": Date,
    "saledate": Date,
    "gear": String,
    "engin": String,
    "seat": Number,
    "type" : String,
    "img" : String
});