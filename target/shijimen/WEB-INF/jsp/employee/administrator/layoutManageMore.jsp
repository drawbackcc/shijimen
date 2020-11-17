<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
    <%String path = request.getContextPath();%>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
    <title></title>
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap-editable.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap-table.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/table.css" rel="stylesheet" type="text/css" />
  
    
</head>
<body style="background-color: #ecf0f5;font-family: 微软雅黑;color: #475059;min-width: 300px;overflow: auto">
<div class="notice_main">
        <div class="">
        <table id="room-table" class="table table-condensed" style="">
       <!--  <caption style="text-align: center;">房间列表</caption> -->
        <thead>
        <tr>
        <th>房间号</th>
        <th>楼层</th>
        <th>状态</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${rooms}" var="room" varStatus="status">
        <tr>
        <td>${room.plate }</td>
        <td>${room.floor }</td>
        <td><c:if test="${room.state == 1 }">可用</c:if><c:if test="${room.state ne 1 }">停用</c:if></td>
        </tr>
         </c:forEach>
        </tbody>
        </table>
        <table id="createdate-table" class="table table-condensed" style="">
        <thead>
        <tr>
        <th>创建时间</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td><fmt:formatDate value="${layout.create_date }" pattern="yyyy-MM-dd hh:mm" /></td>
        </tr>
        </tbody>
        </table>
        <table id="modifdate-table" class="table table-condensed" style="">
        <thead>
        <tr>
        <th>修改时间</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td><fmt:formatDate value="${layout.modif_date }" pattern="yyyy-MM-dd hh:mm" /></td>
        </tr>
        </tbody>
        </table>
        </div>

</div>
<script src="<%=path %>/static/js/employee/jquery/jQuery-2.2.0.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-editable.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table-zh-CN.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bte.js"></script> 
<script>

</script>
</body>
</html>

