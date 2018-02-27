import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider , Footer} = Layout;
import {connect} from "dva";
import {push} from 'react-router-redux';

import "./app.less";

class App extends Component {
    constructor(){
        super();
        
    }

    gotopage(keyname , url){
        this.props.dispatch(push(url));
    }

    render() {
        if(/\/.+\/.+?$/.test(this.props.routing.location.pathname)){
            var pathname = this.props.routing.location.pathname.match(/\/(.+)\/(.+)?$/)[1];
        }else{
            var pathname = "index"
        }

       

        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo">
                             
                        </div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[pathname]}
                            style={{ lineHeight: '64px' }}
                            onClick={({item,key,keypath})=>{
                                console.log
                                this.gotopage(key , item.props.url);
                            }}
                        >
                            <Menu.Item key="index" url="/">系统首页</Menu.Item>
                            <Menu.Item key="cars" url="/cars/list">买车卖车</Menu.Item>
                            <Menu.Item key="order" url="/order/add">订单管理</Menu.Item>
                            <Menu.Item key="yeji" url="/yeji/manage">销售业绩</Menu.Item>
                            <Menu.Item key="bb1" url="/yeji/manage">上牌服务</Menu.Item>
                            <Menu.Item key="bb2" url="/yeji/manage">汽车检测</Menu.Item>
                            <Menu.Item key="staff" url="/staff/modify">个人设置</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        {this.props.children}
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        二手车交易市场内部系统 - 版权所有 &copy;2017 技术支持：15386671927@163.com
                    </Footer>
                </Layout>
            </div>
        )
    }
}


export default connect(
    ({routing}) => ({
        routing
    })
)(App);