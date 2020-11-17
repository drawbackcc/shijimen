<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>登录</title>
<link href="../static/css/employee/login.css" rel='stylesheet' type='text/css' />
</head>
<body style="overflow: hidden">
	<div class="main">
		<div class="login-form">
			<h1>后台管理系统</h1>
			<div class="head"><img src="../static/image/employee/adminLogin.png" alt=""/></div>
			<div id="loginForm" class="form">
				<input type="text" placehoder="工号"/>
				<input type="password" placehoder="密码" />
				<input type="radio" name="type" value="0" checked /><span class="lableStyle">员工</span>
				<input type="radio" name="type" value="1" /><span class="lableStyle">管理员</span>
				<div class="submit">
					<input type="submit" value="登录" id="btn_login" class="">
				</div>
			</div>
		</div>
	</div>
	<script src="../static/js/employee/jquery/jQuery-2.2.0.min.js"></script>
	<script src="../static/js/employee/login.js"></script>
</body>
</html>