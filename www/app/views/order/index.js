import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
import {connect} from "dva";
import {push} from 'react-router-redux';

import App from "../../containers/App.js";

class Order extends React.Component {
	constructor(props) {
		super(props);

	}

	gotopage(keyname , keypath){
		this.props.dispatch(push('/order/' + keyname))
	}

	render() {
		var pathname = this.props.routing.location.pathname.match(/\/.+\/(.+)/)[1];

		return (
			<App>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        selectedKeys={[pathname]}
                        defaultOpenKeys={['sub1' , 'sub2' ]}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={({ item, key, keyPath })=>{this.gotopage(key , keyPath)}}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="barcode" />订单管理</span>}>
                            <Menu.Item key="add">
                            	添加订单
                            </Menu.Item>
                            <Menu.Item key="manage">
                            	管理订单
                            </Menu.Item>
                            <Menu.Item key="search">
                            	查询订单
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="bank" />订单核对</span>}>
                            <Menu.Item key="yuedu">月度核对</Menu.Item>
                            <Menu.Item key="niandu">年度核对</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                	<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>
							<a href="/#/">
								首页
							</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a href="/#/cars/">
								订单管理
							</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a href="javascript:;">
								{this.props.cname}
							</a>
						</Breadcrumb.Item>
					</Breadcrumb>

					<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
						{this.props.children}
					</Content>
                </Layout>
			</App>
		);
	}
}


export default connect(
	({routing})=>({
		routing
	})
)(Order)