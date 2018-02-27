import React, { Component } from 'react'
import {connect} from "dva";

import "./picshow.less";

import AlbumNav from "./AlbumNav.js";
import BigImg from "./BigImg.js";
import CarLike from "./CarLike.js";
import SmallPicNav from "./SmallPicNav.js";

class PicShow extends Component {
    //构造函数中发出init请求
    constructor({ dispatch }){
        super();
    }
    render() {
        return (
            <div className="picshow">
                <BigImg></BigImg>

                <div className="rightPart">
                    <AlbumNav></AlbumNav>
                    <CarLike></CarLike>
                    <SmallPicNav></SmallPicNav>
                </div>
            </div>
        )
    }
}

export default connect()(PicShow);