import React from 'react';

import {Tag} from 'antd';

import {connect} from "dva";

import moment from "moment";


class NowFilter extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const showTags = () =>{
			var ARR = [];
			for(var k in this.props.filter){
				//分类讨论
				if(k == "brand"){
					ARR.push(
						<Tag key={k} closable onClose={()=>{this.props.dispatch({"type":"carlist/delfilter","names":["brand","series"]})}}>
							品牌 : {this.props.filter["brand"]}
						</Tag>
					);
				}else if(k == "series"){
					ARR.push(
						<Tag key={k} closable onClose={()=>{this.props.dispatch({"type":"carlist/delfilter","names":["series"]})}}>
							车系 : {this.props.filter["series"] }
						</Tag>
					);
				}else if(k == "price"){
					ARR.push(
						<Tag key={k} closable onClose={()=>{this.props.dispatch({"type":"carlist/delfilter","names":["price"]})}}>
							价格 : 
							{this.props.filter["price"][0]}万元 
							到 
							{this.props.filter["price"][1]}万元
						</Tag>
					);
				}else if(k == "km"){
					ARR.push(
						<Tag key={k} closable onClose={()=>{this.props.dispatch({"type":"carlist/delfilter","names":["km"]})}}>
							公里数 : 
							{this.props.filter["km"][0]}万公里 
							到 
							{this.props.filter["km"][1]}万公里
						</Tag>
					);
				}else if(k == "buydate"){
					ARR.push(
						<Tag key={k} closable onClose={()=>{this.props.dispatch({"type":"carlist/delfilter","names":["buydate"]})}}>
							购买日期 : 
							{
								moment(this.props.filter["buydate"][0]).format("YYYY年MM月DD日")
							}
							 
							到 
							{
								moment(this.props.filter["buydate"][1]).format("YYYY年MM月DD日")
							}
						</Tag>
					);
				}else if(k == "type"){
					var value = this.props.filter["type"];
					ARR.push(
						<Tag key={k} closable onClose={()=>{this.props.dispatch({"type":"carlist/delfilter","names":["type"]})}}>
							车型 : 
							{value.join(" 或 ")}
						</Tag>
					);
				}else if(k == "color"){
					var value = this.props.filter["color"];
					ARR.push(
						<Tag key={k} closable onClose={()=>{this.props.dispatch({"type":"carlist/delfilter","names":["color"]})}}>
							颜色 : 
							{value.join(" 或 ")}
						</Tag>
					);
				}else if(k == "engin"){
					var value = this.props.filter["engin"];
					ARR.push(
						<Tag key={k} closable onClose={()=>{this.props.dispatch({"type":"carlist/delfilter","names":["engin"]})}}>
							排量 : 
							{value.join(" 或 ")}
						</Tag>
					);
				}else if(k == "seat"){
					var value = this.props.filter["seat"];
					ARR.push(
						<Tag key={k} closable onClose={()=>{this.props.dispatch({"type":"carlist/delfilter","names":["seat"]})}}>
							座位数 : 
							{value.join(" 或 ")}
						</Tag>
					);
				}else if(k == "gear"){
					var value = this.props.filter["gear"];
					ARR.push(
						<Tag key={k} closable onClose={()=>{this.props.dispatch({"type":"carlist/delfilter","names":["gear"]})}}>
							变速箱 : 
							{value.join(" 或 ")}
						</Tag>
					);
				}				 
			}
			return ARR;
		}

		return (
			<div>
				{showTags()}
			</div>
		);
	}
}


export default connect(
    ({carlist : {filter}})=>({
        filter
    })
)(NowFilter);
