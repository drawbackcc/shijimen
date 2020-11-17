//var oTable;
$(function () {
	
//	 var date = new Date();
//     date.setDate(date.getDate() - 1);
	 $('#addModal').draggable();
     var picker1 = $('#datetimepicker1').datetimepicker({
         format: 'yyyy-mm-dd',
         weekStart: 1,//周一开始
         minView : 2,//显示到月和日
         autoclose:true,//选完自动关闭
         language:'zh-CN',
         todayHighlight:true,//高亮当前日期
//         startDate: date,//设置最小时间
     });
     var picker2 = $('#datetimepicker2').datetimepicker({
         format: 'yyyy-mm-dd',
         weekStart: 1,
         minView : 2,
         autoclose:true,
         language:'zh-CN',
         todayHighlight:true,
     });
     

     var date = new Date();
     if(date.getHours() <= 12){
         date.setDate(date.getDate() - 1)
     }
     $('#datetimepicker1').datetimepicker('setDate', date);
     date.setDate(date.getDate() + 1);
     $('#datetimepicker2').datetimepicker('setDate', date);

     picker1.on('changeDate', function (e) {
         var date = new Date(e.date);
         date.setDate(date.getDate() + 1);
         $('#datetimepicker2').datetimepicker('setStartDate',date);//动态设置datetimepicker2的最小值， 不能小于等于datetimepicker1
     });
     picker2.on('changeDate', function (e) {
         var date = new Date(e.date);
         date.setDate(date.getDate() - 1);
         $('#datetimepicker1').datetimepicker('setEndDate',date);//动态设置datetimepicker1的最大值， 不能大于等于datetimepicker2
     });

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
            url: "layoutData",        //请求后台的URL（*）
            method: 'post',                      //请求方式（*）
            dataType: "json",
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: false,                   //是否显示分页（*）
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 100,                       //每页的记录行数（*）
            
            detailView:true,//开启详情视树形图模式
            detailFormatter:"detailFormatter", //2，定义详情显示函数
            uniqueId: "l_id",                     //每一行的唯一标识，一般为主键列
            contentType: "application/x-www-form-urlencoded",
            columns: [
                {
                    field: 'l_id',
                    visible:false
                },
                {
                    title: "房型名",
                    field: 'name',
                    align: 'center',
                    width: 180,
                    valign: 'middle'
                },
                {
                    title: '门市价',
                    field: 'price',
                    align: 'center',
                    width: 120,
                    valign: 'middle'
                },

                {
                    title: '空余房数',
                    field: 'availRoomNum',
                    align: 'center',
                    width: 120,
                    valign: 'middle'
                },

                {
                    title: '预定状态',
                    field: 'available',
                    width: 40,
                    align: 'center',
                    formatter: function (cellval, row) {
                        if (cellval){
                            return '<button class="btn btn-success btn-xs" style="" >有房</button>';
                        } else {
                            return '<button class="btn btn-danger btn-xs" style="" >已满</button>';
                        }}
                }
            ]
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            fromDate:$("#datetimepicker1").val(),
            toDate:$("#datetimepicker2").val(),
        };
        return temp;
    };
    return oTableInit;
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

var myelement;

var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
       $("#check-btn").on("click", function(){
    	   $("#table").bootstrapTable('refresh');
       })
       
       $("#check-btn2").on("click", function(){
    	   var date = new Date();
    	     if(date.getHours() <= 12){
    	         date.setDate(date.getDate() - 1)
    	     }
    	     $('#datetimepicker1').val(date.Format("yyyy-MM-dd"));
    	     date.setDate(date.getDate() + 1);
    	     $('#datetimepicker2').val(date.Format("yyyy-MM-dd"));
    	   $("#table").bootstrapTable('refresh');
       })
       
       $(".modal input.hover-focus").hover(function(){
    	   $(this).focus();
       },function(){
//    	   $(this).blur();
//    	   if($(this).attr('name') == 'idcard'){
//    		   if(!isCardNo($.trim($(this).val()))) $(this).next().text("格式不对");
//    		   else $(this).next().text("");
//    	   }
       })
       
       
       
       $(".modal textarea").hover(function(){
    	   $(this).focus();
       },function(){
//    	   $(this).blur();
       })
       
       $(".modal select").hover(function(){
    	   $(this).focus();
       },function(){
//    	   $(this).blur();
       })
       
       $("#add-new").on("click", function(){
    	   var html = '<tr class="person">'+
                       ' <td style="text-align: left"><input type="checkbox" name="checkbox" class="add-checkbox">姓名</td>'+
                        '<td style="text-align: left"><input class="form-control" name="name" type="text" autocomplete="off"></td>'+
                        '<td>身份证号</td>'+
                        '<td style="text-align: left"><input class="form-control" name="idcard" type="text" autocomplete="off"></td>'+
                    '</tr>';
    		$(".modal-body .add-tbody").append(html);
    		 $(".modal input").hover(function(){
    	    	   $(this).focus();
    	       },function(){
//    	    	   $(this).blur();
    	     })
    	})
    	
    	$("#add-remove").on("click", function(){
    		 $("#addModal input[name='checkbox']:checked").each(function(i){//把所有被选中的复选框的值存入数组
    			    n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
    	            $(".add-tbody").find("tr:eq("+n+")").remove();
    	        });
    	})
       
    	//点击房号按钮
       $("#table").on("click","button[name=book-plate-btn]",function(){
    	   var rid = $(this).data("rid");
//    	   var lid = $(this).data("lid");
//    	   var rowindex = $(this).data("rowindex");
    	   myelement = this;
    	   console.log("rowrowrow:")
    	   $(myelement).closest('tr').prev().find('td').each(function(index, element){
    		   console.log($(this).text())
    	   })
		     $.ajax({
		         url: 'layoutDetail',
		         async: false,
		         type: "post",
		         data: {"layoutID":$(this).data("lid"), "fromDate":$("#datetimepicker1").val(), "toDate":$("#datetimepicker2").val()},
		         success: function (data) {
		      	   if(data.status){
		      		 $(".modal-title").text(data.layout.name);
		      		 $("#book-submit").data("lid", data.layout.l_id);
		      		 $("#book-submit2").data("lid", data.layout.l_id);
				     $(".modal-body input[name=layout]").val(data.layout.name);
				     $("#datetimepicker3").val($("#datetimepicker1").val());
			    	 $("#datetimepicker4").val($("#datetimepicker2").val());
			    	 var days=(new Date($("#datetimepicker4").val()) - new Date($("#datetimepicker3").val()))/(1*24*60*60*1000);
			    	 $("#datetimepicker4").next().text(days);
				     $("input[name=charge]").val(data.layout.price * days);
				     $("input[name=charge]").next().text(data.layout.price);
				     $("input[name=real-charge]").val(data.layout.price * days);
				     $(".modal-footer span").text("");
//				     $("#book-submit").data("rowindex", rowindex);
//				     $("#book-submit2").data("rowindex", rowindex);
				     $("#plate-select").empty();
		      		  $.each(data.rooms, function (index, value) {
		      			 if(!value.booked){
		      				 $("#plate-select").append('<option value="' + value.r_id + '">' + value.plate + '</option');
		      			 }
		      		  });  
		      		$("#plate-select").val(rid);
		      	   }else{
		      		 var row = $("#table").bootstrapTable('getRowByUniqueId',$(this).data("lid"));
		      		   alert(row.name + "的信息在此期间可能已被更改，请刷新");
		      	   }
		         }
		         
		       });
	   })//点击房号按钮结束
	   
	   //点击预约按钮
	   $("#book-submit").on("click", function(){
//		   submitOrder(false, $(this).data("rowindex"));
		   submitOrder(false, $(this).data("lid"))
	   })
	   //点击立即入住按钮
	   $("#book-submit2").on("click", function(){
//		   submitOrder(true,$(this).data("rowindex"));
		   submitOrder(true, $(this).data("lid"))
	   })
	   
	   $("#detail-view-btn").on("click", function(){
		   console.log("展开全部");
		   $("#table").bootstrapTable('expandAllRows');
	   })
    	
    };

    return oInit;
};

function isCardNo(card) { 
	 var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
	 return pattern.test(card); 
}

//function submitOrder(checkin, rowindex){
function submitOrder(checkin, layoutID){
	console.log("所在行---" )
	var checkIn = checkin;
	var persons = [];
	$(".add-tbody tr.person").each(function(trindex,tritem){
		 persons.push({name: $(this).children('td').eq(1).find("input[name=name]").val(), idCard:$(this).children('td').eq(3).find("input[name=idcard]").val()});
    })
//    console.log(persons);
	var order = {
			describe: $(".add-tbody tr input[name=layout]").val(),
			roomID: $("#plate-select").val(),
			roomPlate: $("#plate-select option:selected").text(),
			fromDate: $("#datetimepicker3").val(),
			toDate: $("#datetimepicker4").val(),
			charge: $(".add-tbody tr input[name=charge]").val(),
			realCharge: $(".add-tbody tr input[name=real-charge]").val(),
			price: $(".add-tbody tr span.price").text(),
			memNum: $(".add-tbody tr input[name=member]").val(),
			plus: $(".add-tbody tr textarea").val(),
			persons: persons,
			checkIn: checkin,
			layoutID: layoutID
	};
	$.ajax({
        type: "post",
        url: "addOrder",
        data: JSON.stringify(order),
        dataType: 'JSON',
        contentType : 'application/json;charset=utf-8',
        success: function (data) {
            if (data.status) {
//            	$("#table").bootstrapTable('refresh');
            	$(".modal-title").text("该订单已于" + new Date().Format("yyyy-MM-dd HH:mm:ss") + "提交成功");
            	$(".modal-footer span").text("该订单已提交成功");
            	$("#addModal").modal('hide'); 
            	var btn = $("button[data-rid=" + $("#plate-select").val() + "]");
            	btn.removeClass("btn-success");
            	btn.addClass("btn-secondary");
            	btn.attr("name","booked-plate-btn");
            	var lid = $("#book-submit").data("lid");
            	var row = $("#table").bootstrapTable('getRowByUniqueId', lid);
            	var num = row.availRoomNum - 1;
            	
            	$(myelement).closest('tr').prev().find('td').eq(3).text(num)
            	if(num <= 0){
            		$(myelement).closest('tr').prev().find('button').text('已满')
            		$(myelement).closest('tr').prev().find('button').addClass('btn-danger')
            	}
            	
//            	 $('#table').bootstrapTable('updateRow', {//可以在这里全部更新
//            	        index: rowindex, 
//            	        row: {
//            	           availRoomNum: num,
//            	        }
//            	 }); 
//            	 updateRowAvailableNum(rowindex, num);//用updaterow整个表都会刷新一遍
            	
//            	console.log($('#table tr:eq('+trindex+') td:eq(2)').text());
//            	console.log($('#table tr:eq('+trindex+') td:eq(2)').html());
//            	
//            	var trindex = rowindex + 1;
//            	$('#table tr:eq('+trindex+') td:eq(3)').text(num);
//            	if(num <= 0) 
//            		$('#table tr:eq('+trindex+') td:eq(4)').html('<button class="btn btn-danger btn-xs" style="" >已满</button>');
            	
//            	console.log($('#table tr:eq('+trindex+') td:eq(3)').html());
//            	$('#table tr:eq('+rowindex+') td:eq(3)').text(num);
//            	console.log($('#table tr:eq('+trindex+') td:eq(4)').text());
//            	console.log($('#table tr:eq('+trindex+') td:eq(4)').html());
//            	 console.log("lid:" + lid);
//            	 console.log("availRoomNum:" + num);
//            	 console.log("index:" + rowindex);
            	
            }else{
            	alert(data.message);
            }
        },
        error: function () {
            alert('失败');
        },
        complete: function () {

        }

    });
	
}

function updateRowAvailableNum(index, num){
	$('#table').bootstrapTable('updateRow', {//可以在这里全部更新
        index: index, 
        row: {
           availRoomNum: num,
        }
 }); 
}

function detailFormatter(index, row) {
	var html = [];
	html.push('<b>房型描述:</b>&nbsp;' + row.summarize + '&nbsp;&nbsp;&nbsp;&nbsp;');
	html.push('<b>床型:</b>&nbsp;<code>' + row.bed_type+ '</code>&nbsp;&nbsp;&nbsp;&nbsp;');
	html.push('<b>床数:</b>&nbsp;<code>' + row.bed_num + '</code>&nbsp;&nbsp;&nbsp;&nbsp;');
	html.push('<b>面积:</b>&nbsp;<code>' + row.area + '</code>&nbsp;&nbsp;&nbsp;&nbsp;');
	html.push('<b>人数上限:</b>&nbsp;<code>' + row.limit + '</code>&nbsp;&nbsp;&nbsp;&nbsp;');
	html.push('<b>总房间数:</b>&nbsp;<code>' + row.allRoomNum + '</code></br></br>');
//	html.push('<input type="hidden" data-lid="' + row.l_id + '" data-index="' + index + '"/>');
//	var rowIndex = index;
	console.log("index:" + index);
	 $.ajax({
        url: 'layoutDetail',
        async: false,
        type: "post",
        data: {"layoutID":row.l_id, "fromDate":$("#datetimepicker1").val(), "toDate":$("#datetimepicker2").val()},
        success: function (data) {
     	   if(data.status){
     		  $.each(data.rooms, function (index, value) {
//     			   html.push('<p><b>房间:</b> ' + value.plate + '      ' + (value.booked ? '已被预订' : '可预订') + '</p>');
     			 if(value.booked){
     				 html.push('<button class="btn-secondary btn-xs" name="booked-plate-btn" data-lid="' + row.l_id + '" data-plate="' + value.plate + '" data-rid="' + value.r_id + '">' + value.plate + '</button>');
     			 }else{
     				html.push('<button class="btn-success btn-xs" data-toggle="modal" data-target="#addModal" name="book-plate-btn" data-lid="' + row.l_id + '" data-plate="' + value.plate + '" data-rid="' + value.r_id + '">' + value.plate + '</button>');
     			 }
     		  });    		  
     	   }else{
     		   console.log(data.message);
     		  html.push('<b>该房型已被设为不可用，请询问管理员</b>');
     	   }
        }
        
      });
	 html.push('</br></br>');
    return html.join('');
  }