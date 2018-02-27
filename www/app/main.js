import React from "react";
import dva from "dva";
import {createLogger}  from "redux-logger";

//路由文件
import router from "./router.js";
//模块
import carlistModel from "./models/carlistModel.js";
import picshowModel from "./models/picshowModel.js";

const app = dva({
	onAction : createLogger()
});

//应用模块
app.model(carlistModel);
app.model(picshowModel);
 
//配置路由，多么像express中的app.set()、app.use()啊！
app.router(router);
//上树！挂载！
app.start("#app");