
//var oTable;
$(function () {

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});

function change(){
    $(".dropdown-menu>li").click(function(){
        $(".change").html($(this).html())
    })
}

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
//            paginationFirstText: "首页",
//            paginationPreText: "上一页",
//            paginationNextText: "下一页",
//            paginationLastText: "末页",
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            singleSelect: false,
            uniqueId: "orderID",                     //每一行的唯一标识，一般为主键列
            maintainSelected :true, //3,开启分页保持选择状态，就是用户点击下一页再次返回上一页
            classes: "table table-bordered table-striped table-sm table-dark",
            //
            toolbar:'#toolbar',//工具栏
            toolbarAlign:'right',//工具栏的位置
            showRefresh:true,
            search:true,
//            searchOnEnterKey:false, //******回车后执行搜索****
            customSearch:"customSearch",//自定义搜索，比如只搜索ID字段
//            showFullscreen:true, //显示全屏按钮
            detailView:true,//开启详情视树形图模式
            detailFormatter:"detailFormatter", //2，定义详情显示函数
            detailViewIcon:false,//3，隐藏图标列
            detailViewByClick:true,//4,隐藏图标列
            showToggle:true,
            iconSize:"sm",   // 1,设置修改图标  sm小图标 lg大图标
            onToggle:function(cardView)
            { 
//              alert(JSON.stringify(cardView));
            },
            rowStyle:function(row,index){
            	if(row.state == 0)
            		return {css:{"background-color":"#eaeaea"}}
            	else return {css:{}}
            },
            showColumns:true,
//            detaiFormatter:'detailFormatter',
            //
            showExport: true,
            exportDataType: 'all',
            exportTypes:[ 'csv', 'txt','excel', 'xlsx'], //导出文件类
//            exportDataType: "all",//导出表格方式（默认basic：只导出当前页的表格数据；all：导出所有数据；selected：导出选中的数据）
//            buttonsAlign:"right",  //按钮位置
//            exportTypes:['excel'],  //导出文件类型
            Icons:'glyphicon-export',
            exportOptions:{
                //ignoreColumn: [0,1],  //忽略某一列的索引
                fileName: '订单信息',  //文件名称设置
                worksheetName: 'sheet1',  //表格工作区名称
                tableName: '总台帐报表',
                excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
//                onMsoNumberFormat: DoOnMsoNumberFormat
            },
            //
            contentType: "application/x-www-form-urlencoded",
            columns: [
            	{
            		checkbox: "true",
                    field: 'check',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'orderID',
                    visible:false
                },
                {
                    title: "订单号",
                    field: 'orderNum',
                    align: 'center',
                    valign: 'middle',
                    width:120
                },
                {
                    title: "房型",
                    field: 'layoutName',
                    align: 'center',
                    valign: 'middle',
                    width:100
                },
                {
                    title: "历史房型",
                    field: 'describe',
                    align: 'center',
                    width: 100,
                    valign: 'middle',
//                    visible:false,
                },
                {
                    title: "房号",
                    field:'roomPlate',
                    align: 'center',
                    valign: 'middle',
                    width:40
                },
                {
                    title: "创建时间",
                    field: 'date',
                    align: 'center',
                    searchable:false,
                    valign: 'middle',
                    width:80,
                    formatter: function (value, row, index) {
                    	var date = new Date(value);
                    	return date.Format("yyyy-MM-dd");
                    }
                },
                {
                    title: '入住时间',
                    field: 'fromDate',
                    titleTooltip:'客户预定的入住时间',
                    align: 'center',
                    width:80,
                    searchable:false,
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	var date = new Date(value);
                    	return date.Format("yyyy-MM-dd");
                    }
                },
                {
                    title: "退房时间",
                    field: 'toDate',
                    titleTooltip:'客户预定的退房时间',
                    align: 'center',
                    width:80,
                    searchable:false,
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	var date = new Date(value);
                    	return date.Format("yyyy-MM-dd");
                    }
                },
                {
                    title: "单价元/晚",
                    field: 'price',
                    align: 'center',
                    width: 60,
                    valign: 'middle',
//                    visible:false,
                },
                {
                    title: "应收金额/元",
                    field: 'charge',
                    align: 'center',
                    width: 60,
                    valign: 'middle',
//                    visible:false,
                },
                {
                    title: "实际收取",
                    field: 'realCharge',
                    align: 'center',
                    valign: 'middle',
                    searchable:false,
                    width:60
                },
                {
                    title: "状态",
                    field: 'state',
                    align: 'left',
                    width: 60,
                    valign: 'middle',
                    searchable:false,
                    formatter: function (value, row, index) {
                    	if(value == 1) return '<a href="javascript:void(0)" class="btn btn-success btn-xs" style="" title="已完成">已完成</a>';//<i class="fa fa-caret-down"></i>
                    	if(value == 0) return '<a href="javascript:void(0)" class="btn btn-default btn-xs disabled" style="background:#eaeaea;" title="已取消">已取消</a>';//<i class="fa fa-caret-up"></i>
                    	return value;
                    }
                }
            ],
            onEditableSave: function (field, row, oldValue, $el) {
            	if(oldValue == row[field]) return;
                $.ajax({
                    type: "post",
                    url: "editOrder",
                    data: JSON.stringify(row),
                    dataType: 'JSON',
                    contentType: 'application/json',
//                    content-type:"application/json charset=utf-8",
                    success: function (data) {
                        if (data.status) {
                        }else{
                        	alert(data.message);
                        }
                    },
                    error: function () {
                        alert('编辑失败');
                        $el.val(oldValue);
                    },
                    complete: function () {

                    }

                });
            }
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
    	var type = $("#type-select").find("option:selected").data("name");
    	var state = $("#state-select").find("option:selected").data("name");
    	var other = $("#other-select").find("option:selected").data("name");
    	var text = $.trim($("#other-input").val());
    	var time = $("#time-select").find("option:selected").data("name");
    	var start = $.trim($("#datetimepicker1").val());
    	var end = $.trim($("#datetimepicker2").val());
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            offset: params.offset  //页码     
        };
        if(type == "reception" || type == "internet") temp.type = type;
        if(state == "finish" || state == "cancel") temp.state = $("#state-select").find("option:selected").data("value");
        if(text != ''){
        	switch(other){
        	case 'orderNum':temp.orderNum = text;break;
        	case 'plate':temp.plate = text;break;
        	case 'people':temp.people = text;break;
        	case 'employee':temp.employee = text;break;
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
	"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

//function detailFormatter(index, row) {
//	var table = '<table class="table table-condensed" style="">'+
//       '<caption style="text-align: center;">订单细节</caption>'+
//        '</table>';
//	var html = [];
//	html.push('<p><b>创建时间:</b> ' + new Date(row.date).Format("yyyy-MM-dd HH:mm:ss") + '</p>');
//	html.push('<p><b>创建人:</b> ' + (row.dealID == null ? "会员" : "前台") + '</p>');
//	html.push('<p><b>描述:</b> ' + (row.describe == null ? "无" : row.describe) + '</p>');
//	html.push('<p><b>前台入住时间:</b> ' + (row.inDate == null ? "未入住" : new Date(row.inDate).Format("yyyy-MM-dd HH:mm:ss")) + '</p>');
//	html.push('<p><b>前台退房时间:</b> ' + (row.outDate == null ? "未退房" : new Date(row.outDate).Format("yyyy-MM-dd HH:mm:ss")) + '</p>');
//	if(row.state == 0) html.push('<p><b>取消时间:</b> ' + (row.cancelDate == null ? "--" : new Date(row.dealDate).Format("yyyy-MM-dd HH:mm:ss")) + '</p>');
//	 $.ajax({
//        url: 'orderAllDetails',
//        async: false,
//        type: "post",
//        data: {"orderID":row.orderID},
//        success: function (data) {
//     	   if(data.status){
//     			  html.push(JSON.stringify(data.order));
//     	   }else{
//     		   html.push(data.message);
//     	   }
//        },
//        error:function(){
//        	html.push("请求服务器失败");
//        }
//      });
//    return html.join('');
//  }
function detailFormatter(index, row) {
	var html = [];
	if(row.state == 0) html.push('<table class="table graytable" style="">')
	else html.push('<table class="table mytable" style="">')
	 $.ajax({
        url: 'orderAllDetails',
        async: false,
        type: "post",
        data: {"orderID":row.orderID},
        success: function (data) {
     	   if(data.status){
//     			html.push(JSON.stringify(data.order));
     		   var order = data.order;
     		   html.push('<tr><th>订单号</th><td>'+order.orderNum +'</td><th>创建人</th><td>')
     		   html.push(order.dealID == null ? order.memName + '(会员' + order.memNum + ')' : order.dealName + '(' + order.dealNum + ')')
     		   html.push('</td><th>创建时间</th><td>')
     		   html.push(new Date(order.date).Format("yyyy-MM-dd HH:mm:ss"))
     		   html.push('</td><th>房型</th><td>')
//     		   html.push(order.layoutName)
     		   html.push(order.describe)//历史房型
     		   html.push('</td><th>房号</th><td>' + order.roomPlate + '</td></tr>')
     		   html.push('<tr><th>入住时间</th><td>')
               html.push(new Date(order.fromDate).Format("yyyy-MM-dd"))
               html.push('</td><th>退房时间</th><td>')
               html.push(new Date(order.toDate).Format("yyyy-MM-dd"))
               html.push('</td><th>单价（元/晚）</th><td>')
               html.push(order.price + '</td><th>应收金额/元</th><td>' + order.charge + '</td><th>实际收取/元</th><td>'+order.realCharge +'</td></tr>') 
               if(order.plus != null && order.plus != ''){
            	   html.push('<tr><th>备注</th><td colspan="9">' + order.plus + '</td></tr>')
               }
               if(order.persons != null && order.persons.length > 0){
            	    html.push('<tr><th colspan="2">入住人</th><th colspan="2">身份证号</th><th colspan="2">入住时间</th><th>办理人</th><th colspan="2">退房时间</th><th>办理人</th></tr>')
            	   $.each(order.persons, function (index, value){
            		  html.push('<tr><td colspan="2">' + value.name + '</td><td colspan="2">' + value.idCard + '</td><td colspan="2">')
            		  if(value.inDate != null){
            			  html.push(new Date(value.inDate).Format("yyyy-MM-dd HH:mm:ss") + '</td><td>')
            		      html.push(value.inName + '(' + value.inNum + ')</td><td colspan="2">')
            		  }else{
            			  html.push('未入住</td><td>无</td><td colspan="2">')
            		  }
            		  if(value.outDate != null){
            			  html.push(new Date(value.outDate).Format("yyyy-MM-dd HH:mm:ss") + '</td><td>')
            		      html.push(value.outName + '(' + value.outNum + ')</td>')
            		  }else{
            			  html.push('未退房</td><td>无</td>')
            		  }
            		  
            		  html.push('</tr>')
            	   })
               }else{
            	   html.push('<tr><td colspan="10">没有入住人信息</td></tr>');
               }
     		   if(order.state == 0){
     	    	   html.push('<tr><td></td><td></td><th>取消人</th><td>' + order.cancelName + '</td><th>取消时间</th><td>' + new Date(order.cancelDate).Format("yyyy-MM-dd HH:mm:ss") + '</td><td></td><td></td><td></td><td></td></tr>')
     	       }
     		   
     	   }else{
     		   html.push(data.message);
     	   }
        },
        error: function(){
        	html.push("请求服务器失败");
        }
      });
	html.push('</table>')
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
        //初始化页面上面的按钮事件
    	$(".batdel-btn").on("click",function(){
    		batchDelete();
//    	    var rows = $('#table').bootstrapTable('getSelections');
//            alert(JSON.stringify(rows));
    	})
    	
    	$('#other-input').bind('keypress',function(e){
    		 e = e || window.event;
    	 	    key = e.keyCode || e.which || e.charCode;
    	 	    if (key == 13) {
    	 	       $('#table').bootstrapTable('selectPage', 1,'refresh');
    	 	    }		
//    		$("#table").bootstrapTable('refresh');
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

    	$("#search-btn").on("click",function(){
    		$('#table').bootstrapTable('selectPage', 1,'refresh');
//    		$("#table").bootstrapTable('refresh');
    	})
    	
//    	$('#search-input').bind('keypress',function(event){
////    		$("#table").bootstrapTable('refresh');
//    		$('#table').bootstrapTable('selectPage', 1,'refresh');
//        });
//    	
    	
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
    	
    	
    };

    return oInit;
};


function batchDelete(){
	var data = $('#table').bootstrapTable('getAllSelections');
	if(data.length <= 0) return;
	var ids=[];//如果你想获得每个选中行的ID,如下操作
	var info = "";
	for(var i=0;i<data.length;i++){
	  ids.push(data[i].orderID);
	  info += data[i].orderNum + "[" +data[i].state +"]\n";
	}
	if(confirm("确定删除这" + data.length + "条数据吗\n" + info)){
		$.ajax({
            type: "post",
            url: "deleteOrder",
            data: {'ids':ids},
            dataType: 'JSON',
            success: function (data) {
                if (data.status) {
                	$("#table").bootstrapTable('refresh');
                }else{
                	alert(data.message);
                }
            },
            error: function () {
                alert('删除失败');
            },
            complete: function () {

            }

        });
	};
}