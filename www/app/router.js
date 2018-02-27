import React from "react";
import App from "./containers/App.js";
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux';
import {Route } from 'react-router';
import createHistory from 'history/createHashHistory';
const history = createHistory();


import CarList from "./views/cars/CarList.js";
import CarSearch from "./views/cars/CarSearch.js";
import CarSale from "./views/cars/CarSale.js";
import CarGujia from "./views/cars/CarGujia.js";

import OrderAdd from "./views/order/OrderAdd.js";
import OrderManage from "./views/order/OrderManage.js";
import OrderYuedu from "./views/order/OrderYuedu.js";
import OrderNiandu from "./views/order/OrderNiandu.js";
import OrderSearch from "./views/order/OrderSearch.js";

import StaffModify from "./views/staff/StaffModify.js";
import StaffIdcard from "./views/staff/StaffIdcard.js";

import Index from "./views/index/index.js";

export default () => {
	return <ConnectedRouter history={history}>
	    <div>
	        <Route exact path="/cars/list" component={CarList}/>
	        <Route exact path="/cars/search" component={CarSearch}/>
	        <Route exact path="/cars/sale" component={CarSale}/>
	        <Route exact path="/cars/gujia" component={CarGujia}/>

	        <Route exact path="/order/add" component={OrderAdd}/>
	        <Route exact path="/order/manage" component={OrderManage}/>
	        <Route exact path="/order/yuedu" component={OrderYuedu}/>
	        <Route exact path="/order/niandu" component={OrderNiandu}/>
	        <Route exact path="/order/search" component={OrderSearch}/>

	        <Route exact path="/staff/modify" component={StaffModify}/>
	        <Route exact path="/staff/idcard" component={StaffIdcard}/>

	        <Route exact path="/" component={Index}/>
	    </div>
	</ConnectedRouter>
}