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
table-layout:fixed;
empty-cells:show;
border-collapse: collapse;
margin:0 auto;
border:1px solid #cad9ea;
color:#666;
background:#d6e6f2;
/*box-shadow: 0 2px 16px #000, 0 0 1px #000, 0 0 1px #000;  */
/*box-shadow:0px 0px  10px 5px #aaa;*/
box-shadow: 4px 5px 6px 7px rgba(82,97,107,0.5);
margin-bottom:10px;
}

.mytable td{
height:30px;
}
.mytable h1,h2,h3{
font-size:12px;
margin:0;
padding:0;
}

.mytable th {
background-repeat:repeat-x;
height:30px;
}
.mytable tr{
}
.mytable tr:hover{
background:#d6e6f2;
}
.mytable td,.mytable th{
/*border:1px solid #dbe2ef;*/
padding:0 1em 0;
}
.mytable tr.alter{
background-color:#355c7d;
}
#table thead{
background:#000;
}
</style>
<body style="background-color: #ecf0f5;font-family: 微软雅黑;color: #475059;min-width: 1000px;overflow: auto">
<div class="notice_main">
        <h6>信息登记</h6>
        <div class="notice_check">
              <p>
                  <select id="type-select" class="find_input" style="width:80px;" required>
                        <option data-name="type" data-value="">订单类型</option>
			            <option data-name="reception">前台</option>
			            <option data-name="internet">网上</option>
		          </select>
                  <select id="other-select" class="find_input" style="width:60px;" required>
                        <option data-name="all">其它</option>
                        <option data-name="orderNum">订单号</option>
			            <option data-name="plate">房间号</option>
		              	<option data-name="people">入住人</option>	
		          </select>
		          <input type="text" id="other-input" class="find_input">
		          <select id="time-select" class="find_input" style="width:80px;" required>
                        <option data-name="all">时间</option>
                        <option data-name="date">创建时间</option>
			            <option data-name="from">住房时间</option>			            
		          </select>
		           <input type="text" id="datetimepicker1" class="find_input" style="width:100px;" placeholder="">-
		           <input type="text" id="datetimepicker2" class="find_input" style="width:100px;" placeholder="">
		           <button id="search-btn" class="check_btn search-btn">查询</button>
		           <button class="btn btn-primary" style="float:right;" id="detail-view-btn">展开全部</button>
              </p> 
        </div>
        <!-- 
        <table id="table" class="table_style" style="margin: 0 auto" data-classes="table table-hover" data-search="true" data-show-refresh="true" data-show-toggle="true" data-show-columns="true"></table>
         -->
         <table id="table" class="table_style" style="margin: 0 auto"></table>
         
         
         <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary" style="height:40px;">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title text-center"></h4>
            </div>
         <div class="modal-body table-responsive">
              <table class="table table-striped table-bordered table-hover table-condensed">
              <caption class="text-center"></caption>
              <thead>
                  <tr>
                  <th></th>
                  <th>姓名</th>
                  <th>身份证号</th>
                  <th>操作</th>
                 </tr>
             </thead>
                    <tbody class="add-tbody">
                    <tr>
                       <td><input type="checkbox"></td>
                       <td><input type="text" name="name" autocomplete='off' class="form-control"></td>
                       <td><input type="text" name="idcard" autocomplete='off' class="form-control"></td>
                       <td><button name="add-person-btn" class="btn btn-primary btn-xs">添加</button>
                       <button name="add-person-btn2" class="btn btn-primary btn-xs">立即入住</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">           
                <button type="button" name="add-line-btn" class="btn btn-primary" style="float:left;">添加行</button>
                <button type="button" name="remove-line-btn" class="btn btn-primary" style="float:left;display:none;">移除选中行</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" name="add-all-btn">全部添加</button>
                <button type="button" class="btn btn-primary" name="all-checkin-btn">全部入住</button>
                <input type="hidden" data-oid="">
            </div>
      </div><!-- /.modal-content -->
      </div><!-- /.modal -->
      </div>
      <!-- 
       <div class="modal fade" id="opraModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary" style="height:40px;">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title text-center"></h4>
            </div>
         <div class="modal-body table-responsive">
              <table class="table table-striped table-bordered table-hover table-condensed">
              <caption class="text-center"></caption>
              <thead>
                  <tr>
                  <th>姓名</th>
                  <th>身份证号</th>
                  <th>操作</th>
                 </tr>
             </thead>
                    <tbody>
                    <tr>
                       <td><label>张三</label></td>
                       <td><label>44082319970102333</label></td>
                       <td><button name="aready-checkin-btn" data-id="">已入住</button>&nbsp;
                       <button name="deal-checkout-btn" data-id="">办理退房</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button class="btn btn-primary" name="all-checkin-btn">全部入住</button>
                <button class="btn btn-primary" name="all-checkout-btn">全部退房</button>
            </div>
      </div> 
      </div> 
      </div>
      -->
      
      <div class="modal fade" style="" id="payModal" tabindex="-1"
			role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 400px">
				<div class="modal-content">
					<div class="modal-header bg-primary" style="">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title text-center"></h4>
					</div>
					<div class="modal-body">
						<form class="form-horizontal" role="form">
							<div class="form-group">
								<label for="" class="col-sm-4 control-label">应收取/元</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" name="charge" disabled>
								</div>
							</div>
							<div class="form-group">
								<label for="" class="col-sm-4 control-label">实际收取/元</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" name="real-charge">
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
					    <span class="text-danger"></span>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-success" data-id="" id="pay-submit">确认付款</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>

</div>
<script src="<%=path %>/static/js/employee/jquery/jQuery-2.2.0.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-editable.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table-zh-CN.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bte.js"></script> 
<script src="<%=path %>/static/plugins/jquery-ui/jquery-ui.min.js"></script>
<script src="<%=path %>/static/js/employee/checkinandout.js"></script>
<script>

</script>
</body>
</html>