
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
            url: "employeeData",        //请求后台的URL（*）
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
            uniqueId: "emplID",                     //每一行的唯一标识，一般为主键列
            //
            toolbar:'#toolbar',//工具栏
            toolbarAlign:'right',//工具栏的位置
            showRefresh:true,
            iconSize:"sm",   // 1,设置修改图标  sm小图标 lg大图标
            showExport: true,
            exportDataType: 'all',
            exportTypes:[ 'csv', 'txt','excel', 'xlsx'], //导出文件类
            exportOptions:{
                ignoreColumn: [12],  //忽略某一列的索引
                fileName: '员工信息',  //文件名称设置
                worksheetName: '员工信息',  //表格工作区名称
                tableName: '员工信息',
                excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
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
                    field: 'emplID',
                    visible:false
                },
                {
                    title: "工号",
                    field: 'emplNum',
                    align: 'center',
                    valign: 'middle',
                    editable: {
                        type: 'text',
                        validate: function (v) {
                            if (!v || $.trim(v) == '') return '不能为空';
                        }
                    }
                },
                {
                    title: "姓名",
                    field: 'name',
                    align: 'center',
                    valign: 'middle',
                    clickToSelect:true,
                    editable: {
                        type: 'text',
                        validate: function (v) {
//                        	if(isNaN(v)) return '必须为整数';
                        	if (!v || $.trim(v) == '') return '不能为空';
                        }
                    }
                },
                {
                    title: "性别",
//                    field: 'name',
                    field:'gender',
                    align: 'center',
                    valign: 'middle',
                    editable: {
                        type: 'select',
                        source:[{value:"1",text:"男"},{value:"0",text:"女"}]
                    }
                },
                {
                    title: '身份证号',
                    field: 'idCard',
                    align: 'center',
                    valign: 'middle',
                    editable: {
                        type: 'text',
                        validate: function (v) {
                        	if (!v || $.trim(v) == '') return '不能为空';
                        }
                    }
                },
                {
                    title: "手机号",
                    field: 'phone',
                    align: 'center',
                    valign: 'middle',
                    editable: {
                        type: 'text',
                        validate: function (v) {
//                        	if(isNaN(v)) return '必须为整数';
                        	if (!v || $.trim(v) == '') return '不能为空';
                        }
                    }
                },
                {
                    title: "邮箱",
                    field: 'email',
                    align: 'center',
                    valign: 'middle',
                    editable: {
                        type: 'text',
                        validate: function (v) {
//                        	if(isNaN(v)) return '必须为整数';
                        	if (!v || $.trim(v) == '') return '不能为空';
                        }
                    }
                },
                {
                    title: "地址",
                    field: 'address',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	if(value) return value;
                    	return '';
                    },
                    editable: {
                        type: 'text',
                        validate: function (v) {
//                        	if(isNaN(v)) return '必须为整数';
                        	if (!v || $.trim(v) == '') return '不能为空';
                        }
                    }
                },
                {
                    title: "添加日期",
                    field: 'createDate',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	var date = new Date(value);
                    	return date.Format("yyyy-MM-dd");
                    }
                },
                {
                    title: "入职日期",
                    field: 'employDate',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	if(value) 
                    	return new Date(value).Format("yyyy-MM-dd");
                    },
                    editable: {
                    	type: 'date',
                    	title:"入职日期",
                        format:"yyyy-mm-dd",
                        placement:"right"
                    }
                },
                {
                    title: "权限",
                    field: 'type',
                    align: 'center',
                    valign: 'middle',
                    editable: {
                    	 type: 'select',
                         source:[{value:"0",text:"员工"},{value:"1",text:"管理员"}]
                    }
                },
                {
                    title: "状态",
                    field: 'state',
                    align: 'center',
                    valign: 'middle',
                    editable: {
                        type: 'select',
                        source:[{value:"1",text:"在职"},{value:"0",text:"离职"}]
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    formatter: function (cellval, row) {
                    	return '<button data-toggle="modal" data-target="#passwordModal" title="重置密码"><i class="pw_i"></i></button>';
                    },
                    events: {
                        'click button[title=重置密码]': function (e, value, row, index) {
//                        	alert("确定重置密码");
                        	$("#passwordModal .modal-title").text(row.name + '(' + row.emplNum + ')')
                        	$("#passwordModal #password-submit").data("id", row.emplID)
                        },
                      }
                }
            ],
            onEditableSave: function (field, row, oldValue, $el) {
            	if(oldValue == row[field]) return;
                $.ajax({
                    type: "post",
                    url: "editEmployee",
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
    	var state = $("#state-select").find("option:selected").data("value");
    	var other = $("#other-select").find("option:selected").data("name");
    	var text = $.trim($("#search-input").val());
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            offset: params.offset  //页码     
        };
        if(state == 0 || state == 1) temp.state=state;
        if(text != ''){
        	switch(other){
        	case 'emplNum':temp.emplNum = text;break;
        	case 'name':temp.name = text;break;
        	case 'phone':temp.phone = text;break;
        	case 'idCard':temp.idCard = text;break;
        	}
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


var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //初始化页面上面的按钮事件
    	$(".batdel-btn").on("click",function(){
    		batchDelete();
    	})
    	
    	$("input").hover(function(){
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
    		$("#table").bootstrapTable('refresh');
    	})
    	
    	$('#search-input').bind('keypress',function(event){
    		$("#table").bootstrapTable('refresh');
        });
    	
    	$("#add-new").on("click", function(){
    		var html = '<tr>'+
        '<td><input type="checkbox" name="checkbox" class="add-checkbox"></td>'+
         '<td><input type="text" name="emplNum"></td>'+
         '<td><input type="text" name="name"></td>'+
         '<td>'+
          '<select style="width:60px;" required>'+
			'            <option data-name="state" data-value="1">男</option>'+
			'            <option data-name="state" data-value="0">女</option>'+
		  '</select>'+
         '</td>'+
         '<td><input type="text" name="idCard"></td>'+
         '<td><input type="text" name="phone"></td>'+
         '<td><input type="text" name="emplDate"></td>'+
        '</tr>';
    		$(".add-tbody").append(html);
    		$('input[name=emplDate]').datetimepicker({
    	        format: 'yyyy-mm-dd',
    	        weekStart: 1,//周一开始
    	        minView : 2,//显示到月和日
    	        autoclose:true,//选完自动关闭
    	        language:'zh-CN',
    	        todayHighlight:true,//高亮当前日期
    	        /*bootstrap datetimepicker有几个版本，部分属性的名称不一样。比如说之前用过一版设置开始时间属性是minDate，结束时间是maxDate。还有一版开始时间：startDate，结束时间endDate。现在大部分网上下载的应该都是后者。*/
    	    });
    		$("input").hover(function(){
    	    	   $(this).focus();
    	       },function(){
//    	    	   $(this).blur();
    	       })
    	       
    	       $("select").hover(function(){
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
    	
    	$("input[type=checkbox][name=all-check]").on("click", function(){
		           $('input[type=checkbox][name=checkbox]').prop('checked', $("input[type=checkbox][name=all-check]").prop("checked") ? true : false);
	     })
    	
    	$('input[name=emplDate]').datetimepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,//周一开始
        minView : 2,//显示到月和日
        autoclose:true,//选完自动关闭
        language:'zh-CN',
        todayHighlight:true,//高亮当前日期
        /*bootstrap datetimepicker有几个版本，部分属性的名称不一样。比如说之前用过一版设置开始时间属性是minDate，结束时间是maxDate。还有一版开始时间：startDate，结束时间endDate。现在大部分网上下载的应该都是后者。*/
    });
    	
    	$("#add-submit").on("click", function(){
   	      var list = new Array(); 
 		 $("#layout-table tbody tr").each(function(trindex,tritem){
 			 list.push({emplNum: $(this).children('td').eq(1).find("input").val(),
 				 name: $(this).children('td').eq(2).find("input").val(),
 				 gender:$(this).children('td').eq(3).find("option:selected").data("value"),
 				 idCard:$(this).children('td').eq(4).find("input").val(),
 				 phone:$(this).children('td').eq(5).find("input").val(),
 				employDate:$(this).children('td').eq(6).find("input").val()
 				 });
	         })
   	         $.ajax({
              url: 'addEmployee',
              async: false,
              type: "post",
              dataType:"json",
              contentType : 'application/json;charset=utf-8',
              data: JSON.stringify(list),
              success: function (data) {
                  if(data.status){
                	  $(".add-tbody").empty();
                	  var html = '<tr>'+
                      '<td><input type="checkbox" name="checkbox" class="add-checkbox"></td>'+
                       '<td><input type="text" name="emplNum"></td>'+
                       '<td><input type="text" name="name"></td>'+
                       '<td>'+
                        '<select style="width:60px;" required>'+
              			'            <option data-name="state" data-value="1">男</option>'+
              			'            <option data-name="state" data-value="0">女</option>'+
              		  '</select>'+
                       '</td>'+
                       '<td><input type="text" name="idCard"></td>'+
                       '<td><input type="text" name="phone"></td>'+
                       '<td><input type="text" name="emplDate"></td>'+
                      '</tr>';
                  		$(".add-tbody").append(html);
                	  $("#addModal").modal('hide'); 
                	  $("#table").bootstrapTable('refresh');
                  }else{
                	  alert(data.message);
                  }
//                  console.log(result);
              }
             });
    	})
    	
    	$("#password-submit").on("click", function(){
    		var password1 = $.trim($("#password1").val());
		    var password2 = $.trim($("#password2").val());
		    if(password1 != password2){
			    $("#passwordModal .modal-footer span").text("密码不一致")
			    return;
		    }
		    var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
		    if(!pwdReg.test(password1)){
		    	$("#passwordModal .modal-footer span").text("密码应为8到16位数字和字母的组合")
			    return;
	     	}
		    var ids=[];
        	ids.push($(this).data('id'));
		    $.ajax({
                type: "post",
                url: "resetEmployeePassword",
                data: {'ids':ids, 'password':password1},
                dataType: 'JSON',
                success: function (data) {
                    if (data.status) {
                    	$("#passwordModal .modal-footer span").text(data.message)
                    	$("#password1").val("")
                    	$("#password2").val("")
                    	
                    }else{
                    	$("#passwordModal .modal-footer span").text(data.message)
                    }
                },
                error: function () {
                	$("#passwordModal .modal-footer span").text("请求服务器失败")
                },
            });
    	})
    	
    	
    };

    return oInit;
};


function batchDelete(){
	var data = $('#table').bootstrapTable('getAllSelections');
	if(data.length <= 0) return;
	var ids=[];//如果你想获得每个选中行的ID,如下操作
	var info = "";
	for(var i=0;i<data.length;i++){
	  ids.push(data[i].emplID);
	  info += data[i].name + "[" +data[i].emplNum +"]\n";
	}
	if(confirm("确定删除这" + data.length + "条数据吗\n" + info)){
		$.ajax({
            type: "post",
            url: "deleteEmployee",
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