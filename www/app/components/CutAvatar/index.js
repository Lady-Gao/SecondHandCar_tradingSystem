import React from 'react';
import {Button} from "antd";

import "./less.less";

export default class CutAvatar extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		//设置边界盒子的宽度、高度和bigImg宽度高度一样
		var self = this;

		var fangX = 0;
		var fangY = 0;
		var fangW = 100;
		var picw = 0;
		var pich = 0;

		//当图片加载完毕之后，给盒子设置宽度、高度
		$(this.refs.bigImg).bind("load",function(){
			picw = $(self.refs.bigImg).width();
			pich = $(self.refs.bigImg).height();

			$(self.refs.bigImgBound).css({
				width : picw,
				height : pich
			});
		});
			
		//让fang可以被拖拽
		$(this.refs.fang).draggable({
			containment : "parent" ,
			drag : function(event , ui){
				fangX = ui.position.left;
				fangY = ui.position.top;

				setYulan();

				$(self.refs.fang).find("img").css({
					"left" : -fangX,
					"top" : -fangY
				});
			}
		});


		//让fang可以被改变尺寸
		$(this.refs.fang).resizable({
			aspectRatio: 1 / 1 ,
			containment: "parent" ,
			resize : function(event , ui){
				fangW = ui.size.width;

				setYulan();
			}
		});

		//设置预览。大家之前受到的DOM的训练现在依然可以用
		const setYulan = () => {
			$(this.refs.yulan).find("div").each(function(){
				var w = $(this).data("w");

				$(this).find("img").css({
					"top" : -fangY / fangW * w,
					"left" : -fangX / fangW * w,
					"width" :  picw/fangW  * w,
					"height" : pich/fangW   * w
				})
			});
		}

		//点击裁切按钮
		$(this.refs.cut_btn).click(function(){
		 
			$.post("/docut" , {
				picurl : self.props.avatar_url ,
				fangX ,
				fangY ,
				fangW,
				picw ,
				pich 
			},function(data){
				if(data == 1){
					//关闭悬浮窗
					self.props.setisShowCutBox(false);
					//设置父组件的图片
					$(self.props.avatarimg).attr("src" , `/avatars/${self.props.avatar_url}`);
				}
			});
		});
	}

	render() {
		return (
		  	<div className="cut_box_wrapper">
		  		<div ref="bigImgBound" className="bigImgBound">
			  		<img 
			  			className="bigImg"
			  			ref="bigImg"
				  		src={`/uploads/${this.props.avatar_url}`} 
				  		alt=""
			  		/>
			  		<div ref="fang" className="fang">
			  			<img 
			  				className="bigImg"
					  		src={`/uploads/${this.props.avatar_url}`} 
					  		alt=""
				  		/>
			  		</div>
			  		<div className="mask_cover"></div>
			  	</div>

			  	<div className="yulan" ref="yulan">
			  		<div className="da" data-w="180">
			  			<img 
					  		src={`/uploads/${this.props.avatar_url}`} 
				  		/>
			  		</div>
			  		<div className="zhong"  data-w="120">
			  			<img 
					  		src={`/uploads/${this.props.avatar_url}`} 
				  		/>
			  		</div>
			  		<div className="xiao"  data-w="60">
			  			<img 
					  		src={`/uploads/${this.props.avatar_url}`} 
				  		/>
			  		</div>
			  		<button ref="cut_btn">裁切</button>
			  	</div>
		  	</div>
		);
	}
}
