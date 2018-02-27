import React, { Component } from 'react';
import { connect } from "dva";
import classnames from "classnames";

class BigImg extends Component {

    //组件将要更新
    componentWillUpdate({ pics, nowidx, nowalbum, id }){
        var nowpic = pics[nowalbum][nowidx];
        var theimgurl = `/carimages/${ id }/${nowalbum}/${ nowpic }`;
        //开始制作懒加载，当图片完全加载后上树，而不是一条一条刷出来了
        //没有加载好的时候，隐藏原图
        $(this.refs.inner).find("img").hide();
        //实例化一个新图片，写src发出请求
        var img = new Image();
        img.src = theimgurl;    //地址就是新图片地址
        var self = this;
        //当img加载完毕
        img.onload = function(){
            //上树
            $(self.refs.inner).find("img").attr("src", theimgurl).show();
        }
    }

    rightBtnHandler(){
        //验证是不是最后一张
        if(this.props.nowalbum == "more"){
            if(this.props.nowidx == this.props.pics["more"].length - 1){
                alert("已经没有图片了，请看其他车辆！");
                return;
            }
        }
        this.props.dispatch({ "type": "picshow/gonext" })
    }

    leftBtnHandler() {
        //验证是不是第一张
        if (this.props.nowalbum == "view") {
            if (this.props.nowidx == 0) {
                alert("已经没有图片了，请看其他车辆！");
                return;
            }
        }
        this.props.dispatch({ "type": "picshow/goprev" })
    }

    render() {
 
        return (
            <div className="bigImg">
                <div className="inner" ref="inner">
                    <img src=""  />
                    <div className="rightBtn" onClick={this.rightBtnHandler.bind(this)}></div>
                    <div className="leftBtn" onClick={this.leftBtnHandler.bind(this)}></div>
                </div>
            </div>
        )
    }
}

export default connect(
    ({ picshow: { pics, nowidx, nowalbum, id } }) => ({
        pics, nowidx, nowalbum, id
    })
)(BigImg);