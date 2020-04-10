Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}       

var num = 0;
var descriptions = ['开发页面','逻辑开发','测试联调','缺陷修复'];

var totleNum = 2;//填写天数
var beginDate = new Date("2020-04-05");//开始填写日期
var payDay = "1";
var workDes = descriptions[0];



var intervalNum = setInterval(singleFillBlank, 6000);

function singleFillBlank(){
	var dayStr = beginDate.getDay();
	if(dayStr !=6 && dayStr !=0 ){
		if(num < totleNum){
			var dateStr = beginDate.pattern("yyyy-MM-dd");
			$("#edit-cost > span").click();
			var timeOutNum = setTimeout(fillBlank,3000);
			function fillBlank(){
				var ifW = $("#tdialog-iframe").get(0).contentWindow;
				$(ifW.document.getElementById("TimesheetSpentdate")).val(dateStr);
				$(ifW.document.getElementById("TimesheetTimespent")).val(payDay);
				$(ifW.document.getElementById("TimesheetMemo")).val(workDes);
				$("#tdialog-buttonwrap > a.btn.btn-primary > span").click();
				num ++;
				window.clearTimeout(timeOutNum);
			}
		}else {
			window.clearInterval(intervalNum);
		}
	}
	var temp = beginDate.getTime();
	temp  += 1000 * 60 * 60 * 24;
	beginDate = new Date(temp);
	
}

