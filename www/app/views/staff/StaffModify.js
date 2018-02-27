import React from 'react';
import { Input , Row , Col , Divider , Button} from 'antd';

import "./StaffModify.less";

import CutAvatar from "../../components/CutAvatar";

import Staff from "./index.js";

export default class StaffModify extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isShowCutBox : false ,
			avatar_url : ""
		}

		this.loadData();
	}

	//拉取数据
	loadData(){
		var self = this;
		$.get("/staff",function(data){
		 	
		 	if(!data.result.avata_url){
		 		data.result.avata_url = "/images/default_avatar.png";
		 	}else{
		 		data.result.avata_url = `/avatars/${data.result.avata_url}`;
		 	}
			$(self.refs.avatarimg).attr("src" , data.result.avata_url);
			$("#realnameTxt").val(data.result.realname);
			$("#mobileTxt").val(data.result.mobile);
			$("#weixinTxt").val(data.result.weixin);
			$("#gangweiTxt").val(data.result.gangwei);
			$("#emaildiv").html(data.result.email);


			 
		});

	}

	//设置悬浮窗
	setisShowCutBox(isShowCutBox){
		this.setState({
			isShowCutBox
		})
	}

	componentDidMount(){
		var self = this;
		//图片上传完毕
		window.finishavatar = function(url){
			self.setState({
				isShowCutBox : true,
				avatar_url : url
			})
		}
	}


	//提交按钮
	async submitClick(){
		var realname = $("#realnameTxt").val();
		var mobile = $("#mobileTxt").val();
		var weixin = $("#weixinTxt").val();
		var gangwei = $("#gangweiTxt").val();
		var email = $("#emaildiv").html();

		var {result} = await fetch("/tijiao_userprofile" , {
			"method" : "POST",
			"headers" : {
				"Content-Type" : "application/json"
			},
			"body" : JSON.stringify({realname,mobile,weixin,gangwei,email})
		}).then(data=>data.json());

		if(result == 1){
			alert("修改成功！");
		}
	}


	render() {
		return (
			<Staff cname="个人信息修改">
				<div className="Userprofile">
					{
						 
						<Row>
							<h1>个人信息修改</h1>
							<Divider></Divider>
							<Col span={12}>
								<Row>
									<Col span={4}>
										Email:
									</Col>
									<Col span={16}>
										<div id="emaildiv"></div>
									</Col>
								</Row>
								<Row>
									<Col span={4}>
										真实姓名：
									</Col>
									<Col span={16}>
										<Input placeholder="" id="realnameTxt"/>
									</Col>
								</Row>
								<Row>
									<Col span={4}>
										手机号码：
									</Col>
									<Col span={16}>
										<Input placeholder="" id="mobileTxt"/>
									</Col>
								</Row>
								<Row>
									<Col span={4}>
										微信：
									</Col>
									<Col span={16}>
										<Input placeholder="" id="weixinTxt"/>
									</Col>
								</Row>
								<Row>
									<Col span={4}>
										工作岗位：
									</Col>
									<Col span={16}>
										<Input placeholder="" id="gangweiTxt"/>
									</Col>
								</Row>
							</Col>
							<Col span={12}>
								<p>
									<img src="images/default_avatar.png" ref="avatarimg" width="140"/>
								</p>
								<p>
									<iframe src="/iframes/form.html" frameBorder="0"></iframe>
								</p>
							</Col>
							<Col>
								<Button type="primary" onClick={this.submitClick.bind(this)}>提交</Button>
							</Col>
						</Row>
						 
					}

					{
						this.state.isShowCutBox
						?
						<div className="xuanfu">
							<div className="cut_box">
								<CutAvatar
									setisShowCutBox={this.setisShowCutBox.bind(this)}
									avatar_url={this.state.avatar_url}
									avatarimg={this.refs.avatarimg}
								></CutAvatar>
							</div>
						</div>
						:
						null
					}
						
				</div>
			</Staff>
		);
	}
}
