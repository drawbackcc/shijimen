$(function (){
	
	var status = 0;
	var pageSize = 10;
	var page = 1;
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
	
	function getComment(curPage, pageSize){
		status = 1;
	   // alert("");
	    var layoutID = $("#comment-div").data("id");
	    console.log("layoutID:" + layoutID +",curPage:" + curPage + ",pageSize:" + pageSize);
	    $.ajax({
            url:'../getComments',
            type:'POST',
            data:{'layoutID':layoutID, "curPage":curPage, "pageSize":pageSize},
            success:function (data) {
            	$(".comment .container .infos ul").empty();
            	$(".comment .container .infos page").empty();
            	page = data.curPage;
            	var html = "";
            	$.each(data.comments,function(idx,obj){
            		//alert(obj.tagName);
            		html += '<li><p class="user">' + obj.memName + '</p> <p class="time">' + new Date(obj.commDate).Format("yyyy-MM-dd") + '</p><p class="txt"> ' + obj.comment + '</p>';
            		if(obj.reply != null){
            			html += '<p class="reply">' + obj.reply + '</p>';
            		}
            		html += '</li>';
            	});
            	$(".comment .container .infos ul").html(html);
            	html = '<a href="javascript:void(0);" class="prev">&lt;&lt;</a>';
            	var pages = Math.ceil(data.total / data.pageSize);
            	//console.log("pages:" + pages);
            	if(pages > 10){
            		//没写完
            		for(var i = 1; i <=5; i ++){
            			html += '<a href="javascript:void(0);" class="page-c">2</a>';
            		}
            	}else{
            		for(var i = 1; i <= pages; i ++){
            			if(i != data.curPage){html += '<a href="javascript:void(0);" class="page-c">' + i + '</a>';}
            			else{html += '<a href="javascript:void(0);" class="page-c on">' + i + '</a>';}
            		}
            	}
            	html += '<a href="javascript:void(0);" class="next">&gt;&gt;</a>';
            //	console.log(html);
            	$(".comment .container .infos .page").html(html);
            	bindClickOnPage();
            },
            error:function(data){
            	alert("error");
            }
        });
	    
	}
	
	function bindClickOnPage(){
		$(".comment .container .infos .page a").on("click", function(e){
    		console.log("e.target.textContent:" + e.target.textContent);//在jQuery使用ajax后$(this)失效
    		//e.target.classList.add("on");
    		var curPage = 1;
    		console.log("page:" + page);
    		if($(this).hasClass("prev")){//点击上一页
    			console.log("点击上一页");
    			if(page <= 1) return;
    			curPage = page - 1;
    			console.log(curPage);
    		}
    		if($(this).hasClass("next")){//点击
    			console.log("点击下一页");
    			curPage = page + 1;
    			console.log(curPage);
    		}
    		if($(this).hasClass("page-c")){ 
    			console.log("点击页数");
    			curPage = e.target.textContent;
    			console.log(curPage);
    			//getComment(curPage, pageSize);
    		}
    		console.log("curPage:" + curPage);
    		getComment(curPage, pageSize);
    	});
	}
	

    $(".intro-link").css({"background": "#ea5706","color":"#fff"});
    $(".com-link").css({"background": "#f5f5f5","color":"#999"});
    $(".intro-link").on("click",function (e) {
        $("#introduce-div").show();
        $("#comment-div").hide();
        $(".intro-link").css({"background": "#ea5706","color":"#fff"});
        $(".com-link").css({"background": "#f5f5f5","color":"#999"});
    });
    $(".com-link").on("click",function (e) {
        $("#introduce-div").hide();
        $("#comment-div").show();
        $(".com-link").css({"background": "#ea5706","color":"#fff"});
        $(".intro-link").css({"background": "#f5f5f5","color":"#999"});
        if(status == 0){
        	getComment(1, pageSize);
        }
    });
    

    var from = new Date($("#datetimepicker3").val());
    var to = new Date($("#datetimepicker4").val());
    
    function setInfoWithDateChange(){
    	var days=(new Date($("#datetimepicker4").val()) - new Date($("#datetimepicker3").val()))/(1*24*60*60*1000);
    	$("#total-price").empty();
    	$("#total-price").text("共" + days +"晚，" + (days * $("#total-price").data("price")) + "元");
    }

    $("#datetimepicker3").on("click",function(e){
        e.stopPropagation();
        $(this).lqdatetimepicker({
            css : 'datetime-day',
            dateType : 'D',
            selectback : function(){
            	var dateString = new Date($("#datetimepicker3").val()).Format("yyyy-MM-dd");
            	var date = new Date(dateString);
            	if(date >= new Date($("#datetimepicker4").val())){
            		$("#datetimepicker3").val(from.Format("yyyy-MM-dd"));
            	}else{
            		$("#datetimepicker3").val(dateString);
            		from = date;
            	}
            	setInfoWithDateChange();
            }
        });
    });   
    $("#datetimepicker4").on("click",function(e){
        e.stopPropagation();
        $(this).lqdatetimepicker({
            css : 'datetime-day',
            dateType : 'D',
            selectback : function(){
            	var dateString = new Date($("#datetimepicker4").val()).Format("yyyy-MM-dd");
            	var date = new Date(dateString);
            	//console.log(date);
            	if(date <= new Date($("#datetimepicker3").val())){
            		$("#datetimepicker4").val(to.Format("yyyy-MM-dd"));
            	}else{
            		$("#datetimepicker4").val(dateString);
            		to = date;
            	}
            	setInfoWithDateChange();
            }
        });
    });
    $("#datetimepicker3").on("change",function(e){//当前对象属性改变，并且是由键盘或鼠标事件激发的（脚本触发无效）
        setInfoWithDateChange();
    });
    $("#datetimepicker4").on("change",function(e){//当前对象属性改变，并且是由键盘或鼠标事件激发的（脚本触发无效）
        setInfoWithDateChange();
    });
    $('.reservation .info .txt dt').click(function(event) {
        $(this).siblings().slideToggle()
    });

    $('.reservation .info .txt dd').each(function(index, el) {
        $(this).click(function(event) {
            var h = $(this).html();
            $(this).parent().hide();
            //alert(h)
            $('.reservation .info .txt dt em').html(h)
        });
    });
    
    function httpPost(URL, PARAMS) {//原生js通过虚拟表单通过post向后台请求页面
	    var temp = document.createElement("form");
	    temp.action = URL;
	    temp.method = "post";
	    temp.style.display = "none";
	    console.log(PARAMS)
//	    for (var x in PARAMS) {
//	        var opt = document.createElement("textarea");
//	        opt.name = x;
//	        opt.value = PARAMS[x];
////	        opt.name = x.name
////	        opt.value = x.value
//	        temp.appendChild(opt);
//	    }
	    document.body.appendChild(temp);
	    temp.submit();
//	    return temp;
	}
    
    function httpPost2(URL, from, to, layoutID) {//原生js通过虚拟表单通过post向后台请求页面
	    var temp = document.createElement("form");
	    temp.action = URL;
	    temp.method = "post";
	    temp.style.display = "none";

        var opt1 = document.createElement("textarea");
        opt1.name = 'from';
        opt1.value = from;
        temp.appendChild(opt1);
        var opt2 = document.createElement("textarea");
        opt2.name = 'to';
        opt2.value = to;
        temp.appendChild(opt2);
        var opt3 = document.createElement("textarea");
        opt3.name = 'layoutID';
        opt3.value = layoutID;
        temp.appendChild(opt3);
        
	    document.body.appendChild(temp);
	    temp.submit();
//	    return temp;
	}
    
	$("#book-btn").on("click", function(e){
		//或许加个日期检查，不搞了
//		var layoutID = $("#comment-div").data("id");
//		var params = {
//		        "layoutID": $("#comment-div").data("id"),
//		        "from": $("#datetimepicker3").val(),
//		        "to": $("#datetimepicker4").val()
//		       };
//		httpPost("../isDetail01Quritied", params);
		$.ajax({
            url:'../isDetail01Quritied',
            type:'POST',
//            data:{'layoutID':$("#comment-div").data("id"), "from":$("#datetimepicker3").val(), "to":$("#datetimepicker4").val()},
            data:{},
            success:function (result) {
            	if(result.status){
//            		window.location.href="../hotel-reservation-detail01";
//            		var params = []
//            		params.push({name: 'from', value: $("#datetimepicker3").val()})
//            		params.push({name: 'to', value: $("#datetimepicker4").val()})
//            		params.push({name: 'layoutID', value: $("#comment-div").data("id")})
//            		params.push({from: $("#datetimepicker3").val()})
//            		params.push({to: $("#datetimepicker4").val()})
//            		params.push({layoutID: $("#comment-div").data("id")})
//            		console.log(params)
//            		httpPost("../hotel-reservation-detail01?from=" + $("#datetimepicker3").val() + "&to=" + $("#datetimepicker4").val() + "&layoutID=" + $("#comment-div").data("id"), params);
            		httpPost2("../hotel-reservation-detail01", $("#datetimepicker3").val(), $("#datetimepicker4").val(), $("#comment-div").data("id"))
            	}else{
            		alert(result.message);
            	}
            },
            error:function(data){
            	alert("error");
            }
        });
		
		
	});

});