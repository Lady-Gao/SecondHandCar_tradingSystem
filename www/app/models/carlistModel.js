import * as R from "ramda";

export default {
	namespace : "carlist" , 
	state : {
		filter : {},
		cars : [],
		page : 1,
		pagesize : 5,
		total : 0,
		sort : "id",
		sortdirection:1
	},
	reducers : {
		addorchangefilter_sync(state , {name , value}){
			return R.set(R.lensProp("filter"),R.set(R.lensProp(name),value,state.filter),state);
		},
		//删除过滤器
		delfilter_sync(state , {names}){
			return R.set(R.lensProp("filter"),R.omit(names,state.filter),state);
		},
		//更改车辆
		changecars_sync(state , {results , total , page = state.page , pagesize = state.pagesize}){
			var o = R.set(R.lensProp("cars"),results,state);
			o = R.set(R.lensProp("total"),total,o);
			o = R.set(R.lensProp("pagesize"),pagesize,o);
			o = R.set(R.lensProp("page"),page,o);
			return o;
		},
		// 更改页面
		changepage_sync(state , {page}){
			return R.set(R.lensProp("page"),page,state);
		},
		changepagesize_sync(state , {pagesize}){
			return R.set(R.lensProp("pagesize"),pagesize,state);
		},
		//改变排序
		changesort_sync(state , {sort , sortdirection}){
			var o = R.set(R.lensProp("sort"),sort,state);
			return R.set(R.lensProp("sortdirection"),sortdirection,o);
		}
	},
	effects : {
		//增加或者改变过滤器
		*addorchangefilter({name , value} , {put , select}){
			yield put({"type":"addorchangefilter_sync",name , value});

			const filter = yield select(({carlist})=>carlist.filter);
			const page = 1;	//添加过滤器一定从1也走
			const pagesize = yield select(({carlist})=>carlist.pagesize);
			const sort = yield select(({carlist})=>carlist.sort);
			const sortdirection = yield select(({carlist})=>carlist.sortdirection);

			yield put({"type":"changepage_sync" , page});

			const {results , total} = yield fetch(`/cars?page=${page}&pagesize=${pagesize}&sort=${sort}&sortdirection=${sortdirection}` , {
				"method" : "POST" ,
				"headers" : {
					"Content-Type" : "application/json"
				},
				"body" : JSON.stringify(filter)
			}).then(data=>data.json());

			yield put({"type" : "changecars_sync" , results , total})
		},
		//删除过滤器
		*delfilter({names} , {put , select}){
			yield put({"type":"delfilter_sync",names});

			const filter = yield select(({carlist})=>carlist.filter);
			const page = 1;
			const pagesize = yield select(({carlist})=>carlist.pagesize);
			const sort = yield select(({carlist})=>carlist.sort);
			const sortdirection = yield select(({carlist})=>carlist.sortdirection);

			yield put({"type":"changepage_sync" , page});

			const {results , total} = yield fetch(`/cars?page=${page}&pagesize=${pagesize}&sort=${sort}&sortdirection=${sortdirection}` , {
				"method" : "POST" ,
				"headers" : {
					"Content-Type" : "application/json"
				},
				"body" : JSON.stringify(filter)
			}).then(data=>data.json());

			yield put({"type" : "changecars_sync" , results , total})
		},
		//改变页码或者改变每页显示多少条的时候会发数据
		*changepage({pagination , sorter} , {put , select}){
		 	const filter = yield select(({carlist})=>carlist.filter);
		 	const oldSort = yield select(({carlist})=>carlist.sort);
		 	const oldSortDirection = yield select(({carlist})=>carlist.sortdirection);
		 	const oldPagesize = yield select(({carlist})=>carlist.pagesize);
	 		const sort =  sorter.columnKey || "id";
			const sortdirection =  sorter.order == "descend" ? -1 : 1;
			const pagesize =  pagination.pageSize;

			//如果老排序和新排序不一样，或者老排序方向和新排序方向不一样，page从1开始
			if(oldSort == sort && oldSortDirection == sortdirection && oldPagesize == pagesize){
				var page = pagination.current;
			}else{
			 	var page = 1;
			}

		 	yield put({"type":"changepage_sync" , page});
		 	yield put({"type":"changesort_sync" , sort , sortdirection});
		

			const {results , total} = yield fetch(`/cars?page=${page}&pagesize=${pagesize}&sort=${sort}&sortdirection=${sortdirection}` , {
				"method" : "POST" ,
				"headers" : {
					"Content-Type" : "application/json"
				},
				"body" : JSON.stringify(filter)
			}).then(data=>data.json());

			yield put({"type" : "changecars_sync" , results , total})
		}
	} 
}