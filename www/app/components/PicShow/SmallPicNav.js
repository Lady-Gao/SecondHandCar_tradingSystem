import React, { Component } from 'react';
import { connect } from "dva";
import classnames from "classnames";

class SmallPicNav extends Component {
    constructor(){
        super();

        
    }

    //组件上树之后
    componentDidMount(){
        var $unit = $(this.refs.unit);
        var $smallPicNav = $(this.refs.smallPicNav);
        //点击小方块导航之后做动画
        $(this.refs.ol).delegate("li" , "click" , function(){
            $unit.stop(true).animate({"left" : -320 * $(this).data("i")},300);
            //排他
            $(this).addClass("cur").siblings().removeClass("cur");
        });  

        //鼠标离开大区域
        var self = this;
        $smallPicNav.mouseleave(function(){
            var nowidx = self.props.nowidx;
            $(self.refs.ol).find("li").eq(parseInt(nowidx / 4)).addClass("cur").siblings().removeClass("cur");
            $unit.stop(true).animate({ "left": -320 * parseInt(nowidx / 4) }, 300);
        });

        //点击小图的时候
        $unit.delegate("li" , "click" , function(){
            self.props.dispatch({"type":"picshow/changenowidx" , "nowidx" : $(this).data("i")});
        });
    }
 
    render() {
        const {pics , nowalbum , id , nowidx} = this.props;

        //拉动unit回来
        $(this.refs.unit).css({ "left": -320 * parseInt(nowidx / 4)});
        

        //总页数
        var pageamount = Math.ceil(pics[nowalbum].length / 4);
        
        //显示ul和li
        const showUlLi = () => {
            var ARR = [];
            //循环总页数
            for (let i = 0; i < pageamount ; i++){
                //图片地址序列
                var arr = pics[nowalbum].slice(i * 4 , i * 4 + 4);
                ARR.push(
                    <ul key={i}>
                        {
                            arr.map((item , index)=>{
                                return <li 
                                    key={i * 4 + index}
                                    className={classnames({"cur" : nowidx == i * 4 + index})}
                                    data-i={i * 4 + index}
                                >
                                    <img src={`/carimages_small/${id}/${nowalbum}/${item}`} />
                                </li>
                            })
                        }
                    </ul>
                );
            }
            return ARR;
        }


        //生成小方块导航
        const showOlLi = () => {
            if (pageamount == 1) return null;

            var ARR = [];
            for(var i = 0; i < pageamount ;i++){
                ARR.push(<li 
                    key={i} 
                    style={{ "width": parseInt(300 / pageamount) + "px"}}
                    className={classnames({ "cur": parseInt(nowidx / 4) == i})}
                    data-i={i}
                ></li>);
            }
            return ARR;
        }

        return (
            <div className="smallPicNav" ref="smallPicNav">
               <div className="inner">
                    <div className="unit" ref="unit">
                        {showUlLi()}
                    </div>
                    <ol ref="ol">
                        {showOlLi()}
                    </ol>
                </div>
            </div>
        )
    }
}

export default connect(
    ({ picshow: { pics, nowidx, nowalbum , id}})=>({
        pics, nowidx, nowalbum, id
    })
)(SmallPicNav);