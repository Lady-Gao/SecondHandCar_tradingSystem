import React from 'react';
import {Input} from "antd";
import Cars from "./index.js";

export default class CarSearch extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Cars cname="搜索车辆">
				<h1>搜索车辆</h1>
				<p>请输入车主姓名或者订单号选车</p>
				<Input  />
			</Cars>
		);
	}
}
