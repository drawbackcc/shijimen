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
            url: "layoutData",        //请求后台的URL（*）
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
            clickToSelect: true,                //是否启用点击选中行
            singleSelect: false,
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            contentType: "application/x-www-form-urlencoded",
            columns: [
            	{
            		checkbox: "true",
                    field: 'check',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'l_id',
                    visible:false
                },
                {
                    title: "房型名",
                    field: 'name',
                    align: 'center',
                    width: 80,
                    valign: 'middle',
                    editable: {
                        type: 'text',
                        validate: function (v) {
                            if (!v || $.trim(v) == '') return '不能为空';
                        }
                    }
                },
                {
                    title: "房型描述",
                    field: 'summarize',
                    align: 'center',
                    width: 120,
                    clickToSelect:false,
                    valign: 'middle',
                   // editable: true
                    editable: {
                        type: 'text',
                        validate: function (v) {
                            if (!v || $.trim(v) == '') return '不能为空';
                        }
                    }
                },
                {
                    title: "床型",
                    field: 'bed_type',
                    align: 'center',
                    width: 120,
                    clickToSelect:false,
                    valign: 'middle',
                    editable: {
                        type: 'text',
                        validate: function (v) {
                            if (!v || $.trim(v) == '') return '不能为空';
                        }
                    }
                },
                {
                    title: "床数",
                    field: 'bed_num',
                    align: 'center',
                    width: 60,
                    clickToSelect:false,
                    valign: 'middle',
                    editable: {
                        type: 'text',
                        validate: function (v) {
                        	if(isNaN(v)) return '必须为正整数';
                        	if(!(/(^[1-9]\d*$)/.test(v))) return '必须为正整数';
                        }
                    }
                },
                {
                    title: "面积",
                    field: 'area',
                    align: 'center',
                    clickToSelect:false,
                    sortable: true,
                    width: 60,
                    valign: 'middle',
                    editable: {
                        type: 'text',
                        validate: function (v) {
                        	if(isNaN(v)) return '必须为正整数';
                        	if(!(/(^[1-9]\d*$)/.test(v))) return '必须为正整数';
                        }
                    }
                },

                {
                    title: '人数上限',
                    field: 'limit',
                    align: 'center',
                    width: 60,
                    clickToSelect:false,
                    valign: 'middle',
                    editable: {
                        type: 'text',
                        validate: function (v) {
                        	if(isNaN(v)) return '必须为正整数';
                        	if(!(/(^[1-9]\d*$)/.test(v))) return '必须为正整数';
                        }
                    }
                },

                {
                    title: '门市价',
                    field: 'price',
                    align: 'center',
                    sortable: true,
                    clickToSelect:false,
                    width: 80,
                    valign: 'middle',
                    editable: {
                    	type: 'text',
                    	editable: {
                            type: 'text',
                            validate: function (v) {
                            	if(isNaN(v) || v < 0) return '必须为正数';
                            }
                        }
                    }
                },

                {
                    title: '房间数',
                    field: 'allRoomNum',
                    align: 'center',
                    clickToSelect:false,
//                    sortable: true,
                    width: 40,
                    valign: 'middle'
                },

                {
                    title: '状态',
                    field: 'state',
                    width: 70,
                    align: 'center',
                    clickToSelect:false,
                    editable: {
                        type: 'select',
                        pk: 1,
                        source:[{value:"1",text:"可用"},{value:"0",text:"不可用"}]
                    }
                },
                {
                    title: '操作',
                    // field: 'person',
                    width: 120,
                    clickToSelect:false,
                    align: 'center',
                    formatter: function (cellval, row) {
                    	return '<button class="btn btn-warning btn-xs" name="pic-btn">图片</button>&nbsp;'+ 
                        '<button class="btn btn-info btn-xs" name="info-btn">其它</button>';
                    },
                    events: {
                    	 'click button[name=pic-btn]': function (e, value, row, index) {
                    		 layer.open({
                    		        type: 2,
                    		        title: row["name"],
                    		        shadeClose: false,//点击阴影不关闭
                    		        shade: 0.5,
                    		        skin: 'layui-layer-rim',
                    		        closeBtn:1,
                    		        area: ['760px', '600px'],
                    		        content: 'layoutManageImage.html?layoutID='+row["l_id"],
                    		        success: function (layero, index) {
                    		            //找到它的子窗口的body
                    		            var body = layer.getChildFrame('body', index);  //巧妙的地方在这里哦
                    		            //为子窗口元素赋值
                    		            body.contents().find("#hidden-text").val(row["l_id"]);

                    		        }
                    		    });
                         },
                         'click button[name=info-btn]': function (e, value, row, index) {
                  		 layer.open({
                  		        type: 2,
                  		        title: row['name'] + '--' +'详细信息',
                  		        shadeClose: false,//点击阴影不关闭
                  		        shade: 0.5,
                  		        skin: 'layui-layer-rim',
                  		        closeBtn:1,
                  		        area: ['300px', '450px'],
                  		        content: 'layoutManageMore?layoutID='+row['l_id'],
                  		        success: function (layero, index) {
                  		            //找到它的子窗口的body
                  		            var body = layer.getChildFrame('body', index);  //巧妙的地方在这里哦
                  		            //为子窗口元素赋值
//                  		            body.contents().find("#start").val(from);
//                  		            body.contents().find("#end").val(to);

                  		        }
                  		    });
                       },
                      }
                }
            ],
            onEditableSave: function (field, row, oldValue, $el) {
            	if(oldValue == row[field]) return;
                $.ajax({
                    type: "post",
                    url: "editLayout",
                    data: row,
                    dataType: 'JSON',
                    success: function (data) {
                        if (data.status) {
//                        	$el.css("backgroundColor", "#333");
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
    
//            	$table = $('#table').bootstrapTable({});
//
//            	  $table.bootstrapTable('updateRow', {index: row.rowId, row: row});
//            	alert("确定保存修改吗");
            }
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            offset: params.offset,  //页码
            sortName:this.sortName,
            sortOrder:this.sortOrder,
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
    	$(".batdel-btn").on("click",function(){
//    		$(".add-btn").trigger('click');
    		batchDelete();
    	})
//
//    	$(document).on("click","#add-new",function(){
//    		$('.layout-input').editable({
//    	        type: "text",   
//    	        disabled: false, 
//    	        emptytext: "楼层",
//    	        mode: "popup", 
//    	        validate: function (value) {
//    	            if (!$.trim(value)) {
//    	                return '不能为空';
//    	            }
//    	        }
//    	    });
//    	});
    	
    	$("#add-new").on("click", function(){
    		console.log("点击添加");
    		$(".add-tbody").append('<tr>'+
    		       '<td><input type="checkbox" name="checkbox" class="add-checkbox"></td>'+
    		       '  <td><input type="text" class="name"></td>'+
    		       '  <td><input type="text" class="describe"></td>'+
    		       '  <td><input type="text" class="price"></td>'+
    		        '</tr>');
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
    		 var layoutList = new Array(); 
    		 $("#layout-table tbody tr").each(function(trindex,tritem){
//    			$(tritem).find("input").each(function(tdindex,tditem){
//    				console.log($(tditem).val());
//    			})
    			 layoutList.push({name: $(this).children('td').eq(1).find("input").val(),
    				 describe: $(this).children('td').eq(2).find("input").val(),
    				 price:$(this).children('td').eq(3).find("input").val()});
 	         })
 	         console.log(layoutList);
   	        
   	         $.ajax({
              url: 'addLayout',
              async: false,
              type: "post",
              dataType:"json",
              contentType : 'application/json;charset=utf-8',
              data: JSON.stringify(layoutList),
              success: function (data) {
                  if(data.status){
                	  $(".add-tbody").empty();
                	  $(".add-tbody").append('<tr>'+
               		       '<td><input type="checkbox" name="checkbox" class="add-checkbox"></td>'+
               		       '  <td><input type="text" class="name"></td>'+
               		       '  <td><input type="text" class="describe"></td>'+
               		       '  <td><input type="text" class="price"></td>'+
               		        '</tr>');
                	  $("#addModal").modal('hide'); 
                	  $("#table").bootstrapTable('refresh');
                  }else{
                	  alert(data.message);
                  }
              }
             });
    	})
    	
    };

    return oInit;
};


function batchDelete(){
	$("#delModal").modal('hide'); 
	var data = $('#table').bootstrapTable('getAllSelections');
	if(data.length <= 0) return;
	var ids=[];//如果你想获得每个选中行的ID,如下操作
	var info = "";
	for(var i=0;i<data.length;i++){
	  ids.push(data[i].l_id);
	  info += data[i].name + "/";
	}
	if(confirm("确定删除这" + data.length + "条数据吗\n" + info)){
		$.ajax({
            type: "post",
            url: "deleteLayout",
            data: {'ids':ids},
            dataType: 'JSON',
            success: function (data) {
                if (data.status) {
//                	alert(data.message);
                	$("#table").bootstrapTable('refresh');
//                	oTable.Init();
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