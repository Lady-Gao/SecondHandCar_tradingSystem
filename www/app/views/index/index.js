import React from 'react';
import { Layout, Menu, Breadcrumb, Icon , Row , Col} from 'antd';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
import {connect} from "dva";
import {push} from 'react-router-redux';

import App from "../../containers/App.js";

class Index extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount(){
		var tb1 = echarts.init(this.refs.tb1);
		var tb2 = echarts.init(this.refs.tb2);

		tb1.setOption({
		    title: {
		        text: '近半年汽车销售量（单位：万辆）'
		    },
		    tooltip: {},
		    legend: {
		        data:['销量']
		    },
		    xAxis: {
		        data: []
		    },
		    yAxis: {},
		    series: [{
		        name: '销量',
		        type: 'bar',
		        data: []
		    }]
		});

        // 使用刚指定的配置项和数据显示图表。
        $.get('/tb1' , function (data) {
		    // 填入数据
		    tb1.setOption({
		        xAxis: {
		            data: data.categories
		        },
		        series: [{
		            // 根据名字对应到相应的系列
		            name: '销量',
		            data: data.data
		        }]
		    });
		});



		tb2.setOption({
		    title: {
		        text: '自定义雷达图'
		    },
		    legend: {
		        data: ['图一','图二', '张三', '李四']
		    },
		    radar: [
		        {
		            indicator: [
		                { text: '指标一' },
		                { text: '指标二' },
		                { text: '指标三' },
		                { text: '指标四' },
		                { text: '指标五' }
		            ],
		            center: ['25%', '50%'],
		            radius: 120,
		            startAngle: 90,
		            splitNumber: 4,
		            shape: 'circle',
		            name: {
		                formatter:'【{value}】',
		                textStyle: {
		                    color:'#72ACD1'
		                }
		            },
		            splitArea: {
		                areaStyle: {
		                    color: ['rgba(114, 172, 209, 0.2)',
		                    'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
		                    'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
		                    shadowColor: 'rgba(0, 0, 0, 0.3)',
		                    shadowBlur: 10
		                }
		            },
		            axisLine: {
		                lineStyle: {
		                    color: 'rgba(255, 255, 255, 0.5)'
		                }
		            },
		            splitLine: {
		                lineStyle: {
		                    color: 'rgba(255, 255, 255, 0.5)'
		                }
		            }
		        },
		        {
		            indicator: [
		                { text: '语文', max: 150 },
		                { text: '数学', max: 150 },
		                { text: '英语', max: 150 },
		                { text: '物理', max: 120 },
		                { text: '化学', max: 108 },
		                { text: '生物', max: 72 }
		            ],
		            center: ['75%', '50%'],
		            radius: 120
		        }
		    ],
		    series: [
		        {
		            name: '雷达图',
		            type: 'radar',
		            itemStyle: {
		                emphasis: {
		                    // color: 各异,
		                    lineStyle: {
		                        width: 4
		                    }
		                }
		            },
		            data: [
		                {
		                    value: [100, 8, 0.40, -80, 2000],
		                    name: '图一',
		                    symbol: 'rect',
		                    symbolSize: 5,
		                    lineStyle: {
		                        normal: {
		                            type: 'dashed'
		                        }
		                    }
		                },
		                {
		                    value: [60, 5, 0.30, -100, 1500],
		                    name: '图二',
		                    areaStyle: {
		                        normal: {
		                            color: 'rgba(255, 255, 255, 0.5)'
		                        }
		                    }
		                }
		            ]
		        },
		        {
		            name: '成绩单',
		            type: 'radar',
		            radarIndex: 1,
		            data: [
		                {
		                    value: [120, 118, 130, 100, 99, 70],
		                    name: '张三',
		                    label: {
		                        normal: {
		                            show: true,
		                            formatter:function(params) {
		                                return params.value;
		                            }
		                        }
		                    }
		                },
		                {
		                    value: [90, 113, 140, 30, 70, 60],
		                    name: '李四',
		                    areaStyle: {
		                        normal: {
		                            opacity: 0.9,
		                            color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
		                                {
		                                    color: '#B8D3E4',
		                                    offset: 0
		                                },
		                                {
		                                    color: '#72ACD1',
		                                    offset: 1
		                                }
		                            ])
		                        }
		                    }
		                }
		            ]
		        }
		    ]
		})
	}

	 
	render() {
		 
		return (
			<App>
				<br/>
				<br/>
                <Row>
                	<Col span={18} offset={3}>
                		<Row>
                			<Col span={11}>
                				<div ref="tb1" style={{"width": "100%","height":"300px"}}></div>
                			</Col>
                			<Col span={11} offset={2}>
                				<div ref="tb2" style={{"width": "100%","height":"300px"}}></div>
                			</Col>
                		</Row>
                		<Row>
                			<Col span={11}>
                				<div ref="tb3" style={{"width": "100%","height":"300px"}}></div>
                			</Col>
                			<Col span={11} offset={2}>
                				<div ref="tb4" style={{"width": "100%","height":"300px"}}></div>
                			</Col>
                		</Row>
                	</Col>
                </Row>
			</App>
		);
	}
}


export default connect(
	({routing})=>({
		routing
	})
)(Index)