<%--<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>--%>
<%--<%String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath(); %>--%>
<%--<!DOCTYPE html>--%>
<%--<html>--%>
<%--<script>--%>
<%--  function getBasePath(){--%>
<%--	    return '<%=basePath%>';--%>
<%--  }--%>
<%--</script>--%>
<%--<link rel="stylesheet" href="static/css/plugin/bootstrap.css">--%>
<%--<head>--%>
<%--<meta charset="utf-8">--%>
<%--<title>Index练习</title>--%>
<%--</head>--%>
<%--<body>--%>
<%--<a href="user.spring">click here(user.spring)</a><br>--%>
<%--<a href="user.xxx">click here(user.xxx)</a><br>--%>
<%--<a href="user">click here(user)</a><br>--%>
<%--<a href="users.xxx">click here(users.xxx)</a><br>--%>
<%--<p><%=basePath %></p>--%>
<%--<ul class="nav nav-tabs nav-justified">--%>
<%--  <li class="active"><a href="#">Home</a></li>--%>
<%--  <li><a href="#">SVN</a></li>--%>
<%--  <li><a href="#">iOS</a></li>--%>
<%--  <li><a href="#">酒店信息</a></li>--%>
<%--  <li><a href="#">积分商城</a></li>--%>
<%--  <li><a href="#">登录/注册</a></li>--%>
<%--</ul>--%>
<%--</body>--%>
<%--</html>--%>

<%--<jsp:forward page="<%=request.getContextPath()%>/e/index"></jsp:forward>--%>

<% response.sendRedirect(request.getContextPath() + "/e/index");  %>