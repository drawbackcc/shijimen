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
  <!--    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css"> -->
    <link href="<%=path %>/static/css/employee/table.css" rel="stylesheet" type="text/css" />
    
</head>

<style>
.bg-blue {
    background-color: #0074D9 !important;
}
.bg-green {
    background-color: green !important;
}
.bg-red {
    background-color: red !important;
}
</style>
<body style="background-color: #ecf0f5;font-family: 微软雅黑;color: #475059;min-width: 1000px;overflow: auto">
<div class="notice_main">
        <h6>会员管理</h6>
        <div style="border-bottom: 1px #ccc solid;padding-bottom: 8px">
            <p style="line-height: 24px;font-size: 14px;padding: 4px 0 0 36px ;color:#bb8940;background-image: url(<%=path %>/static/image/employee/ts_03.png);background-repeat: no-repeat;background-position: 10px 8px;font-weight: bold">温馨提示</p>
            <ul class="ts">
                <li><span>*</span>该页面主要用于查看会员信息</li>
            </ul>
        </div>
     
        <div class="notice_check">
              <p>
                  <select id="state-select" class="find_input" style="width:60px;" required>
                        <option data-name="state" data-value="">状态</option>
			            <option data-name="state" data-value="1">可用</option>
			            <option data-name="state" data-value="0">停用</option>
		          </select>
                  <select id="other-select" class="find_input" style="width:60px;" required>
                        <option data-name="all">其它</option>
			            <option data-name="name">姓名</option>
		              	<option data-name="phone">手机号</option>
			            <option data-name="email">邮箱</option>
		          </select>
                  <input type="text" id="search-input" class="find_input">
                  <button id="search-btn" class="check_btn search-btn">查询</button>
                  <button class="btn btn-danger batdel-btn" data-toggle="modal" data-target="#delModal" style="float:right;margin-left: 10px;">批量删除</button>
                  <button class="btn btn-success add-btn"data-toggle="modal" data-target="#addModal" style="float:right;margin-left: 10px;">新增</button>
              </p> 
        </div>
        
        <table id="table" class="table_style" style="margin: 0 auto" ></table>
        
      <div class="modal fade" style="" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="width:900px">
        <div class="modal-content">
            <div class="modal-header bg-primary" style="">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title text-center">添加会员</h4>
            </div>
            <div class="modal-body">
       <table id="layout-table" class="table table-condensed" style="">
       <!--  <caption style="text-align: center;">房间列表</caption> -->
        <thead>
        <tr>
        <th><input type="checkbox" name="all-check" class="add-checkbox"></th>
        <th>姓名</th>
        <th>性别</th>
        <th>手机号</th>
        </tr>
        </thead>
        <tbody class="add-tbody">
        <tr>
        <td><input type="checkbox" name="checkbox" class="add-checkbox"></td>
         <td><input type="text" name="name"></td>
         <td>
          <select style="width:60px;" required>
			            <option data-name="state" data-value="1">男</option>
			            <option data-name="state" data-value="0">女</option>
		  </select>
         </td>
         <td><input type="text" name="phone"></td>
        </tr>
        </tbody>
        </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="add-new" style="float:left;" id="">添加</button>
                <button type="button" class="btn btn-danger" id="add-remove" style="float:left;" id="">移除</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-success" id="add-submit">提交</button>
            </div>
      </div><!-- /.modal-content -->
      </div><!-- /.modal -->
      </div>
        

</div>
<script src="<%=path %>/static/js/employee/jquery/jQuery-2.2.0.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-editable.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table-zh-CN.min.js"></script>
<!-- 
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.zh-CN.js"></script>
 -->
<script src="<%=path %>/static/js/employee/bootstrap/bte.js"></script> 
<script src="<%=path %>/static/js/employee/admini/memberManage.js"></script>
<script>

</script>
</body>
</html>

