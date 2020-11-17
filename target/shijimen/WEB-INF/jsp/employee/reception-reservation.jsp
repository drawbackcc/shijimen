<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%String path = request.getContextPath();%>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
    <title></title>
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap-table.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css">
   <link href="<%=path %>/static/css/employee/table.css" rel="stylesheet" type="text/css" />
  
</head>
<body style="background-color: #ecf0f5;font-family: 微软雅黑;color: #475059;min-width: 1000px;overflow: auto">
<div class="notice_main">
        <h6>前台预约</h6>
        <div style="border-bottom: 1px #ccc solid;padding-bottom: 8px">
            <p style="line-height: 24px;font-size: 14px;padding: 4px 0 0 36px ;color:#bb8940;background-image: url(<%=path %>/static/image/employee/ts_03.png);background-repeat: no-repeat;background-position: 10px 8px;font-weight: bold">温馨提示</p>
            <ul class="ts">
                <li><span>*</span>该页面主要用于办理前台预约和入住</li>
            </ul>
        </div>
        <div class="notice_check">
              <p>
                  <label>入住日期：</label><input type="text" class="find_input" id="datetimepicker1">
                  <label>退房日期：</label><input type="text" class="find_input" id="datetimepicker2">
                  <button class="check_btn" id="check-btn">查询</button>
                  <button class="check_btn" id="check-btn2">今天</button>
                  
                  <button class="btn btn-success" style="float:right;" data-toggle="modal" data-target="#addModal">预约</button>
                  <button class="btn btn-primary" style="float:right;margin-right:5px;" id="detail-view-btn">展开</button>
<!--                  <button class="check_btn">今日</button>-->
                  <span id="toolbar"></span>
              </p>
        </div>
    <table id="table" class="table_style" style="margin: 0 auto" ></table>
    
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary" style="height:40px;">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title text-center"></h4>
            </div>
            
            <div class="modal-body table-responsive">
              <table class="table">
                    <tbody class="add-tbody">
                    <tr>
                        <td>房型</td>
                        <td style="text-align: left"><input name="layout" type="text" value="" disabled style="border:0;outline:none;background:none;"></td>
                        <td>房号</td>
                        <td style="text-align: left">
                        <select id="plate-select" class="form-control" style="">
                        <!-- '<option value="2">303</option' -->
                        </select>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><b>入住时间</b></td>
                        <td style="text-align: left"><input class="form-control" type="text" id="datetimepicker3" readonly></td>
                        <td><b>退房时间</b></td>
                        <td style="text-align: left"><input class="form-control" type="text" id="datetimepicker4" readonly><!-- &nbsp;&nbsp;<span class="days">3</span>晚 --></td>                      
                    </tr>
                    <tr>
                        <td>总金额/元</td>
                        <td style="text-align: left"><input class="form-control" name="charge" type="text" value="" readonly> &nbsp;&nbsp;<span class="price"></span>元/晚</td>
                        <td>实收金额/元</td>
                        <td style="text-align: left"><input name="real-charge" class="hover-focus form-control" type="text" value=""></td>
                    </tr>
                    <tr>
                        <td>会员号</td>
                        <td style="text-align: left"><input name="member" class="hover-focus form-control" type="text" value=""></td>
                        <td>备注<span></span></td>
                        <td style="text-align:left;"><textarea class="form-control"></textarea></td>
                    </tr>
                     <tr class="person">
                        <td style="text-align: left"><input type="checkbox" name="checkbox" class="add-checkbox ">姓名</td>
                        <td style="text-align: left"><input type="text" name="name" class="hover-focus form-control" autocomplete="off"></td>
                        <td>身份证号</td>
                        <td style="text-align: left"><input type="text" name="idcard" class="hover-focus form-control" autocomplete="off"><span class="text-danger"></span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="add-new" style="float:left;" id="">添加</button>
                <button type="button" class="btn btn-danger" id="add-remove" style="float:left;" id="">移除</button>
                <span class="text-danger text-center"></span>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-success" data-lid="" data-rowindex="" id="book-submit">预约</button>
                <button type="button" class="btn btn-success" data-lid="" data-rowindex="" id="book-submit2">立即入住</button>
            </div>
      </div><!-- /.modal-content -->
      </div><!-- /.modal -->
      </div>

</div>
<script src="<%=path %>/static/js/employee/jquery/jQuery-2.2.0.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table-zh-CN.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="<%=path %>/static/js/employee/layer_v2.1/layer/layer.js"></script>
<script src="<%=path %>/static/plugins/jquery-ui/jquery-ui.min.js"></script>
<script src="<%=path %>/static/js/employee/layoutManage.js"></script>
<script>

</script>
</body>
</html>

