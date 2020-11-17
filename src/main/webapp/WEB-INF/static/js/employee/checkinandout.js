
//var oTable;
$(function () {

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();
    
    $('#addModal').draggable();
    $('#payModal').draggable();
    
    $("input").attr("autocomplete", "off");//禁止所有input自填重

});

function change(){
    $(".dropdown-menu>li").click(function(){
        $(".change").html($(this).html())
    })
}

var myelement;

var toDateElement;

var payelement;

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#table').bootstrapTable({
            url: "orderData",        //请求后台的URL（*）
            method: 'post',                      //请求方式（*）
            dataType: "json",
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            singleSelect: false,
            uniqueId: "orderID",                     //每一行的唯一标识，一般为主键列
            maintainSelected :true, //3,开启分页保持选择状态，就是用户点击下一页再次返回上一页
            detailView:true,//开启详情视树形图模式
            detailFormatter:"detailFormatter", //2，定义详情显示函数
            detailViewIcon:false,//3，隐藏图标列
//            clickToSelect: true,                //是否启用点击选中行
//            singleSelect: true,
            detailViewByClick:true,
            contentType: "application/x-www-form-urlencoded",
            onLoadSuccess:function(data){
                if(!data.status){
                	alert(data.message);
                }
            },
            columns: [
                {
                    field: 'orderID',
                    visible:false
                },
                {
                    title: "房型",
                    field: 'layoutName',
                    align: 'center',
                    valign: 'middle',
                    width:60
                },
                {
                    title: "房号",
                    field:'roomPlate',
                    align: 'center',
                    valign: 'middle',
                    width:40
                },
                {
                    title: '入住时间',
                    field: 'fromDate',
                    titleTooltip:'客户预定的入住时间',
                    align: 'center',
                    width:100,
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	var date = new Date(value);
                    	return date.Format("yyyy-MM-dd") //+ " " + getDayOfWeek(date.getDay());
                    }
                },
                {
                    title: "退房时间",
                    field: 'toDate',
                    titleTooltip:'客户预定的退房时间',
                    align: 'center',
                    width:100,
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	var date = new Date(value);
                    	return date.Format("yyyy-MM-dd")
                    },
                    editable: {
                        type: 'date',
                        title:"提前退房",
//                        template:"yyyy-mm-dd",
                        format:"yyyy-mm-dd",
                        viewformat:"yyyy-mm-dd",
                        pk:"1",
                        placement:"right",
                        validate: function (value) { 
//                            console.log("验证:" + value); 
//                            return value;
                        },
                    },
                },
                {
                    title: "天数",
                    field: 'toDate',
                    align: 'center',
                    width:40,
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	var from = new Date(row.fromDate).Format("yyyy-MM-dd");
                    	var to = new Date(row.toDate).Format("yyyy-MM-dd");
                    	//var days=(new Date($("#datetimepicker4").val()) - new Date($("#datetimepicker3").val()))/(1*24*60*60*1000);
                    	return (new Date(to) - new Date(from))/(1*24*60*60*1000);
                    }
                },
                {
                    title: "金额",
                    field: 'realCharge',
                    align: 'center',
                    valign: 'middle',
                    width:60
                },
                {
                    title: "来源",
                    align: 'center',
                    width: 40,
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	if(row.dealID != null) return '<button class="btn btn-info btn-xs" style="">前台</button>';
                    	if(row.memID != null && row.dealID == null) return '<button class="btn btn-warning btn-xs" style="">网上</button>';
                    	return '--'
                    }
                },
                {
                    title: "状态",
                    align: 'center',
                    width: 100,
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	html = [];
                    	if(row.payState == 1) html.push('<button class="btn btn-success btn-xs" name="" style="margin-right:5px;">已付款</button>');
                    	else html.push('<button class="btn btn-danger btn-xs" name="not-pay-btn" style="margin-right:5px;">未付款</button>');
                    	if(row.inDate != null) html.push('<button class="btn btn-success btn-xs" name="checkin-btn" data-id="' + row.orderID + '" style="margin-right:5px;">已入住</button>');
                    	else html.push('<button class="btn btn-secondary btn-xs" name="checkin-btn" data-id="' + row.orderID + '" style="margin-right:5px;">未入住</button>');
                    	if(row.outDate != null) html.push('<button class="btn btn-warning btn-xs" name="checkout-btn" data-id="' + row.orderID + '" style="margin-right:5px;">已退房</button>');
                    	else html.push('<button class="btn btn-secondary btn-xs" name="checkout-btn" data-id="' + row.orderID + '" style="margin-right:5px;">未退房</button>');
                    	return html.join('');
                    },
                    events: {
                      	 'click button[name=not-pay-btn]': function (e, value, row, index) {//点击添加入住
                      		$("#payModal .modal-title").text(row.layoutName + row.roomPlate)
                      		$("#payModal input[name=charge]").val(row.charge)
                      		$("#payModal input[name=real-charge]").val(row.realCharge)
                      		$("#payModal #pay-submit").data("id", row.orderID)
                      		payelement = e
                      		$('#payModal').modal('show')
                      	 },
                    },
                },
                {
                    title: "操作",
                    align: 'center',
                    width: 120,
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	return '<button name="btn1" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#addModal" style="margin-right:5px;">添加入住</button>' +
                    //	'<button name="btn2" class="btn btn-info btn-xs" data-toggle="modal" data-target="#opraModal" style="margin-right:5px;">入住办理</button>' +
                    	'<button name="btn3" class="btn btn-warning btn-xs" style="margin-right:5px;">取消订单</button>' +
                    	'<button name="btn4" class="btn btn-default btn-xs" data-toggle="popover" data-placement="auto" data-delay="1000" title="订单号'+
                    	row.orderNum +'" style="margin-right:5px;">其它</button>';
                    },
                    events: {
                   	 'click button[name=btn1]': function (e, value, row, index) {//点击添加入住
                   		myelement = e;
                   		 $("#addModal .modal-title").html(row.layoutName + '  ' + row.roomPlate);
                   		 $("#addModal caption").html(new Date(row.fromDate).Format("yyyy-MM-dd") + "  至   " + new Date(row.toDate).Format("yyyy-MM-dd"));
                   		 $("#addModal input[type=hidden]").data("oid", row.orderID);
                   		 $('#addModal tbody tr').each(function(i){                   // 遍历 tr
                   		      var tr = $('#addModal tbody tr').eq(i);
                   		      if(tr.find("input").is(":disabled")){
                   		    	  tr.remove();//删除已经提交完成的数据
                   		      }
                   		  });
                   		 
                   	 },
              	'click button[name=btn3]': function (e, value, row, index) {
              		console.log('是否展开'+$(e.target).closest('tr').next().find('table').is('.mytable'))
              		
          		       if(confirm("确认取消" + new Date(row.fromDate).Format("yyyy-MM-dd") + "  至   " + new Date(row.toDate).Format("yyyy-MM-dd") + "在" + row.layoutName + "(" + row.roomPlate + ")的订单吗\n该操作不可逆")){
          		    	 var ids=[];
          		    	 ids.push(row.orderID);
          		    	 $.ajax({
          		            type: "post",
          		            url: "cancelOrders",
          		            data: {'ids':ids},
          		            dataType: 'JSON',
          		            success: function (data) {
          		                if (data.status) {
          		                	console.log(data.status + data.message);
          		                	//这里有个bug，当上面的行展开详细视图时index错乱
//          		                	$('#table tr:eq('+(index + 1)+')').find('button[name=btn1]').remove();
//          		                	$('#table tr:eq('+(index + 1)+')').find('button[name=btn3]').text("订单已取消");
//          		                	$('#table tr:eq('+(index + 1)+')').find('button[name=btn3]').addClass("btn-danger");
//          		                	$('#table tr:eq('+(index + 1)+')').find('button').attr("disabled","disabled");
//          		                	 $(this).removeClass("btn-warning");
//          		                	 $(this).addClass("btn-danger");
//          	          		    	 $(this).text("已   取   消");
//          	          		    	 $(this).attr("disabled","disabled");
//          	          		    	 $(this).prev().attr("disabled","disabled");
//          	          		    	 $(this).prev().prev().attr("disabled","disabled");
          		                	$(e.target).removeClass("btn-warning");
          		                	$(e.target).addClass("btn-danger");
          		                	$(e.target).text("订单已取消");
          		                	$(e.target).attr("disabled","disabled");
          		                	$(e.target).prev().remove();
//          		                	$(e.target).next().attr("disabled","disabled");
          		                	$(e.target).parent().prev().find("button").attr("disabled","disabled");
          		                	$(e.target).parent().prev().prev().find("button").attr("disabled","disabled");
//          		                	console.log('是否展开'+$(e.target).closest('tr').next().find('table').is('.mytable'))
          		                	if($(e.target).closest('tr').next().find('table').is('.mytable')){
          		              			$(e.target).closest('tr').next().find('table').css("background","#eaeaea")
          		              		$(e.target).closest('tr').next().find('table').find('button').attr("disabled","disabled")
          		              		}
          		                }else{
          		                	alert(data.message);
          		                }
          		            },
          		            error: function () {
          		                alert('删除失败');
          		            }
          		        });//ajax
          		       }
          	     },
                    }//event
                }
            ],//column
            onEditableSave: function (field, row, oldValue, $el) {
            	console.log("field:" + field + '   oldValue:' + oldValue)
            	console.log("oldValue" + new Date(oldValue).Format("yyyy-MM-dd"))
            	console.log("newValue" + new Date(row.toDate).Format("yyyy-MM-dd"))
            	console.log($el)
            },//onEditableSave
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
    	var type = $("#type-select").find("option:selected").data("name");
    	var other = $("#other-select").find("option:selected").data("name");
    	var text = $.trim($("#other-input").val());
    	var time = $("#time-select").find("option:selected").data("name");
    	var start = $.trim($("#datetimepicker1").val());
    	var end = $.trim($("#datetimepicker2").val());
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            offset: params.offset,  //页码   
            state: 1,
            fromSite:'checkinout',
        };
        if(type == "reception" || type == "internet") temp.type = type;
        if(text != ''){
        	switch(other){
        	case 'orderNum':temp.orderNum = text;break;
        	case 'plate':temp.plate = text;break;
        	case 'people':temp.people = text;break;
        	}
        }
        switch(time){
        case 'date':
        	if(start != '') temp.startDate = new Date(start);
        	if(end != '') temp.endDate = new Date(end);
        	break;
        case 'from':
        	if(start != '') temp.fromDate = new Date(start);
        	if(end != '') temp.toDate = new Date(end);
        	break;
        }
        return temp;
    };
    return oTableInit;
};

Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
};

Date.prototype.Format = function (fmt) { //author: meizz
	var o = {
	"M+": this.getMonth() + 1, //月份
	"d+": this.getDate(), //日
	"H+": this.getHours(), //小时
	"m+": this.getMinutes(), //分
	"s+": this.getSeconds(), //秒
	"q+": Math.floor(this.getMonth() + 3 / 3), //季度
	"S": this.getMilliseconds(), //毫秒,
	
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

function getDayOfWeek(day){
	if(day == 0) return "周日";
	if(day == 1) return "周一";
	if(day == 2) return "周二";
	if(day == 3) return "周三";
	if(day == 4) return "周四";
	if(day == 5) return "周五";
	if(day == 6) return "周六";
	
}

function detailFormatter(index, row) {
	var html = [];
//	html.push('<p><b>订单号</b>' + row.orderNum + '</p>');
	html.push('<table class="mytable" style="width:80%"><tr style=""></tr>');
	$.ajax({
	        url: 'orderPersons',
	        async: false,
	        type: "post",
	        data: {"orderID":row.orderID},
	        success: function (data) {
	     	   if(data.status){
	     		  $.each(data.contacts, function (index, value) {
	     			 html.push('<tr><td colspan="4"><b>联系人</b>:' + value.name + value.phone + value.ps + '</td><tr>')
	     		  })
	     		 $.each(data.persons, function (index, value) {
	     			html.push('<tr>');
	     			html.push('<td>' + value.name + '</td>');
	     			html.push('<td>' + value.idCard + '</td>');
	     			if(value.inDate != null){
	     				html.push('<td><p name="aready-checkin-btn" class="p" data-id="'+value.personID+'">已入住' + new Date(value.inDate).Format("yyyy-MM-dd HH:mm:ss") + '</p></td>');
	     			}else{
	     				html.push('<td><button name="deal-checkin-btn" class="btn btn-primary btn-xs" data-id="'+value.personID+'">办理入住</button></td>');
	     			}
	     			if(value.outDate != null){
	     				html.push('<td><p name="aready-checkout-btn" class="p" data-id="'+value.personID+'">已退房' + new Date(value.outDate).Format("yyyy-MM-dd HH:mm:ss") + '</p></td>');
	     			}else{
	     				html.push('<td><button name="deal-checkout-btn" class="btn btn-primary btn-xs" data-id="'+value.personID+'">办理退房</button></td>');
	     			}
	     			html.push('</tr>');
	     		 });
	     		 if(data.persons == null || data.persons.length <= 0){
	     			 html = []
	     			 html.push('没有入住人信息')
	     			 return html.join('')
	     		 }
	     	   }
	        }
	      });
	html.push('</table>');
    return html.join('');
  }

function  customSearch(data, text) {
    return data.filter(function (row) {
      return (row.layoutName+"").indexOf(text) > -1
    })
}

var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
    	
    	$("#table").on('click-row.bs.table', function (e, row, ele,field) {
//             console.log("click" + row.roomPlate);
//             $(e.target).addClass("bg-primary");
        })

    	//搜索框回车
    	$('#other-input').bind('keypress',function(e){
    		 e = e || window.event;
    	 	    key = e.keyCode || e.which || e.charCode;
    	 	    if (key == 13) {
    	 	       $('#table').bootstrapTable('selectPage', 1,'refresh');
    	 	    }		
        });
    	
    	$("#other-input").hover(function(){
    	   $(this).focus();
       },function(){
//    	   $(this).blur();
       })
       
       $("select").hover(function(){
    	   $(this).focus();
       },function(){
//    	   $(this).blur();
       })
       
       $("#addModal input").hover(function(){
    	   $(this).focus();
       },function(){
//    	   $(this).blur();
       })
       
       $("#payModal input").hover(function(){
    	   $(this).focus();
       },function(){
       })
        //点击查询
    	$("#search-btn").on("click",function(){
    		$('#table').bootstrapTable('selectPage', 1,'refresh');
//    		$("#table").bootstrapTable('refresh');
    	})
    	
    	$('#datetimepicker1').datetimepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,//周一开始
            minView : 2,//显示到月和日
            autoclose:true,//选完自动关闭
            language:'zh-CN',
            todayHighlight:true,//高亮当前日期
         });
    	
    	$('#datetimepicker2').datetimepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,//周一开始
            minView : 2,//显示到月和日
            autoclose:true,//选完自动关闭
            language:'zh-CN',
            todayHighlight:true,//高亮当前日期
        });
    	//点击添加行
    	$("#addModal button[name=add-line-btn]").on("click", function(){
    		console.log("add line");
    		$("#addModal tbody").append('<tr>'+
                      ' <td><input type="checkbox"></td>'+
                      ' <td><input type="text" name="name" autocomplete="off" class="form-control"></td>'+
                       '<td><input type="text" name="idcard" autocomplete="off" class="form-control"></td>'+
                      ' <td><button name="add-person-btn" class="btn btn-primary btn-xs">添加</button>&nbsp;'+
                       '<button name="add-person-btn2" class="btn btn-primary btn-xs">立即入住</button></td>'+
                    '</tr>');
    		$("#addModal input").hover(function(){
    	    	   $(this).focus();
    	       },function(){
//    	    	   $(this).blur();
    	       })
    	})
    	//点击移除行
    	$("#addModal button[name=remove-line-btn]").on("click", function(){
    		$("#addModal input[type=checkbox]:checked").each(function(i){//把所有被选中的复选框的值存入数组
			    n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
	            $("#addModal tbody").find("tr:eq("+n+")").remove();
	        });
    		$("button[name=remove-line-btn]").hide();
    	})
    	//点击添加huo立即入住
    	$("#addModal tbody").on("click", "button", function(){
    		var tr = $(this).parent().parent();
    		var oid = $("#addModal input[type=hidden]").data("oid");
    	    var list = []; 
    	    var name = tr.find("input[name=name]").val();
    	    var idcard = tr.find("input[name=idcard]").val();
    	    if($.trim(name) == '' || $.trim(idcard) == null) return;
    		if($(this).attr("name") == 'add-person-btn'){//点击添加  		
//    			console.log('是否展开'+$(myelement.target).closest('tr').next().find('table').is('.mytable'))
      	        list.push({orderID: oid,  name: name, idCard: idcard});
      	        if(addPerson(list)){
      	        	tr.find("input").attr("disabled","disabled");
        			tr.find("button").attr("disabled","disabled");
        			$(this).removeClass("btn-primary");
        			$(this).addClass("btn-success");
        			$(this).text("添加成功");
        			$(this).next().remove();
        			updateTable(list);
      	        }else{
      	        	alert("添加失败");
      	        }
      	        
    		}
    		if($(this).attr("name") == 'add-person-btn2'){//点击立即入住
//    			console.log('是否展开'+$(myelement.target).closest('tr').next().find('table').is('.mytable'))
    			list.push({orderID: oid,  name: name, inDate: new Date(), idCard: idcard});
      	        if(addPerson(list)){
      	        	tr.find("input").attr("disabled","disabled");
        			tr.find("button").attr("disabled","disabled");
        			$(this).removeClass("btn-primary");
        			$(this).addClass("btn-success");
        			$(this).text("添加入住成功");
        			$(this).prev().remove();
        			updateTable(list);
      	        }else{
      	        	alert("添加失败");
      	        }
    		}
    	})
    	//点击多选框
    	$("#addModal tbody").on("click", "input[type=checkbox]", function(){
    		console.log("2");
    		if($(this).is(":checked")) $("button[name=remove-line-btn]").show();
    		else{
    			if($("#addModal tbody input[type=checkbox]:checked").length <= 0)
    			   $("button[name=remove-line-btn]").hide();
    		}
    	})
    	//点击全部添加
    	$("#addModal button[name=add-all-btn]").on("click", function(){
    		var oid = $("#addModal input[type=hidden]").data("oid");
    	    var list = []; 
    	    var trs = [];
    	    var name ;
    	    var idcard;
//    	    console.log('是否展开'+$(myelement.target).closest('tr').next().find('table').is('.mytable'))
    	    $('#addModal tbody tr').each(function(i){                   // 遍历 tr
     		      var tr = $('#addModal tbody tr').eq(i);
     		      name = $.trim(tr.find("input[name=name]").val());
     		      idcard = $.trim(tr.find("input[name=idcard]").val());
     		      if(!tr.find("input").is(":disabled") && name != '' && idcard != null){
     		    	 list.push({orderID: oid,  name: name, idCard: idcard});
     		    	 trs.push(tr);
     		      }
     		  });
    	    if(list.length > 0){
    	    	if(addPerson(list)){
    	    		$.each(trs, function(index, value){
    	    			value.find("input").attr("disabled","disabled");
        			    value.find("button").attr("disabled","disabled");
        			    value.find("button[name=add-person-btn]").remove();
        			    value.find("button[name=add-person-btn2]").addClass("btn-success");
        			    value.find("button[name=add-person-btn2]").text("添加成功");
    	    		})
    	    		updateTable(list);
    	    	}else{
    	    		alert("添加失败");
    	    	}
    	    }
    	})
    	//点击全部添加入住
    	$("#addModal button[name=all-checkin-btn]").on("click", function(){
    		console.log('是否展开'+$(myelement.target).closest('tr').next().find('table').is('.mytable'))
    		var oid = $("#addModal input[type=hidden]").data("oid");
    		var date = new Date();
    	    var list = []; 
    	    var trs = [];
    	    var name ;
    	    var idcard;
    	    $('#addModal tbody tr').each(function(i){                   // 遍历 tr
     		      var tr = $('#addModal tbody tr').eq(i);
     		      name = $.trim(tr.find("input[name=name]").val());
     		      idcard = $.trim(tr.find("input[name=idcard]").val());
     		      if(!tr.find("input").is(":disabled") && name != '' && idcard != null){
     		    	 list.push({orderID: oid,  name: name, inDate: date, idCard: idcard});
     		    	 trs.push(tr);
     		      }
     		  });
    	    if(list.length > 0){
    	    	if(addPerson(list)){
    	    		$.each(trs, function(index, value){
    	    			value.find("input").attr("disabled","disabled");
        			    value.find("button").attr("disabled","disabled");
        			    value.find("button[name=add-person-btn]").remove();
        			    value.find("button[name=add-person-btn2]").addClass("btn-success");
        			    value.find("button[name=add-person-btn2]").text("添加入住成功");
    	    		})
    	    		updateTable(list);
    	    	}else{
    	    		alert("添加失败");
    	    	}
    	    }
    	})
    	
    	$("#table").on("click", "button[name=deal-checkin-btn]", function(){
    		var ids = [];
    		ids.push($(this).data("id"));
//    		console.log(checkInOrCheckOut(ids, 0));
    		if(checkInOrCheckOut(ids, 0)){
    			console.log("111111");
    			$(this).removeClass("btn-primary");
    			$(this).addClass("btn-success");
    			$(this).attr('name', 'aready-checkin-btn');
    			$(this).text("已入住" + new Date().Format("yyyy-MM-dd HH:mm:ss"));
        		$(this).closest('.mytable').parent().parent().prev().find('button').eq(2).text("已入住");
        		$(this).closest('.mytable').parent().parent().prev().find('button').eq(2).addClass("btn-success");
//    			console.log('---'+$(this).closest('.mytable').parent().parent().prev().find("button[name='deal-checkin-btn']").text())
//    			$(this).closest('.mytable').parent().parent().prev().find("button[name='deal-checkin-btn']").text('已入住')
    			
    		}
    		
//    		console.log("mytable父容器：" + $(this).closest('.mytable').parent().prop('nodeName'))//td
//    		console.log("mytable父容器：" + $(this).closest('.mytable').parent().parent().prop('nodeName'))//tr
//    		console.log("mytable父容器：" + $(this).closest('.mytable').parent().parent().prev().prop('nodeName'))//tr
    		
    	})
    	
    	$("#table").on("click", "button[name=deal-checkout-btn]", function(e){
    		var ids = [];
    		ids.push($(this).data("id"));
    		if(checkInOrCheckOut(ids, 1)){
    			console.log("111111");
    			$(this).removeClass("btn-primary");
    			$(this).addClass("btn-warning");
    			$(this).attr('name', 'aready-checkout-btn')
    			$(this).text("已退房" + new Date().Format("yyyy-MM-dd HH:mm:ss"));
//        		$(this).closest('.mytable').parent().parent().prev().find('button').text("---");
//    			console.log('----'+ $(this).closest('.mytable').parent().parent().prev().find('button[name=deal-checkout-btn]').text())
//    			$(this).closest('.mytable').parent().parent().prev().find('button[name=deal-checkout-btn]').text('已退房');
    			$(this).closest('.mytable').parent().parent().prev().find('button').eq(3).text("已退房");
    			$(this).closest('.mytable').parent().parent().prev().find('button').eq(3).addClass("btn-warning");
    		}
//    		$(this).parents("table:first").prev().find("button").attr("disabled","disabled");
//    		$(this).closest('.mytable').parent().parent().prev().find('button').each(function(index,element){
//    			console.log($(this).text())
//    		})
    		
    	})

    	$("#detail-view-btn").on("click", function(){
		   console.log("展开全部");
//		   $('#table').bootstrapTable('refresh');
		   // $('#table').bootstrapTable('selectPage', 1,'refresh');
		   $("#table").bootstrapTable('expandAllRows');
	   })
	   
	   $("#pay-submit").on("click", function(){
		   var orderID = $(this).data("id");
		   var realCharge = $("#payModal input[name=real-charge]").val();
		   console.log(orderID)
		   console.log(realCharge)
		   $.ajax({
         type: "post",
         url: "updateOrderPayState",
         data: {'orderID':orderID, 'realCharge': realCharge},
         dataType: 'JSON',
         success: function (data) {
             if (data.status) {
            	  $(payelement.target).text("已付款")
		   $(payelement.target).attr('name', '')
		   $(payelement.target).removeClass('btn-danger')
		   $(payelement.target).addClass('btn-success')
		   $('#payModal').modal('hide')
             }else{
            	 $('#payModal .modal-footer span').text(data.message)
             }
         },
         error: function () {
        	 $('#payModal .modal-footer span').text('请求服务器失败')
         }
     });// ajax
		  
	   })
    	
    };

    return oInit;
};

function checkInOrCheckOut(ids, type){
	 var flag = false;
 	 $.ajax({
         type: "post",
         async: false,//同步
         url: "checkInAndOut",
         data: {'ids':ids, 'type': type},
         dataType: 'JSON',
         success: function (data) {
        	 flag = data.status;
        	 console.log(flag);
             if (data.status) {
//            	 flag = true;
//             	alert(data.message);
             }else{
//             	alert(data.message);
             }
         },
         error: function () {
//             alert('删除失败');
         }
     });//ajax
 	 return flag;
}

function addPerson(list){
	var flag = false;
	$.ajax({
        url: 'addPersons',
        async: false,
        type: "post",
        dataType:"json",
        contentType : 'application/json;charset=utf-8',
        data: JSON.stringify(list),
        success: function (data) {
            if(data.status){
          	flag =true;
            }else{
          	  alert(data.message);
            }
        }
       });
	console.log("flag in ajax:" + flag);
	return flag;
}

function updateTable(list){
	if($(myelement.target).closest('tr').next().find('table').is('.mytable')){
		var table = $(myelement.target).closest('tr').next().find('table')
		$.each(list, function(index, value){
			$(table).append('<tr><td>' + value.name + '</td><td>' + value.idCard + '</td></tr>')
//			$(table).append('<tr><td>' + value.name + '</td><td>' + value.idCard + '</td></tr>').fadeIn(3000)
//			$(table).append('<tr class="newtr" style="display:none;"><td>' + value.name + '</td><td>' + value.idCard + '</td></tr>')
//		    $(".newtr").fadeIn(1000)
		    /*
		     * jquery append
               container.append( control ) ;
                          返回的是 container 本身. 而不是control
                           这点与dom的做法不同. */
		})
		
	}
}
