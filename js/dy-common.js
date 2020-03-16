var current = 0;
var $bannerBox = $(".banner-box");
var $bannerContent = $(".banner-content ul li");
var $bannerList = $(".banner-list ul");
var $bannerDirection = $(".banner-direction");
var $length = $bannerContent.length;
var timer;
var urlMonth = 'https://edu.telking.com/api/?type=month';
var urlWeek = 'https://edu.telking.com/api/?type=week';
window.onload = function(){
	var str = "";
	for(var i=0;i<$length;i++){
		if(i==0){
			str +="<li class='on'>"+(i+1)+"</li>";
		}else{
			str += "<li>"+(i+1)+"</li>";
		}
	}
	$bannerList.html(str);
	timer = setInterval(playGo,1000);
	//鼠标经过移开图片停止轮播，鼠标移开恢复轮播
	for(var k=0;k<$length;k++){
		$($bannerContent[k]).mouseover(function(){
			clearInterval(timer);
		});
		$($bannerContent[k]).mouseout(function(){
			timer = setInterval(playGo,1000);
		});
	}
	//鼠标经过移开next,prev停止轮播，鼠标移开恢复轮播
	for(var p=0;p<$bannerDirection.children().length;p++){
		$($bannerDirection.children()[p]).mouseover(function(){
			clearInterval(timer);
		});
		$($bannerDirection.children()[p]).mouseout(function(){
			timer = setInterval(playGo,1000);
		});
	}
	//鼠标经过分页器，进行切换图片
	for(var u =0;u<$length;u++){
		$($bannerList.children()[u]).mouseover(function(){
			clearInterval(timer);
			for(var j=0;j<$length;j++){
				$($bannerContent[j]).css('display','none')
				$($bannerList.children()[j]).removeClass('on');
			}
			$(this).addClass('on');
			$($bannerContent[$(this).text()-1]).css('display','block');
			current = $(this).text();
		});
		$($bannerList.children()[u]).mouseout(function(){
			timer = setInterval(playGo,1000);
		});
	}
	//点击prev事件
	$($bannerDirection.children()[0]).click( function(){
		directionBack();
	});
	//点击next事件
	$($bannerDirection.children()[1]).click(function(){
		playGo();
	});
	//获取曲线图数据
	monthData(urlMonth);
	//获取饼图和柱状图数据
	monthData(urlWeek);
}
//轮播方法
function playGo(){
	for(var j =0;j<$length;j++){
		$($bannerContent[j]).css('display','none');
		$($bannerList.children()[j]).removeClass('on');
	}
	if($length == current){
		current = 0;
	}
	$($bannerContent[current]).css('display','block');
	$($bannerList.children()[current]).addClass('on');
	current++;
}
//轮播后退方法
function directionBack(){
	for(var j =0;j<$length;j++){
		$($bannerContent[j]).css('display','none');
		$($bannerList.children()[j]).removeClass('on');
	}
	if(current == 0){
		current = $length;
	}
	$($bannerContent[current-1]).css('display','block');
	$($bannerList.children()[current-1]).addClass('on');
	current--;
}

//曲线图数据方法
function pageviewsFunc(xAxis,series) {
	var dom = document.getElementById("pageviews");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
	    title: {
	        text: '曲线图数据展示',
			x:'center',
	        y:'top',
	        top:'15px',
	        textAlign:'left'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            label: {
	                backgroundColor: '#f3f6fe'
	            }
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: [
	        {
	            type: 'category',
	            boundaryGap: false,
	            data:xAxis,
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            axisLabel: {
		            formatter: '{value} 人'
		        },
	        }
	    ],
	    series: [
	        {
	            name: '邮件营销',
	            type: 'line',
	            stack: '总量',
				areaStyle: {
					normal: {
						color: '#f3f6fe' //改变区域颜色
					}
				},
				itemStyle : {
					normal : {
						color:'#4586ef', //改变折线点的颜色
							lineStyle:{
							color:'#4586ef' //改变折线颜色
						}
					}
				},
	            data:series,
	        },
	    ]
	};
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
}
//饼图数据方法
function pieLeftFunc(data){
	var pieLeft = document.getElementById("pie_left");
	var myPieLeft = echarts.init(pieLeft);
	optionPie = {
	    title: {
	        text: '饼图数据展示',
	        left: 'center',
	        top:'35px'
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: '{a} <br/>{b} : {c} ({d}%)'
	    },
	    series: [
	        {
	            name: '访问来源',
	            type: 'pie',
	            radius: '55%',
	            center: ['50%', '60%'],
	            data: data,
	            emphasis: {
	                itemStyle: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	if (optionPie && typeof optionPie === "object") {
	    myPieLeft.setOption(optionPie, true);
	}
}

function pieRightFunc(xAxis,series) {
	var pieRight = document.getElementById("pie_right");
	var myPieRight = echarts.init(pieRight);
	optionPieRight = {
	    color: ['#3398DB'],
		title: {
	        text: '柱状图数据展示',
	        left: 'center',
	        top:'15px'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
	            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: xAxis,
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value'
	        }
	    ],
	    series: [
	        {
	            name: '直接访问',
	            type: 'bar',
	            barWidth: '60%',
	            data: series
	        }
	    ]
	};
	if (optionPieRight && typeof optionPieRight === "object") {
	    myPieRight.setOption(optionPieRight, true);
	}
}
//数据请求
function monthData(url){
	var url = url
	$.ajax({
	   type: "get",
	   url: url,
	   	success: function(res){
	   		if(res.code ==200) {
	   			if(url== 'https://edu.telking.com/api/?type=month'){
	   				pageviewsFunc (res.data.xAxis,res.data.series);
	   			} else {
	   				var data = [];
	   				for(var i in res.data.series) {
	   					data.push({value:res.data.series[i],name:res.data.xAxis[i]})
	   				}
	   				pieLeftFunc(data);
	   				pieRightFunc(res.data.xAxis,res.data.series)
	   			}
	   			
	   		} else {
	   			console.log(res);
	   		}
	   	},
		error: function (err) {    
	        console.log(err);
	    }   
	});
}
