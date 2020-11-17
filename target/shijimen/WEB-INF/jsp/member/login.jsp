<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
 <%String path = request.getContextPath();%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>登录</title>
    <link rel="stylesheet" type="text/css" href="../static/css/member/rest.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/login.css" />
     <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
</head>
<body>
<div class="kong">
    <div class="login">
        <a href="../index.html" class="logo">
            <img src="../static/image/member/login/logo.png" alt="" />
        </a>
        <h5>登录</h5>
        <div class="box">
            <div class="baseW">
                <input type="text" placeholder="手机号码" />
            </div>
            <div class="baseW">
                <input type="password" placeholder="密码" />
            </div>
            <button class="login-btn">立即登录</button>
            <div class="register">
                <a href="register.html">注册账号</a>
                <a href="forget.html" class="nor">忘记密码</a>
            </div>
            <c:if test="${not empty sessionScope.memberName}">
<div><br><br>用户【${sessionScope.memberName}】已经在这个浏览器上登录了</div>
            </c:if>
        </div>
    </div>
</div>
</body>
</html>
<script src="../static/js/member/jquery.js"></script>
<script type="text/javascript">
function validatorTel(content){
    // 正则验证格式
    eval("var reg = /^1[34578]\\d{9}$/;");
    return RegExp(reg).test(content);
}
</script>
<script type="text/javascript">
    $(function (){
        $(".login-btn").on("click",function(e){
        	/*
        	if(!validatorTel($(":text").val())){
        		alert("手机号格式不对");
        		return;
        	}
        	*/
        	
        	$.ajax({
                url:'doLogin',
                type:'POST',
                data:{'phone':$(":text").val(), "password":$(":password").val()},
                xhrFields:{withCredentials:true},//跨域请求
                success:function (data) {
                	console.log("data:" + data);
                	if(data){
                		window.location.href = "member-center";
                	}else{
                		alert("账号或密码错误");
                	}
                },
                error:function(data){
                	alert("error");
                }
            });
        });
    });
</script>