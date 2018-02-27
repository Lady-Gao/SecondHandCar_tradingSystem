//这个程序的作用是，创建100条模拟数据
//这个js文件你要node一下的

var fs = require("fs");
var mongoose = require("mongoose");
var _ = require("underscore");
var path = require("path");

var Car = require("../models/Car.js");
var xingming = require("./_xingming.js");

mongoose.connect("localhost/yayuncun");

//清空Car中的所有现存数据
Car.remove({},function(){
    //读取基本数据JSON文档
    fs.readFile(__dirname + "/_按id的数据汇总.json", function (err, content) {
        var arr = JSON.parse(content.toString());
        //遍历每一项，为每一项补充一些内容，比如车主姓名、公里数、售价等等信息
        for (let i = 0; i < arr.length; i++) {
            //车主姓名
            arr[i].owner = _.sample(xingming.xing, 1)[0] + _.sample(xingming.ming, _.random(1,2)).join("")
            //公里数（万公里）
            arr[i].km = _.random(0,100);
            //price（万元）
            arr[i].price = _.random(0, 1000) / 10;
            //购买日期
            var bd = new Date(_.random(2004, 2017), _.random(0, 11), _.random(1, 31));
            arr[i].buydate = bd;
            //卖的日期
            arr[i].saledate = new Date(Date.parse(bd) + _.random(12331,123211312123));
            //手动挡和自动挡
            arr[i].gear = _.sample(["手动挡","自动挡"] , 1)[0];
            //发动机
            arr[i].engin = _.sample(["1.0","2.0","3.0","4.0","5.0"] , 1)[0];
            //读取文件夹
            var aaaaa = fs.readdirSync(path.resolve(__dirname , "../www/carimages_small/" , arr[i].id.toString() , "view"))
            
            arr[i].img = aaaaa[0];

            Car.create(arr[i],function(){
                console.log("第" + i + "项插入数据库成功");
            });
        }
    });
});

