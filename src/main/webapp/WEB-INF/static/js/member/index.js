/*banner*/
var banner=new change();
	banner.position=function(){
		change().position.call(this);
		if(this.data["position_style"]=="banner"){
			var h=$(this.data["element"]+":eq("+this.data["index"]+")").height();
			$(this.data["element_move"]).css({"height":h+"px"});
			$(this.data["element"]).removeClass("in").css({"left":-this.data["position_width"]+"px"});
			$(this.data["element"]+":eq("+this.data["index"]+")").addClass("in").css({"left":"0px"});
		}
	}
	banner.todo=function(data){
		var bool=change().todo.call(this,data);
		if(!bool)return false;
		if(this.data["position_style"]=="banner"){
			
			var direc=-1;
			if(data["direc"]=="-")direc=1;
			
			var h=$(this.data["element"]+":eq("+this.data["index"]+")").height();
			$(this.data["element_move"]).css({"height":h+"px"});
			
			$(this.data["element"]+":eq("+this.data["lastindex"]+")").stop(false,true).removeClass("in").animate({"left":direc*this.data["position_width"]+"px"},500);
			$(this.data["element"]+":eq("+this.data["index"]+")").stop(false,true).addClass("in").css({"left":-direc*this.data["position_width"]+"px"}).animate({"left":"0px"},500,function(){banner.data["todo_bool"]=false;});
			
		}
	}
	banner.init({
		"parent_move_element":".banner",
		"element":".banner .content",
		"position_style":"banner",
		"autoplay":true,
		"autoplay_time":6000,
		"btn":'<div class="child"></div>',
		"btn_function":"banner",
		"btn_parent":".banner .banner-nav"
	});
	
	Date.prototype.Format = function (fmt) { //author: meizz
		var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor(this.getMonth() + 3 / 3), //季度
		"S": this.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};
	
	var date = new Date();
    if(date.getHours() <= 12){
        date.setDate(date.getDate() - 1)
    }
    $('#datetimepicker3').val(date.Format("yyyy-MM-dd"));
    date.setDate(date.getDate() + 1);
    $('#datetimepicker4').val(date.Format("yyyy-MM-dd"));
	
	
	$(function (){
		var formerFrom;
		var formerTo;
		Date.prototype.Format = function (fmt) { //author: meizz
			var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"H+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor(this.getMonth() + 3 / 3), //季度
			"S": this.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		};

	    $("#datetimepicker3").on("click",function(e){
	        e.stopPropagation();
	        $(this).lqdatetimepicker({
	            css : 'datetime-day',
	            dateType : 'D',
	            selectback : function(){
	            	var curFrom = new Date($("#datetimepicker3").val());
	            	var toString = $("#datetimepicker4").val();
	            	if(toString == "" || curFrom.getTime() < new Date(toString).getTime()){
	            		$("#datetimepicker3").val(curFrom.Format("yyyy-MM-dd"));
	            		formerFrom = curFrom;
	            	}else{
	            		$("#datetimepicker3").val(formerFrom.Format("yyyy-MM-dd"))
	            	}
	            	
	            }
	        });
	    });    
	    $("#datetimepicker4").on("click",function(e){
	        e.stopPropagation();
	        $(this).lqdatetimepicker({
	            css : 'datetime-day',
	            dateType : 'D',
	            selectback : function(){
//	            	var dateString = new Date($("#datetimepicker4").val()).Format("yyyy-MM-dd");
//	            	$("#datetimepicker4").val(dateString);
	            	var curTo = new Date($("#datetimepicker4").val());
	            	var fromString = $("#datetimepicker3").val();
	            	if(fromString == "" || curTo.getTime() > new Date(fromString).getTime()){
	            		$("#datetimepicker4").val(curTo.Format("yyyy-MM-dd"));
	            		formerTo = curTo;
	            	}else{
	            		$("#datetimepicker4").val(formerTo.Format("yyyy-MM-dd"))
	            	}
	            }
	        });
	    });
	    $("#search-btn").on("click",function(e){
	        var from = new Date($("#datetimepicker3").val());
	        var to = new Date($("#datetimepicker4").val());
	        if (from.getTime() == to.getTime()){
	            console.log('时间不能一样');
	            return;
	        }
	        if (from.getTime() > to.getTime()){
	            console.log("退房时间不能早于入住时间");
	            return;
	        }
	        
	        window.location.href = "hotel-reservation?from=" + $("#datetimepicker3").val() + "&to=" + $("#datetimepicker4").val();
	    });
	})