import React, { Component } from 'react'
import {connect} from "dva";
import classnames from "classnames";

class CarLike extends Component {
    //构造器
    constructor({dispatch , brand , series}){
        super();
    }

    componentDidUpdate(){
        //设置滑块和滑到，因为滑块和滑到和数据多少有关系，所以写在数据请求之后
        var $ul = $(this.refs.ul);
        var $bar = $(this.refs.bar);
        var $b = $(this.refs.b);
        var $main = $(this.refs.main);

        //看高度
        const ulheight = this.props.carlikeresult.length * 40;
        const barheight = $bar.height();
        //比例
        const bili = barheight / ulheight;
        //b的高度
        const bheight = barheight * bili;
        $b.css("height", bheight);

        if(bili >= 1){
            $b.hide();
        }

        //信号量
        var nowbtop = 0;

        //这里写可以被拖拽
        $b.draggable({
            "containment" : "parent" ,
            "drag" : function(event , ui){
                //当拖拽的时候的事情
                nowbtop = ui.position.top;
                $ul.css({ "top": -nowbtop / bili});
            }
        });

        //鼠标滚轮事件
        $main.mousewheel(function(event,delta){
            if(delta < 0){
                nowbtop += 10;
                if (nowbtop > barheight - bheight){
                    nowbtop = barheight - bheight;
                }
               
            }else if(delta > 0){
                nowbtop -= 10;
                if (nowbtop < 0) {
                    nowbtop = 0;
                }
            }
            $b.css({ "top": nowbtop });
            $ul.css({ "top": -nowbtop / bili });
        });
    }

 

    render() {
        
        return (
            <div className="carLike">
                <h3>更多{this.props.brand}{this.props.series}</h3>
                <div className="main" ref="main">
                    <ul ref="ul">
                        {
                            this.props.carlikeresult.map(item => {
                                let year = new Date(item.buydate).getFullYear();
                                return <li
                                    key={item.id}
                                    className={classnames({ "cur": this.props.id == item.id })}
                                    data-id={item.id}
                                    onClick={
                                        () => {
                                            //拉取pics数据，是异步的
                                            this.props.dispatch({ "type": "picshow/init_async" , "id": item.id , "brand" : item.brand , "series" : item.series });
                                        }
                                    }
                                >
                                {item.brand}{item.series}{year}年{item.color}色{item.km}万公里{item.price}万
                            </li>
                            })
                        }
                    </ul>
                    <div className="bar" ref="bar">
                        <b ref="b"></b>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    ({picshow : {brand , series , id , carlikeresult}})=>({
        brand, series , id , carlikeresult
    })
)(CarLike);