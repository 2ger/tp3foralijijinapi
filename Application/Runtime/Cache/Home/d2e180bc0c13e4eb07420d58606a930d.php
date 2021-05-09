<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html style="height: 100%">
<head>
	<meta charset="utf-8">
	<title>数据行情接口</title>
	<meta name="keywords" content="数据行情,股票行情,期货行情,外汇行情,CFD合约行情,数字货币行情,全推接口,行情接口,行情api" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
	<script type="text/javascript" src="/Public/Home/js/jquery-1.8.2.min.js"></script>
	<style>
		.corg {
			color: green;
			background-color: rgba(46,204,113,0.2)
		}

		.corn {
			color: #000;
			background-color: none
		}

		.corr {
			color: #eb4d5c;
			background-color: rgba(211,84,0,0.2)
		}

		.corg2 {
			color: green
		}

		.corn2 {
			color: #000
		}

		.corr2 {
			color: #eb4d5c
		}

		.s {
			font-weight: normal !important
		}

		.bgred {
			background-color: navajowhite;
			color: red
		}

		.bggreen {
			background-color: lightgreen;
			color: green
		}

		.bgnormal {
			color: #222
		}

		.bger {
			font-weight: bolder
		}

		.smer {
			font-weight: normal
		}

		body {
			font-size: 12px
		}

		a {
			text-decoration: none;
			color: #0064b9
		}

		.span {
			display: inline-block;
			border: solid 1px #ccc;
			width: 40px;
			height: 25px;
			line-height: 25px;
			padding-right: 2px;
			color: #000;
			cursor: pointer;
			background:#ddd;
		}

		.cur {
			background-color: #808080;
			color: #fff;
		}

		.rowwrap {
			width: 100%;
			display: table;
			overflow: hidden;
			padding-bottom: 15px;
			line-height: 35px
		}

		.rowhead {
			width: 100%;
			display: table-row;
			height: 35px;
			background-color: #dedede
		}

		.btnwhite {
			width: 60px;
			line-height: 25px;
			display: inline-block;
			background-color: #999;
			text-align: center;
			cursor: pointer;
			font-weight: bolder;
			color: #fff;
		}

		.btnblack {
			width: 60px;
			line-height: 25px;
			display: inline-block;
			background-color: #999;
			text-align: center;
			cursor: pointer;
			font-weight: bolder;
			color: #000;
		}

		.imgprice {
		}

		.row {
			width: 100%;
			display: table-row;
			height: 35px;
			border-bottom: solid 1px #cdcdcd
		}

		.cell {
			display: table-cell;
			width: 20%;
			display: inline-block;
			text-align: center;
			border-bottom: solid 1px #cdcdcd
		}
	</style>
</head>
<body style="height: 100%;margin:0;padding:0;margin:0">
	<!--<div style="line-height:30px;background-color:#fffbcc;color:#c60;">-->
	<!--    &nbsp;&nbsp;ECharts查询图表范例<span class="btnwhite" onclick="changeSet(1);">白色</span>&nbsp;<span class="btnblack" onclick="changeSet(0);">黑色</span></div>-->
	<div style="width:99%;border:solid 1px #ccc;display:block;">
		<div id="divperiod" style="width:100%;padding: 5px;display:inline-block;height:30px;text-align:center;background: #000;">
			<span class="span" v="T" lt="line">分时</span>
			<span class="span" v="1M">1分</span>
			<span class="span" v="5M">5分</span>
			<!--<span class="span" v="10M">10分</span>-->
			<span class="span cur" v="15M">15分</span>
			<span class="span" v="30M">30分</span>
			<span class="span" v="1H">时</span>
			<!--<span class="span" v="2H">2时</span>-->
			<!--<span class="span" v="4H">4时</span>-->
			<span class="span" v="D">日</span>
		</div>
		<div id="container" style="min-height:360px;"></div>
	</div>
	<script type="text/javascript" src="/Public/Home/js/echarts/echarts.min.js"></script>
	<script type="text/javascript" src="/Public/Home/js/normalecharts/echartsfunc.js?v=22"></script>
	<script type="text/javascript" src="/Public/Home/js/normalecharts/echartsdata.js?v=33333s3ss33r"></script>
	<script type="text/javascript">

		var ismobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
		//设置颜色，_set0为黑色，_setf为白色
		var _sets = _set0;

		var _dom = document.getElementById("container");
		_dom.style.height = (_sets.frametop + _sets.h + _sets.h2 + 30) + "px";
		var _myChart = echarts.init(_dom);


		//品种代码 按接口提供参数,自行填写默认值
		var __symbol = "BTC";
		//周期 1M,5M,15M,30M,1H,4H,D,W,M 按接口提供参数
		var __period = "15M";
		//本地web接口
		var __quoteapi = "kms";

		var _num = 300;
		//初始化柱数
		var _stnum = (ismobile ? 20 : 80);
		var _dzst = 30;
		var _dzed = 100;
		var _mtype = "candlestick";
		//查询频率毫秒
		var _interval = 1000*100;
	</script>
	<script type="text/javascript">
		var _dates = [];
		var _data = [];
		var _datal = [];
		var _volumes = [];

		var _timer1 = null;
		$(function () {
			//从get获取symbol参数
			var symbol = _getreq("symbol");
			if (symbol != undefined && symbol != "") {
				__symbol = symbol;
			}
			//从get获取period参数
			var period = _getreq("p");
			if (period != undefined && period != "") {
				__period = period;
			}

			if (__period == "1M")
				_mtype = "line";

			//其他功能
			$("#divperiod>span").click(function (e) {
				$(this).addClass("cur");
				$(this).siblings().removeClass("cur");
				changeperiod($(this).attr("v"), $(this).attr("lt"));
			});

			request();
			_timer1 = setInterval("timerDo()", _interval);
		});

		//设置颜色，_set0为黑色，_setf为白色
		function changeSet(t) {
			if (t == 0) { _sets = _set0; }
			else { _sets = _setf; }

			request();
		}

		function changeperiod(p, lt)
		{
			_dates = [];
			_data = [];
			_datal = [];
			_volumes = [];
			_lstkticks = 0;
			__period = p;

			if (__period == "T")
				_mtype = (lt == undefined ? "candlestick" : lt);
			else _mtype = "candlestick";

			request();
		}

		var _doingflag = false;
		function timerDo() {
			try {
				if (!_doingflag) {
					_doingflag = true;
					request();
				}
			}
			catch (e) { }
			_doingflag = false;
		}

		var _lstkticks = 0;

		//将报价数据同步到图表（比如列表里该品种的报价，要同步到图表价格，就调用这里）
		//注意：传入的k数据要和当前图表*周期*一致，如当前图表为5M,就不能传入日周期的开高低收报价
		//data是数组，结构如 [{Tick:当前k线的周期时间戳,O:100,H:100,L:100,C:100,V:100}] 
		function syncchart(sym, data) {
			if (sym == __symbol) {
				fixdata(data);
				render();
			}
		}
	</script>
</body>
</html>