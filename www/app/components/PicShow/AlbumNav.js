import React, { Component } from 'react'
import classnames from "classnames";

import {connect} from "dva";

class AlbumNav extends Component {
    render() {
        return (
            <div className="albumNav">
                <h3>
                    {this.props.brand}
                    {this.props.series}
                    [{this.props.id}]
                </h3>
                <ul>
                    <li
                        className={classnames({ "cur": this.props.nowalbum == "view"})}
                        onClick={()=>{this.props.dispatch({"type":"picshow/changeAlbum" , "album" : "view"})}}
                    >外观
                        （{this.props.pics.view.length}）
                    </li>
                    <li
                        className={classnames({ "cur": this.props.nowalbum == "inner" })}
                        onClick={() => { this.props.dispatch({ "type": "picshow/changeAlbum", "album": "inner" }) }}
                    >
                        内饰
                        （{this.props.pics.inner.length}）
                    </li>
                    <li
                        className={classnames({ "cur": this.props.nowalbum == "engin" })}
                        onClick={() => { this.props.dispatch({ "type": "picshow/changeAlbum", "album": "engin" }) }}
                    >
                        结构和发动机
                        （{this.props.pics.engin.length}）
                    </li>
                    <li
                        className={classnames({ "cur": this.props.nowalbum == "more" })}
                        onClick={() => { this.props.dispatch({ "type": "picshow/changeAlbum", "album": "more" }) }}
                    >
                        更多细节
                        （{this.props.pics.more.length}）
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect(
    ({picshow})=>({
        id : picshow.id,
        pics : picshow.pics,
        brand : picshow.brand,
        series : picshow.series,
        nowalbum: picshow.nowalbum
    })
)(AlbumNav);