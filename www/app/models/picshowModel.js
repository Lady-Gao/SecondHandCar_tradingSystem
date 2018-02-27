import * as R from "ramda";

export default {
    namespace : "picshow" , 
    state : {
        "id": 1000001 ,
        "brand" : "",
        "series" : "",
        "pics": {"view":[],"inner":[],"engin":[],"more":[]},
        "nowalbum" : "view",
        "nowidx" : 0,
        "carlikeresult" : []
    },
    reducers : {
        //拉取默认数据
        init(state , {pics , id , brand , series , result}){
            var o = R.set(R.lensProp("pics") , pics , state);
            o = R.set(R.lensProp("brand") , brand , o);
            o = R.set(R.lensProp("series") , series , o);
            o = R.set(R.lensProp("carlikeresult") , result , o);
            o = R.set(R.lensProp("nowalbum") , "view" , o);
            o = R.set(R.lensProp("nowidx") , 0 , o);
            return R.set(R.lensProp("id") , id , o);
        },
        //更换所在的album
        changeAlbum(state , {album}){
            var o = R.set(R.lensProp("nowalbum"), album, state);
            return R.set(R.lensProp("nowidx"), 0, o);
        },
        //更换nowidx
        changenowidx(state, { nowidx}){
            return R.set(R.lensProp("nowidx"), nowidx, state);
        },
        //下一张图
        gonext(state){
            if(state.nowidx < state.pics[state.nowalbum].length - 1){
                return R.set(R.lensProp("nowidx"), state.nowidx + 1, state);
            }else{
                var o = R.set(R.lensProp("nowidx"), 0, state);
                if(state.nowalbum == "view"){
                    return R.set(R.lensProp("nowalbum"), "inner" , o);
                } else if (state.nowalbum == "inner") {
                    return R.set(R.lensProp("nowalbum"), "engin", o);
                } else if (state.nowalbum == "engin") {
                    return R.set(R.lensProp("nowalbum"), "more", o);
                }
            }
        },
        //下一张图
        goprev(state){
            if(state.nowidx > 0){
                return R.set(R.lensProp("nowidx"), state.nowidx - 1, state);
            }else{
                
                if(state.nowalbum == "more"){
                    var o = R.set(R.lensProp("nowidx"), state.pics.engin.length - 1 , state);
                    return R.set(R.lensProp("nowalbum"), "engin" , o);
                } else if (state.nowalbum == "engin") {
                    var o = R.set(R.lensProp("nowidx"), state.pics.inner.length - 1 , state);
                    return R.set(R.lensProp("nowalbum"), "inner", o);
                } else if (state.nowalbum == "inner") {
                    var o = R.set(R.lensProp("nowidx"), state.pics.view.length - 1 , state);
                    return R.set(R.lensProp("nowalbum"), "view", o);
                }
            }
        }
    },
    effects : {
        //拉取默认数据
        *init_async({id , brand , series} , {put , select}){
            //这个组件不是最大的组件，是因为点击了Table中的图片，点击的一瞬间让它拉取数据
            //这一瞬间顺便设置一个id、brand、series。

            //发出Ajax请求
            var pics = yield fetch(`pics/${id}`).then(data=>data.json());
            var {result} = yield fetch(`carlike/${brand}/${series}`).then(data=>data.json());

            //转到同步执行
            yield put({ "type": "init", pics , id , series , brand , result});
        }
    }
}