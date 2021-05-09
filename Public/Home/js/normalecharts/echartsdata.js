function request() {
console.log(__quoteapi);
    if (_dates.length <= 0) {
        $.ajax({
			url: __quoteapi,
            dataType: "json",
			data: "method=kmap&symbol=" + __symbol + "&period=" + __period + "&lasttick=0",
            success: function (data) {
                if (data.Code >= 0) {
                    console.log('1');
                    console.log(data.Obj);
                    fixdata(data.Obj);
                    render();
                }
            }
        });
    }
    else {
        $.ajax({
			url: __quoteapi,
            dataType: "json",
			data: "method=lstkmap&symbol=" + __symbol + "&period=" + __period + "&lasttick=" + _lstkticks,
            success: function (data) {
                if (data.Code >= 0) {
                    console.log('2');
                    console.log(data.Obj);
                    fixdata(data.Obj);
                }else{
                    //T
                    console.log('T');
                    var data2 = new Array();
                    var ss = new Array();
                    ss.A = data.A;
                    ss.C = data.P;//前当价格
                    ss.D = data.D;
                    ss.H = data.H;
                    ss.L = data.L;
                    ss.Tick = data.Tick;
                    ss.V = data.V;
                    data2[0] =ss;
                    fixdata(data2);
                }
                    render();
                
                /**                  
A: 0
C: 1.20345
D: "2021-05-05 11:15:00"
H: 1.2036
L: 1.2031
O: 1.20315
Tick: 1620184500
V: 534


                    
A: 8754.847
AVP: 1.20325
B1: 1.20325
B1V: 18
B2: 0
B2V: 0
B3: 0
B3V: 0
B4: 0
B4V: 0
B5: 0
B5V: 0
C: ""
D: "1620144000,1.20195,1.2033,1.20195,4124"
DT: 0
FS: "CMEEC"
H: 1.2033
H1: "1620183600,1.203,1.2033,1.203,515"
H2: "1620180000,1.2031,1.2033,1.2029,2089"
H4: "1620172800,1.2024,1.2033,1.20235,5110"
HD: 665267
HS: 0
IV: 3237
JS: 1.20215
L: 1.20195
LS: 0
M: "CME"
M1: "1620184920,1.20325,1.20325,1.20325,0"
M5: "1620184800,1.20325,1.2033,1.20325,73"
M10: "1620184800,1.20325,1.2033,1.20325,73"
M15: "1620184500,1.20315,1.2033,1.2031,154"
M30: "1620183600,1.203,1.2033,1.203,515"
N: "欧元"
NV: 4
O: 1.20195
OV: 4039
P: 1.20325
QJ: 0
QR: "20210614"
S: "EC"
S1: 1.2033
S1V: 9
S2: 0
S2V: 0
S3: 0
S3V: 0
S4: 0
S4V: 0
S5: 0
S5V: 0
S15: "1620184920,1.20325,1.20325,1.20325,0"
SJ: 0
SY: 0
SY2: 0
TS: "1620184886,1.20325,4,-1,4"
Tick: 1620184934
V: 7276
VF: 0.112
YC: 1.20215
YHD: 666538
YJS: 1.20765
Z: 0
Z2: 0
ZF: 0.092
ZS: 0
ZT: 0
**/

            }
        });
    }
}

function getDateStr(tick) {
    var ordate = new Date(tick * 1000);
    if (__period.indexOf("T") == 0 || __period.indexOf("1M") == 0) { return ordate.Format("MM-dd-hh:mm:ss"); }
	else if (__period.indexOf("5M") == 0) { return (ordate.Format("MM-dd-hh:") + PrefixInteger((Math.floor(ordate.getMinutes() * 1.0 / 5.0) * 5), 2)); }
	else if (__period.indexOf("10M") == 0) { return (ordate.Format("MM-dd-hh:") + PrefixInteger((Math.floor(ordate.getMinutes() * 1.0 / 10.0) * 10), 2)); }
    else if (__period.indexOf("15M") == 0) { return (ordate.Format("MM-dd-hh:") + PrefixInteger((Math.floor(ordate.getMinutes() * 1.0 / 15.0) * 15), 2)); }
    else if (__period.indexOf("30M") == 0) { return (ordate.Format("MM-dd-hh:") + PrefixInteger((Math.floor(ordate.getMinutes() * 1.0 / 30.0) * 30), 2)); }
	else if (__period.indexOf("1H") == 0 || __period.indexOf("2H") == 0 || __period.indexOf("4H") == 0) { return ordate.Format("MM-dd-hh:00"); }
    else return (new Date(tick * 1000)).Format("yyyy-MM-dd");
}

function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
function fixdata(datas) {
        console.log("fixdata length - "+datas.length);
        console.log("fixdata  ",datas);

    if (datas.length <= 0) {
        console.log("<= 0");
        return;
    }

    if (datas.length == 1) {
        console.log(" == 1");
        var dstr = getDateStr(datas[0].Tick);

        console.log(_dates[_dates.length - 1]+" ==  "+dstr);
        if (_dates.length > 0 && _dates[_dates.length - 1] == dstr) {//
        console.log("不变");
        return;
            if (datas[0].O <= 0) { datas[0].O = _data[_dates.length - 1][0]; }
            if (datas[0].L <= 0) { datas[0].L = _data[_dates.length - 1][2]; }
            if (datas[0].H <= 0) { datas[0].H = _data[_dates.length - 1][3]; }
            if (datas[0].V <= 0) { datas[0].V = _data[_dates.length - 1][4]; }
        }
        else {
               console.log(" == 1 else 变");
          //  return; 
            
        }
    }

    if (_dates.length > 0) {
        console.log("最小");
        //最小
        var dstr = getDateStr(datas[(datas.length - 1)].Tick);

        while (_dates[_dates.length - 1] >= dstr) {
            _dates.splice(_dates.length - 1);
            _data.splice(_data.length - 1);
            _datal.splice(_datal.length - 1);
            _volumes.splice(_volumes.length - 1);
        }
    }

    for (var i = (datas.length - 1); i >= 0; i--) {
     
        var d = datas[i];
        if (d.C <= 0)
            continue;

        var dstr = getDateStr(d.Tick);

        //倒数第二个做最后lst_k-tick
        if (i == 1) { _lstkticks = d.Tick; }

        /*不要用k线更新实时数据*/
        if (i <= 1 && typeof(setP) != "undefined") {
            setP(d.Tick, d.C, d.C, d.C,  0, 0, false);
        }
        _dates.push(dstr);
        _data.push([d.O, d.C, d.L, d.H, d.V]);
		_datal.push(d.C);
		_volumes.push([_volumes.length, d.V, (d.C >= d.O ? 1 : -1)]);
    }
    
        console.log(_dates);
        console.log(_data);
}

function render() {
    var dataMA5 = calculateMA(5, _data);
    var dataMA20 = calculateMA(20, _data);
    var dataMA30 = calculateMA(30, _data);

    //记录之前的状态
    if (_myChart && _myChart.getOption()) {
        _dzst = _myChart.getOption().dataZoom[0].start;
        _dzed = _myChart.getOption().dataZoom[0].end;
    }
    else {
		if (_dates.length < _stnum)
			_dzst = 0;
		else {
			_dzst = (_dates.length - _stnum) * 100 / _dates.length;
		}
		_dzed = 100;
    }

	option = createOption(__symbol, _mtype, _sets, __period, _dzst, _dzed, _dates, _data, _datal, _volumes, dataMA5, dataMA20, dataMA30);

    if (option && typeof option === "object") {
        _myChart.setOption(option, true);
    }

}

