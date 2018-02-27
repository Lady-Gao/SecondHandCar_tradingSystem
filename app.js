var express = require("express");
var app = express();
var fs = require("fs");
var url = require("url");
var path = require("path");
var gm = require('gm')
var session = require("express-session");
var mongoose = require("mongoose");
var formidable = require("formidable");
var Car = require("./models/Car.js");
var User = require("./models/User.js");

var loginctrl = require("./controllers/loginctrl.js");
var registctrl = require("./controllers/registctrl.js");

//设置模板引擎
app.set("view engine" , "ejs");



//链接数据库
mongoose.connect("localhost/yayuncun");

//使用session，这里的语句照抄，不要求懂：
app.set('trust proxy', 1);
app.use(session({
    resave : false,
    secret: 'qasystem',
    saveUninitialized: true,
    cookie: { maxAge: 86400 }   //session能够存储的时间
}));


app.get("/" , function(req,res,next){
    if(!req.session.login){
        res.redirect("/login");
    }else{
        next();
    }
});

//静态化www文件夹
app.use(express.static("www"));

//登录和注册
app.get("/regist"           , registctrl.showRegist);
app.post("/regist"          , registctrl.doRegist);
app.checkout("/regist"      , registctrl.checkUserExist);
app.get("/login"            , loginctrl.showLogin);
app.post("/login"           , loginctrl.doLogin);

//路由和接口
//图片展示的接口
app.get("/pics/:id" , function(req,res){
    //车辆id
    var id = req.params.id;
    var result = {};
    fs.readdir(`./www/carimages/${id}` , function(err , ds){
        result.view = fs.readdirSync(`./www/carimages/${id}/view`);
        result.inner = fs.readdirSync(`./www/carimages/${id}/inner`);
        result.engin = fs.readdirSync(`./www/carimages/${id}/engin`);
        result.more = fs.readdirSync(`./www/carimages/${id}/more`);

        res.json(result);
    });
});

//汽车的相似查询
app.get("/carlike/:brand/:series" , function(req,res){
    var brand = req.params.brand;
    var series = req.params.series;
    console.log(brand , series)
    Car.find({ brand: brand, series: series}).exec(function (err, docs) {
        res.json({"result" : docs});
    });
});

//查询接口
app.post("/cars" , function(req,res){
    //这个接口通过http的上行报文体传过滤器的查询的对象
    //通过get请求的querystring来输入page和pagesize、sort
    var page = url.parse(req.url , true).query.page;
    var pagesize = url.parse(req.url , true).query.pagesize;
    var sort = url.parse(req.url , true).query.sort;
    var sortdirection = url.parse(req.url , true).query.sortdirection;

    var form = new formidable.IncomingForm();
    form.parse(req , function(err , chaxuntiaojianObj){
        //价格
        if(chaxuntiaojianObj.hasOwnProperty("price")){
            chaxuntiaojianObj.price = {"$gte" : chaxuntiaojianObj.price[0] , "$lte" : chaxuntiaojianObj.price[1]};
        }
        //公里数
        if(chaxuntiaojianObj.hasOwnProperty("km")){
            chaxuntiaojianObj.km = {"$gte" : chaxuntiaojianObj.km[0] , "$lte" : chaxuntiaojianObj.km[1]};
        }
        //日历
        if(chaxuntiaojianObj.hasOwnProperty("buydate")){
            chaxuntiaojianObj.buydate = {"$gte" : new Date(chaxuntiaojianObj.buydate[0]) , "$lte" : new Date(chaxuntiaojianObj.buydate[1])};
        }

        //先计算总条数
        Car.count(chaxuntiaojianObj , function(err,count){
            //count符合条件的车的总数
            Car
            .find(chaxuntiaojianObj)
            .sort({[sort] : sortdirection})
            .skip((page - 1) * pagesize)
            .limit(pagesize)
            .exec(function(err,docs){
                res.json({
                    "total" : count , 
                    "results" : docs
                });
            });
        });
    });
});


//nodejs程序，实现上传身份证
app.post("/up" , function(req,res){
    //得到GET请求的函数名
    var cb = url.parse(req.url , true).query.cb;

    var form = new formidable.IncomingForm();
    //设置上传路径
    form.uploadDir = path.resolve(__dirname , "./www/uploads");
    //保留拓展名
    form.keepExtensions = true;
    form.parse(req , function(err , fields , files){
        //这里特别像一个JSONP，上传成功之后，后台哥哥会调用一个全局的函数通知你。
        //这是一个特别经典，90%以上的公司在用的伎俩。
        res.send("<script>window.parent." + cb + "('" + path.parse(files.pic.path).base + "')</script>");
    });
});



app.post("/up_avatar" , function(req,res){
    var form = new formidable.IncomingForm();
    //设置上传路径
    form.uploadDir = path.resolve(__dirname , "./www/uploads");
    //保留拓展名
    form.keepExtensions = true;
    form.parse(req , function(err , fields , files){
        //这里特别像一个JSONP，上传成功之后，后台哥哥会调用一个全局的函数通知你。
        //这是一个特别经典，90%以上的公司在用的伎俩。
        res.send("<script>window.parent.finishavatar('" + path.parse(files.avatar_file.path).base + "');window.location='/iframes/form.html'</script>");
    });
});


//裁切
app.post("/docut" , function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req , function(err , {picurl,fangX,fangY,fangW,picw,pich} ){
         
        var p_picurl = path.resolve(__dirname , "./www/uploads/" , picurl);
        var p_picurl_s = path.resolve(__dirname , "./www/avatars/" , picurl);

        gm(p_picurl).size(function(err , size){
            var realW = size.width;
            var realH = size.height;

            console.log(picurl,fangX,fangY,fangW,picw,pich);
            console.log(realW , realH)

            gm(p_picurl)
                .crop(parseInt(fangW * realW / picw), parseInt(fangW * realH / pich) , fangX * realW / picw, fangY * realH / pich)
                .resize(180,180,"!")
                .write(p_picurl_s, function (err) {
                    if (!err){

                        //存储数据库
                        User.update({"email" : req.session.email} , {"avata_url" : picurl}).exec(function(){
                            console.log("oooo")
                             res.send("1");
                        })
                       
                    }
                });
        });
    });
});

//显示用户信息
app.get("/staff" , function(req,res){
    if(!req.session.login) return ;
    User.find({"email" : req.session.email}).exec(function(err,docs){
        res.json({"result" : docs[0]})
    });
});


app.post("/tijiao_userprofile" , function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req , function(err , {email , realname , mobile , weixin , gangwei} ){
        User.update({"email" : email} , {realname , mobile , weixin , gangwei}).exec(function(){
            res.json({"result" : 1})
        })
    });
});


app.get("/tb1" , function(req,res){
    res.json({"data" : [8,9,10.1,20,11,12,13,12] , "categories" : ["2017年6月","2017年7月","2017年8月","2017年9月","2017年10月","2017年11月","2017年12月","2018年1月"]});
})

//监听
app.listen(3000);
console.log("程序已经运行在3000端口");