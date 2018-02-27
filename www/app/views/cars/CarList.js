import React, { Component } from 'react'

import CarFilter from "../../components/CarFilter";
import CarTable from "../../components/CarTable";
import PicShow from "../../components/PicShow";

import Cars from "./index.js";

import "./CarList.less";

export default class CarList extends Component {
	constructor(){
		super();

		this.state = {
            showPicShow : false
        }
	}
    
    changeShowPicshow(showPicShow){
        this.setState({
            showPicShow
        })
    }


    render() {
        return (
            <Cars cname="列表选车">
                <CarFilter />
                <CarTable changeShowPicshow={this.changeShowPicshow.bind(this)} />
                
                {
                    this.state.showPicShow
                    ?
                    <div className="picshowwrapper">
                        <div className="inner_wrapper">
                            <a 
                                className="closeBtn" 
                                href="javascript:;"
                                onClick={()=>{this.changeShowPicshow(false)}}
                            >×</a>
                            <PicShow />
                        </div>
                    </div>
                    :
                    null
                }
            </Cars>
        )
    }
}
