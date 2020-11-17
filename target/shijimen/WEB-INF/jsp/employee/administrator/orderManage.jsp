<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%String path = request.getContextPath();%>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
    <title></title>
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap-editable.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap-table.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/table.css" rel="stylesheet" type="text/css" />
    
</head>
 <style>
 .mytable{
font-size:12px;
border:1px solid #cad9ea;
color:#666;
margin:0 auto;
box-shadow: 4px 5px 6px 7px rgba(82,97,107,0.5);
margin-left:5px;
width:80%;
}
.mytable tr:hover{
background:#fff;
}

.mytable td:hover{
background:#fff;
}

.graytable{
font-size:12px;
border:1px solid #cad9ea;
color:#666;
margin:0 auto;
box-shadow: 4px 5px 6px 7px rgba(82,97,107,0.5);
margin-left:5px;
}
.graytable tr{
background-color:#eaeaea;
}
.graytable tr:hover{
background:#eaeaea;
}

.graytable td:hover{
background:#eaeaea;
}
    </style>
<body style="background-color: #ecf0f5;font-family: 微软雅黑;color: #475059;min-width: 1000px;overflow: auto">
<div class="notice_main">
        <h6>订单管理</h6>
        <div class="notice_check">
              <p>
                  <select id="type-select" class="find_input" style="width:80px;" required>
                        <option data-name="type" data-value="">订单类型</option>
			            <option data-name="reception">前台</option>
			            <option data-name="internet">网上</option>
		          </select>
                  <select id="state-select" class="find_input" style="width:60px;" required>
                        <option data-name="state" data-value="">状态</option>
			            <option data-name="finish" data-value="1">已完成</option>
			            <option data-name="cancel" data-value="0">已取消</option>
		          </select>
                  <select id="other-select" class="find_input" style="width:60px;" required>
                        <option data-name="all">其它</option>
                        <option data-name="orderNum">订单号</option>
			            <option data-name="plate">房间号</option>
		              	<option data-name="people">入住人</option>	
		              	<option data-name="employee">雇员</option>	
		          </select>
		          <input type="text" id="other-input" class="find_input" autocomplete="off">
		          <select id="time-select" class="find_input" style="width:80px;" required>
                        <option data-name="all">时间</option>
                        <option data-name="date">创建时间</option>
			            <option data-name="from">住房时间</option>			            
		          </select>
		           <input type="text" id="datetimepicker1" class="find_input" style="width:100px;" placeholder="">-
		           <input type="text" id="datetimepicker2" class="find_input" style="width:100px;" placeholder="">
		           <button id="search-btn" class="check_btn search-btn">查询</button>
		            <button class="btn btn-danger batdel-btn" style="float:right;margin-left: 10px;">批量删除</button>
              </p> 
        </div>
        <div id="toolbar">
        </div>
        <!-- 
        <table id="table" class="table_style" style="margin: 0 auto" data-classes="table table-hover" data-search="true" data-show-refresh="true" data-show-toggle="true" data-show-columns="true"></table>
         -->
         <table id="table" class="table_style" style="margin: 0 auto"></table>

</div>
<script src="<%=path %>/static/js/employee/jquery/jQuery-2.2.0.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-editable.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table-zh-CN.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bte.js"></script> 
 <!-- 
<script src="<%=path %>/static/plugins/FileExport/FileSaver.min.js"></script> 
<script src="<%=path %>/static/plugins/FileExport/xlsx.core.min.js"></script> 
<script src="<%=path %>/static/plugins/FileExport/jspdf.min.js"></script> 
<script src="<%=path %>/static/plugins/FileExport/jspdf.plugin.autotable.js"></script> 
<script src="<%=path %>/static/plugins/FileExport/es6-promise.auto.min.js"></script> 
<script src="<%=path %>/static/plugins/FileExport/html2canvas.min.js"></script> 
 -->
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table-export.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/tableExport.js"></script>
<!--<script src="<%=path %>/static/plugins/FileExport/tableExport.min.js"></script>   -->
 
<script src="<%=path %>/static/js/employee/admini/orderManage.js"></script>
<script>

</script>
</body>
</html>

