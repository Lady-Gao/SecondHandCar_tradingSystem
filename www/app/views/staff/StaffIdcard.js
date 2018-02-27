import React from "react";
import { Button } from 'antd';

import Staff from "./index.js";

export default class StaffIdcard extends React.Component {
	constructor(){
		super();

		this.state = {
			isFinish1 : false,
			isFinish2 : false,
			img1url : "",
			img2url : ""
		}
	}

	componentDidMount(){
		var self = this;
		//用react的壳，给window暴露2个函数
		window.finish1 = function(url){
			self.setState({
				isFinish1 : true,
				img1url : url
			})
		}

		window.finish2 = function(url){
			self.setState({
				isFinish2 : true,
				img2url : url
			})
		}
	}

	render(){
		return <Staff cname="身份信息提交">
			<div className="inner" ref="userprofile_box">
				{
					!this.state.isFinish1
					?
					<iframe 
						ref="iframe"
						src="/iframes/form1.html" 
						frameBorder="0"
						width="700"
						height="350"
					></iframe>
					:
					<div style={{"width":"700px","height":"350px"}}>
						<img style={{"max-width":"700px","max-height":"350px"}} src={`/uploads/${this.state.img1url}`} alt=""/>
					</div>
				}
					

				{
					!this.state.isFinish2
					?
					<iframe 
						ref="iframe"
						src="/iframes/form2.html" 
						frameBorder="0"
						width="700"
						height="350"
					></iframe>
					:
					<div style={{"width":"700px","height":"350px"}}>
						<img style={{"max-width":"700px","max-height":"350px"}} src={`/uploads/${this.state.img2url}`} alt=""/>
					</div>
				}

				<div>
					<Button type="primary">提交</Button>
				</div>
			</div>
		</Staff>
	}
}