import React from 'react';
import {Input} from "antd";
import Cars from "./index.js";

export default class CarGujia extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Cars cname="车辆估价">
				<h1>车辆估价</h1>
				 
			</Cars>
		);
	}
}
