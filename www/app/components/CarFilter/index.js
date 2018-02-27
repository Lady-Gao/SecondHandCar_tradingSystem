import React, { Component } from 'react';
import { Tabs, Slider, Row, Col, Menu, Dropdown, Button, Icon, message, Checkbox, Radio , DatePicker , Tag, Input, Tooltip} from 'antd';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import {connect} from "dva";
import classnames from "classnames";

import carBrandAndSeries from "./carBrandAndSeries.js";

import NowFilter from "./NowFilter.js";

import moment from "moment";


import "./carfilter.less";

class CarFilter extends Component {
    constructor(props){
        super();

        this.CHAR = "A";

        //调取默认数据
        props.dispatch({"type":"carlist/addorchangefilter"});
    }
    render() {
        const marks = {
            0: '0万',
            10: '10万',
            50: '50万',
            100: '100' 
        }

        //显示这个字母里面的车
        const showAList = (char) => {
            var arr = [];

            carBrandAndSeries[char].forEach((item)=>{
                arr.push(item.name)
            });

            return arr.map((item,index)=>{
                return <a 
                    key={index} 
                    href="javascript:;" 
                    className={classnames({"lineA" : true , "cur" : item == this.props.filter.brand})}
                    onClick={()=>{
                        //改变CHAR,目的是改变series
                        this.CHAR = char;
                        this.props.dispatch({"type":"carlist/addorchangefilter" , "name" : "brand" , "value" : item})
                    }}
                >
                    {item}
                </a>
            });
        }

        //显示车系
        const showSeries = () => {
            var ARR = [];

            carBrandAndSeries[this.CHAR].forEach(item=>{
                if(item.name == this.props.filter.brand){
                    for(let i = 0 ; i < item.series.length ;i++){
                        ARR.push(
                            <a 
                                href="javascript:;" 
                                key={i}
                                 className={classnames({"lineA" : true , "cur" : item.series[i].name == this.props.filter.series})}
                                onClick={()=>{this.props.dispatch({"type":"carlist/addorchangefilter" , "name" : "series" , "value" : item.series[i].name})}}
                            >
                                {item.series[i].name}
                            </a>
                        )
                    }
                }
            })
            return ARR;
        }

        //设置价格数组
        const setpricevalue = () =>{
            var a = 0;
            var b = 100;

            if(Array.isArray(this.props.filter.price)){
                a = this.props.filter.price[0];
                b = this.props.filter.price[1];
            }

            return [a , b];
        }

        //设置公里数数组
        const setkmvalue = () =>{
            var a = 0;
            var b = 100;

            if(Array.isArray(this.props.filter.km)){
                a = this.props.filter.km[0];
                b = this.props.filter.km[1];
            }

            return [a , b];
        }


        //设置购买日期的值
        const setbuydatevalue = () => {
            var arr = [];

            if(Array.isArray(this.props.filter.buydate)){
                arr = this.props.filter.buydate;
            }
            return arr;
        }

        return (
            <div className="carfilter">
                <div className="row">
                    <Row>
                        <Col span={2}>品牌：</Col>
                        <Col span={22}>
                            <Tabs defaultActiveKey="A">
                                {
                                    Object.keys(carBrandAndSeries).map((item,index)=>{
                                        return <TabPane tab={item} key={item}>
                                            {showAList(item)}
                                        </TabPane>
                                    })
                                }
                            </Tabs>
                        </Col>
                    </Row>
                </div>
                <div className="row">
                    <Row>
                        <Col span={2}>
                            车系：
                        </Col>
                        <Col span={22}>
                            {
                                showSeries()
                            }
                        </Col>
                    </Row>
                </div>
                <div className="row">
                    <Row>
                        <Col span={2}>价格：</Col>
                        <Col span={8}>
                            <Slider 
                                range 
                                marks={marks} 
                                defaultValue={setpricevalue()}
                                onAfterChange={(value)=>{
                                    this.props.dispatch({"type":"carlist/addorchangefilter" , "name" : "price" , value})
                                }}
                            />
                        </Col>
                        <Col span={2} offset={2}>公里数：</Col>
                        <Col span={8}>
                            <Slider 
                                range 
                                marks={marks} 
                                defaultValue={setkmvalue()}
                                onAfterChange={(value)=>{
                                    this.props.dispatch({"type":"carlist/addorchangefilter" , "name" : "km" , value})
                                }}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="row">
                    <Row>
                        <Col span={3}>
                            购买日期区间：
                        </Col>
                        <Col span={10}>
                            <RangePicker 
                                size={'default'}
                                value={setbuydatevalue()}
                                onChange={(value)=>{
                                    if(Array.isArray(value) && value.length == 2){
                                        this.props.dispatch({"type":"carlist/addorchangefilter" , "name" : "buydate" , value})
                                    }
                                }}
                                
                            />
                        </Col>
                    </Row>
                </div>
                <div className="row">
                    <Row>
                        <Col span={2}>
                            车型：
                        </Col>
                        <Col span={22}>
                            <CheckboxGroup 
                                options={[
                                    { label: '小型SUV', value: '小型SUV' },
                                    { label: '中型SUV', value: '中型SUV' },
                                    { label: '大型SUV', value: '大型SUV' },
                                    { label: 'A级轿车', value: 'A级轿车' },
                                    { label: 'B级轿车', value: 'B级轿车' },
                                    { label: 'C级轿车', value: 'C级轿车' }
                                ]}
                                onChange={(value)=>{
                                    if(value.length == 0){
                                        this.props.dispatch({"type":"carlist/delfilter" , "names" : ["type"] })
                                    }else{
                                        this.props.dispatch({"type":"carlist/addorchangefilter" , "name" : "type" , value})
                                    }
                                }}
                                value={this.props.filter.type}
                            >
                            </CheckboxGroup>
                        </Col>
                    </Row>
                </div>
                
                <div className="row">
                    <Row>
                        <Col span={2}>
                            颜色：
                        </Col>
                        <Col span={22}>
                            <CheckboxGroup 
                                options={[
                                    { label: '白', value: '白' },
                                    { label: '黑', value: '黑' },
                                    { label: '红', value: '红' },
                                    { label: '绿', value: '绿' },
                                    { label: '蓝', value: '蓝' },
                                    { label: '粉', value: '粉' },
                                    { label: '银灰', value: '银灰' },
                                    { label: '咖啡', value: '咖啡' },
                                    { label: '紫', value: '紫' },
                                    { label: '香槟', value: '香槟' },
                                    { label: '黄', value: '黄' },
                                    { label: '橙', value: '橙' }
                                ]}
                                onChange={(value)=>{
                                    if(value.length == 0){
                                        this.props.dispatch({"type":"carlist/delfilter" , "names" : ["color"] })
                                    }else{
                                        this.props.dispatch({"type":"carlist/addorchangefilter" , "name" : "color" , value})
                                    }
                                    
                                }}
                                value={this.props.filter.color}
                            >
                            </CheckboxGroup>
                        </Col>
                    </Row>
                </div>
                <div className="row">
                    <Row>
                        <Col span={2}>
                            排量：
                        </Col>
                        <Col span={22}>
                            <CheckboxGroup 
                                options={[
                                    { label: '1.0', value: '1.0' },
                                    { label: '2.0', value: '2.0' },
                                    { label: '3.0', value: '3.0' },
                                    { label: '4.0', value: '4.0' },
                                    { label: '5.0', value: '5.0' }
                                ]}
                                onChange={(value)=>{
                                    if(value.length == 0){
                                        this.props.dispatch({"type":"carlist/delfilter" , "names" : ["engin"] })
                                    }else{
                                        this.props.dispatch({"type":"carlist/addorchangefilter" , "name" : "engin" , value})
                                    }
                                }}
                                value={this.props.filter.engin}
                            >
                            </CheckboxGroup>
                        </Col>
                    </Row>
                </div>
                <div className="row">
                    <Row>
                        <Col span={2}>
                            座位数：
                        </Col>
                        <Col span={22}>
                            <CheckboxGroup 
                                options={[
                                    { label: '2', value: '2' },
                                    { label: '4', value: '4' },
                                    { label: '5', value: '5' },
                                    { label: '7', value: '7' },
                                    { label: '7+', value: '7+' }   
                                ]}
                                onChange={(value)=>{
                                    if(value.length == 0){
                                        this.props.dispatch({"type":"carlist/delfilter" , "names" : ["seat"] })
                                    }else{
                                        this.props.dispatch({"type":"carlist/addorchangefilter" , "name" : "seat" , value})
                                    }
                                    
                                }}
                                value={this.props.filter.seat}
                            >
                            </CheckboxGroup>
                        </Col>
                    </Row>
                </div>
                <div className="row">
                    <Row>
                        <Col span={2}>
                            变速箱：
                        </Col>
                        <Col span={22}>
                            <CheckboxGroup 
                                options={[
                                    { label: '手动挡', value: '手动挡' },
                                    { label: '自动挡', value: '自动挡' }  
                                ]}
                                onChange={(value)=>{
                                    
                                     if(value.length == 0){
                                        this.props.dispatch({"type":"carlist/delfilter" , "names" : ["gear"] })
                                    }else{
                                        this.props.dispatch({"type":"carlist/addorchangefilter" , "name" : "gear" , value})
                                    }
                                }}
                                value={this.props.filter.gear}
                            >
                            </CheckboxGroup>
                        </Col>
                    </Row>
                </div>
                
                <div className="row tags">
                    <Row>
                        <Col span={2}>
                            当前筛选：
                        </Col>
                        <Col span={22}>
                            <NowFilter></NowFilter>
                        </Col>
                    </Row>
                </div>
                
            </div>
        )
    }
}

export default connect(
    ({carlist : {filter}})=>({
        filter
    })
)(CarFilter);
