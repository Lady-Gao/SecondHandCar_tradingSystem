import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
import {connect} from "dva";
import {push} from 'react-router-redux';

import App from "../../containers/App.js";

class Staff extends React.Component {
	constructor(props) {
		super(props);

	}

	gotopage(keyname , keypath){
		this.props.dispatch(push('/staff/' + keyname))
	}

	render() {
		var pathname = this.props.routing.location.pathname.match(/\/.+\/(.+)/)[1];

		return (
			<App>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        selectedKeys={[pathname]}
                        defaultOpenKeys={['sub1' ]}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={({ item, key, keyPath })=>{this.gotopage(key , keyPath)}}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="barcode" />身份管理</span>}>
                            <Menu.Item key="modify">
                            	修改身份信息
                            </Menu.Item>
                            <Menu.Item key="idcard">
                            	上传身份证信息
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                	<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>
							首页
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							员工管理
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							{this.props.cname}
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
)(Staff)