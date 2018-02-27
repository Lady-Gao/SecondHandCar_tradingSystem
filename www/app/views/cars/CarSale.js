import React from 'react';
import {Input} from "antd";
import Cars from "./index.js";

export default class CarSale extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Cars cname="添加车辆信息">
				<h1>添加车辆信息</h1>
				 
			</Cars>
		);
	}
}
