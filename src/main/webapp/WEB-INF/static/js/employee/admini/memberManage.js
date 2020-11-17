
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
            url: "memberData",        //请求后台的URL（*）
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
            uniqueId: "memID",                     //每一行的唯一标识，一般为主键列
            contentType: "application/x-www-form-urlencoded",
            columns: [
            	{
            		checkbox: "true",
                    field: 'check',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'memID',
                    visible:false
                },
                {
                    title: "用户名",
                    field: 'name',
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
                    title: "性别",
                    field:'gender',
                    align: 'center',
                    valign: 'middle',
                    editable: {
                        type: 'select',
                        source:[{value:"1",text:"男"},{value:"0",text:"女"}]
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
                        	if (!v || $.trim(v) == '') return '不能为空';
                        }
                    }
                },
                {
                    title: "地址",
                    field: 'address',
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
                    title: "积分",
                    field: 'point',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    title: "注册日期",
                    field: 'regDate',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                    	var date = new Date(value);
                    	return date.toLocaleString();
                    }
                },
                {
                    title: "状态",
                    field: 'state',
                    align: 'center',
                    valign: 'middle',
                    editable: {
                        type: 'select',
                        source:[{value:"1",text:"可用"},{value:"0",text:"停用"}]
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    formatter: function (cellval, row) {
                    	return '<a href="javascript:void(0)" title="重置密码"><i class="pw_i"></i></a>';
                    },
                    events: {
                        'click a[title=重置密码]': function (e, value, row, index) {
                        	var ids=[];
                        	ids.push(row.memID);
                        	if(confirm("确定重置" + ids.length + "个用户:" + row.name + "[" + row.phone + "]的密码为123456吗")){
                        		$.ajax({
                                    type: "post",
                                    url: "resetMemberPassword",
                                    data: {'ids':ids},
                                    dataType: 'JSON',
                                    success: function (data) {
                                        if (data.status) {
                                        	alert("重置密码成功");
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
                        },
                      }
                }
            ],
            onEditableSave: function (field, row, oldValue, $el) {
            	if(oldValue == row[field]) return;
                $.ajax({
                    type: "post",
                    url: "editMember",
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
            },
            rowStyle: function(row, index) {
                var classes = ['bg-blue','bg-green','bg-red'];
                if(row.state == 0) return {classes:classes[2]};
                return classes;
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
        	case 'name':temp.name = text;break;
        	case 'phone':temp.phone = text;break;
        	case 'email':temp.email = text;break;
        	}
        }
        return temp;
    };
    return oTableInit;
};

Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
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
         '<td><input type="text" name="name"></td>'+
         '<td>'+
          '<select style="width:60px;" required>'+
			'            <option data-name="state" data-value="1">男</option>'+
			'            <option data-name="state" data-value="0">女</option>'+
		  '</select>'+
         '</td>'+
         '<td><input type="text" name="phone"></td>'+
        '</tr>';
    		$(".add-tbody").append(html);
    		$("input").hover(function(){
    	    	   $(this).focus();
    	       },function(){
//    	    	   $(this).blur();
    	       })
    	        $("select").hover(function(){
    	   $(this).focus();
       },function(){
//    	   $(this).blur();
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
    	
    	
    	$("#add-submit").on("click", function(){
   	      var list = new Array(); 
 		 $("#layout-table tbody tr").each(function(trindex,tritem){
 			 list.push({name: $(this).children('td').eq(1).find("input").val(),
 				 gender:$(this).children('td').eq(2).find("option:selected").data("value"),
 				 phone:$(this).children('td').eq(3).find("input").val()
 				 });
	         })
   	         $.ajax({
              url: 'addMember',
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
                       '<td><input type="text" name="name"></td>'+
                       '<td>'+
                        '<select style="width:60px;" required>'+
              			'            <option data-name="state" data-value="1">男</option>'+
              			'            <option data-name="state" data-value="0">女</option>'+
              		  '</select>'+
                       '</td>'+
                       '<td><input type="text" name="phone"></td>'+
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
    	
    	
    };

    return oInit;
};


function batchDelete(){
	var data = $('#table').bootstrapTable('getAllSelections');
	if(data.length <= 0) return;
	var ids=[];//如果你想获得每个选中行的ID,如下操作
	var info = "";
	for(var i=0;i<data.length;i++){
	  ids.push(data[i].memID);
	  info += data[i].name + "[" +data[i].phone +"]\n";
	}
	if(confirm("确定删除这" + data.length + "条数据吗\n" + info)){
		$.ajax({
            type: "post",
            url: "deleteMember",
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