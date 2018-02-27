import React from 'react';
import {Table} from "antd";

import {connect} from "dva";

import "./cartable.less";

class CarTable extends React.Component {
 
	constructor(props) {
		super(props);
	}

	render() {
	 
		const columns = [
			{
			  title: 'id',
			  dataIndex: 'id',
			  key: 'id',
			  sorter : true
			},
			{
			  title: '图片',
			  dataIndex: 'img',
			  key: 'img',
			  render : (text , record)=>{
			  	return <img 
			  		src={`/carimages_small/${record.id}/view/${record.img}`} 
			  		alt=""
			  		onClick={
			  			()=>{
			  				this.props.dispatch({"type" : "picshow/init_async" , "id" : record.id , "brand" : record.brand , "series" : record.series})
			  				this.props.changeShowPicshow(true)
			  			}
			  		}
			  	/>
			  }
			},
			{
			  title: '品牌',
			  dataIndex: 'brand',
			  key: 'brand'
			}, 
			{
			  title: '车系',
			  dataIndex: 'series',
			  key: 'series'
			}, 
			{
			  title: '车主',
			  dataIndex: 'owner',
			  key: 'owner'
			}, 
			{
			  title: '颜色',
			  dataIndex: 'color',
			  key: 'color'
			}, 
			{
			  title: '排量',
			  dataIndex: 'engin',
			  key: 'engin',
			  sorter : true
			}, 
			{
			  title: '变速箱',
			  dataIndex: 'gear',
			  key: 'gear'
			}, 
			{
			  title: '行驶公里数',
			  dataIndex: 'km',
			  key: 'km',
			  sorter : true
			}, 
			{
			  title: '价格（万元）',
			  dataIndex: 'price',
			  key: 'price',
			  sorter : true
			}, 
			{
			  title: '购买日期',
			  dataIndex: 'buydate',
			  key: 'buydate',
			  sorter : true
			}
		];

		return (
		  <div className="cartable">
		  	<b>共{this.props.total}辆车符合要求，每页显示{this.props.pagesize}条，所以共{Math.ceil(this.props.total / this.props.pagesize)}页</b>
	  		<Table 
		  		rowKey="id" 
		  		dataSource={this.props.cars} 
		  		columns={columns} 
		  		pagination={{
		  			"current" : this.props.page,
	  				"total" : this.props.total,
	  				"pageSize" : this.props.pagesize,
	  				"showSizeChanger" : true,
		  			"pageSizeOptions" : ['5','10','15','50','100']
		  		}}
		  		onChange={(pagination, filters, sorter)=>{
		  			this.props.dispatch({"type":"carlist/changepage" , pagination , sorter})
		  		}}
	  		/>
		  </div>
		);
	}
}

export default connect(
	({carlist})=>({
		cars : carlist.cars,
		pagesize : carlist.pagesize,
		page : carlist.page,
		total : carlist.total
	})
)(CarTable);