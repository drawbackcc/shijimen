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
<body style="background-color: #ecf0f5;font-family: 微软雅黑;color: #475059;min-width: 1000px;overflow: auto">
<div class="notice_main">
        <h6>雇员管理</h6>
        <div style="border-bottom: 1px #ccc solid;padding-bottom: 8px">
            <p style="line-height: 24px;font-size: 14px;padding: 4px 0 0 36px ;color:#bb8940;background-image: url(<%=path %>/static/image/employee/ts_03.png);background-repeat: no-repeat;background-position: 10px 8px;font-weight: bold">温馨提示</p>
            <ul class="ts">
                <li><span>*</span>该页面主要用于查看雇员信息</li>
            </ul>
        </div>
     
        <div class="notice_check">
              <p>
                  <select id="state-select" class="find_input" style="width:60px;" required>
                        <option data-name="state" data-value="">状态</option>
			            <option data-name="state" data-value="1">在职</option>
			            <option data-name="state" data-value="0">离职</option>
		          </select>
                  <select id="other-select" class="find_input" style="width:60px;" required>
                        <option data-name="all">其它</option>
			            <option data-name="emplNum">工号</option>
		              	<option data-name="name">姓名</option>
			            <option data-name="phone">手机号</option>
			            <option data-name="idCard">身份证</option>
		          </select>
                  <input type="text" id="search-input" class="find_input">
                  <button id="search-btn" class="check_btn search-btn">查询</button>
                  <button class="btn btn-danger batdel-btn" data-toggle="modal" data-target="#delModal" style="float:right;margin-left: 10px;">批量删除</button>
                  <button class="btn btn-success add-btn" data-toggle="modal" data-target="#addModal" style="float:right;margin-left: 10px;">新增</button>
              </p> 
        </div>
         <div id="toolbar"></div>
        
        <table id="table" class="table_style" style="margin: 0 auto" ></table>

		<div class="modal fade" style="" id="addModal" tabindex="-1"
			role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 900px">
				<div class="modal-content">
					<div class="modal-header bg-primary" style="">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title text-center">添加员工</h4>
					</div>
					<div class="modal-body">
						<table id="layout-table" class="table table-condensed" style="">
							<!--  <caption style="text-align: center;">房间列表</caption> -->
							<thead>
								<tr>
									<th><input type="checkbox" name="all-check"
										class="add-checkbox"></th>
									<th>工号</th>
									<th>姓名</th>
									<th>性别</th>
									<th>身份证</th>
									<th>手机号</th>
									<th>入职日期</th>
								</tr>
							</thead>
							<tbody class="add-tbody">
								<tr>
									<td><input type="checkbox" name="checkbox"
										class="add-checkbox"></td>
									<td><input type="text" name="emplNum"></td>
									<td><input type="text" name="name"></td>
									<td><select style="width: 60px;" required>
											<option data-name="state" data-value="1">男</option>
											<option data-name="state" data-value="0">女</option>
									</select></td>
									<td><input type="text" name="idCard"></td>
									<td><input type="text" name="phone"></td>
									<td><input type="text" name="emplDate"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" id="add-new"
							style="float: left;" id="">添加</button>
						<button type="button" class="btn btn-danger" id="add-remove"
							style="float: left;" id="">移除</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-success" id="add-submit">提交</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>


		<div class="modal fade" style="" id="passwordModal" tabindex="-1"
			role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 600px">
				<div class="modal-content">
					<div class="modal-header bg-primary" style="">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title text-center">修改密码</h4>
					</div>
					<div class="modal-body">
						<form class="form-horizontal" role="form">
							<div class="form-group">
								<label for="password1" class="col-sm-4 control-label">新密码</label>
								<div class="col-sm-8">
									<input type="password" class="form-control" id="password1"
										placeholder="请输入新密码">
								</div>
							</div>
							<div class="form-group">
								<label for="password2" class="col-sm-4 control-label">确认新密码</label>
								<div class="col-sm-8">
									<input type="password" class="form-control" id="password2"
										placeholder="请再次输入新密码">
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
					    <span class="text-danger"></span>
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-success" data-id="" id="password-submit">提交</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>


	</div>
<script src="<%=path%>/static/js/employee/jquery/jQuery-2.2.0.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-editable.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table-zh-CN.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bte.js"></script> 

<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table-export.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/tableExport.js"></script>

<script src="<%=path %>/static/js/employee/admini/employeeManage.js"></script>
<script>

</script>
</body>
</html>

