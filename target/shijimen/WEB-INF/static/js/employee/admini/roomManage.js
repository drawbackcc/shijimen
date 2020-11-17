
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
            url: "roomData",        //请求后台的URL（*）
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
            uniqueId: "r_id",                     //每一行的唯一标识，一般为主键列
            contentType: "application/x-www-form-urlencoded",
            columns: [
            	{
            		checkbox: "true",
                    field: 'check',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'r_id',
                    visible:false
                },
                {
                    title: "房间号",
                    field: 'plate',
                    align: 'center',
                    valign: 'middle',
                    sortable:true,
                    editable: {
                        type: 'text',
                        validate: function (v) {
                            if (!v || $.trim(v) == '') return '不能为空';
                        }
                    }
                },
                {
                    title: "楼层",
                    field: 'floor',
                    align: 'center',
                    valign: 'middle',
                    sortable:true,
                    editable: {
                        type: 'text',
                        validate: function (v) {
                        	if(isNaN(v)) return '必须为整数';
                        }
                    }
                },
                {
                    title: "房型",
//                    field: 'name',
                    field:'l_id',
                    align: 'center',
                    valign: 'middle',
                    editable: {
                        type: 'select',
                        pk: 1,
//                        source:[{value:"1",text:"可用"},{value:"0",text:"停用"}]
                        source: function () {
                            var result = [];
                            $.ajax({
                                url: 'allLayoutData',
                                async: false,
                                type: "post",
                                data: {},
                                success: function (data) {
                                    $.each(data.data, function (key, value) {
                                        result.push({ value: value.l_id, text: value.name });
                                    });
//                                    console.log(result);
                                }
                            });
                            return result;
                        }
                    }
                },
                {
                    title: '状态',
                    field: 'state',
//                    class:'btn-success',
                    align: 'center',
                    editable: {
                        type: 'select',
                        pk: 1,
                        source:[{value:"1",text:"可用"},{value:"0",text:"停用"}]
                    }
                }
            ],
            onEditableSave: function (field, row, oldValue, $el) {
            	if(oldValue == row[field]) return;
                $.ajax({
                    type: "post",
                    url: "editRoom",
                    data: row,
                    dataType: 'JSON',
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
    	var layoutID = $("#layout-select").find("option:selected").data("value");
    	var other = $("#other-select").find("option:selected").data("name");
    	var text = $.trim($("#search-input").val());
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            offset: params.offset,  //页码
            sortName:this.sortName,
            sortOrder:this.sortOrder,
        };
        if(state == "0" || state == "1") temp.state=state;
        if(layoutID != null && layoutID != 0) temp.layoutID = layoutID;
        if(text != ''){
        	switch(other){
        	case 'plate':temp.plate = text;break;
        	case 'floor':temp.floor = text;break;
        	}
        }
        return temp;
    };
    return oTableInit;
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
    	   $(this).blur();
       })
       
       $("select").hover(function(){
    	   $(this).focus();
       },function(){
    	   $(this).blur();
       })

    	bindPlateEditable();
    	bindFloorEditable();
    	bindLayoutEditable();
    	
    	
    	
//    	$("#layout-select").on("click", function(){
    		$.ajax({
               url: 'allLayoutData',
               async: false,
               type: "post",
               data: {},
               success: function (data) {
            	   var html = '<option data-name="layout" data-value="0">房型</option>';
                    $.each(data.data, function (index, value) {
                    	var string = '<option data-name="layout" data-value="' + value.l_id + '">' + value.name + '</option>';
                            html += string;
                    });
//                    alert(html);
                    $("#layout-select").append(html);
               }
             });
//    	})
    	
    	$("#add-submit").on("click", function(){
    		console.log("plate:"+$("#add-plate").text());
    		console.log("floor:"+$("#add-floor").text());
    		console.log("layout:"+$("#add-layout").data("id"));
    		 var roomList = new Array(); 
   	         roomList.push({plate: $("#add-plate").text(),floor: $("#add-floor").text(),l_id:$("#add-layout").data("id")});
   	         $.ajax({
              url: 'addRoom',
              async: false,
              type: "post",
              dataType:"json",
              contentType : 'application/json;charset=utf-8',
              data: JSON.stringify(roomList),
//              data: {'rooms':roomList},
              success: function (data) {
                  if(data.status){
//                	  alert(data.message);
                	  $("#addModal").modal('hide'); 
                	  $("#table").bootstrapTable('refresh');
                  }else{
                	  alert(data.message);
                  }
//                  console.log(result);
              }
             });
    	})
    	
    	$("#add-new").on("click", function(){
    		console.log("点击添加");
    		$(".add-tbody").append('<tr><td><input type="checkbox" name="checkbox" class="add-checkbox"></td><td><a href="#" id="add-plate"></a></td><td><a href="#" id="add-floor"></a></td>'+
                                '<td><a href="#" data-id="" id="add-layout">请选择房型</a></td></tr>');
    	})
    	
    	$("#add-remove").on("click", function(){
    		 $("#addModal input[name='checkbox']:checked").each(function(i){//把所有被选中的复选框的值存入数组
    			    n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
    	            $(".add-tbody").find("tr:eq("+n+")").remove();
    	        });
    		 $("input[type=checkbox][name=all-check]").prop("checked", false);
    	})
    	
    	$("input[type=checkbox][name=all-check]").on("click", function(){
		           $('input[type=checkbox][name=checkbox]').prop('checked', $("input[type=checkbox][name=all-check]").prop("checked") ? true : false);
	     })
    	
    	$(".search-btn").on("click", function(){
    	      $("#table").bootstrapTable('refresh');
    	      
    	})
    	// // 判断是不是回车
    	$('#search-input').bind('keypress',function(e){
    		  // 兼容写法
    		e = e || window.event;
    	    key = e.keyCode || e.which || e.charCode;
    	    if (key == 13) {
    	        $("#table").bootstrapTable('refresh');
    	    }
    		
        });
    };

    return oInit;
};

function bindPlateEditable(){
	$('.add-plate').editable({
        type: "text",   
        disabled: false,        
        emptytext: "房号",
        mode: "popup",    
        validate: function (value) {
            if (!$.trim(value)) {
                return '不能为空';
            }
        }
    });
	
	$('.add-plate').on('save', function(e, params) {
		
	});
	
}

function bindFloorEditable(){
	$('.add-floor').editable({
        type: "text",   
        disabled: false, 
        emptytext: "楼层",
        mode: "popup", 
        validate: function (value) {
            if (!$.trim(value)) {
                return '不能为空';
            }
        }
    });
}

function bindLayoutEditable(){
	$('.add-layout').editable({
        type: "select",              //编辑框的类型。支持text|textarea|select|date|checklist等
        pk: 1,
        name:'l_id',
        source: function () {
            var result = [];
            $.ajax({
                url: 'allLayoutData',
                async: false,
                type: "post",
                data: {},
                success: function (data) {
                    $.each(data.data, function (key, value) {
                        result.push({ value: value.l_id, text: value.name });
                    });
//                    console.log(result);
                }
            });
            return result;
        },
        disabled: false,           //是否禁用编辑
        emptytext: "没有房型信息",       //空值的默认文本
        mode: "popup",            //编辑框的模式：支持popup和inline两种模式，默认是popup
        validate: function (value) { //字段验证
            if (!$.trim(value)) {
                return '不能为空';
            }
        }
    });
	
	$('.add-layout').on('save', function(e, params) {
		$(this).data("id", params.newValue);
	});
	
}

function batchDelete(){
	
	var data = $('#table').bootstrapTable('getAllSelections');
	if(data.length <= 0) return;
	var ids=[];//如果你想获得每个选中行的ID,如下操作
	var info = "";
	for(var i=0;i<data.length;i++){
	  ids.push(data[i].r_id);
	  info += data[i].plate + "/";
	}
	if(confirm("确定删除这" + data.length + "条数据吗\n" + info)){
		$.ajax({
            type: "post",
            url: "deleteRoom",
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