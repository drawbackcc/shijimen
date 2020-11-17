<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%String path = request.getContextPath();%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>注册页面</title>
     <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="../static/css/member/rest.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/register.css" />
</head>
<body>
<div class="kong">
    <div class="login">
        <a href="../index.html" class="logo">
            <img src="../static/image/member/login/logo.png" alt="" />
        </a>
        <h5>会员注册</h5>
        <div class="box">
            <div class="baseW">
                <input type="text" name="phone" placeholder="请输入手机号码" /><span></span>
            </div>
            <div class="ma">
                <input type="text" name="code" placeholder="请输入图片验证码"/>
                <img src="" alt="" class="icon" /><span></span>
            </div>
            <div class="baseW">
                <input type="password" name="password1" placeholder="密码(8-16位数字与字母组合)" /><span></span>
            </div>            
            <div class="baseW">
                <input type="password" name="password2" placeholder="确认密码" /><span></span>
            </div>
            <button id="register-btn">立即注册</button>
            <p>点击“立即注册”，即表示您同意并愿意遵守石继门大酒店<a href="javascript:void(0);">用户协议</a>和<a href="javascript:void(0);">隐私政策</a></p>
        </div>
    </div>
</div>
</body>
</html>
<script src="../static/js/member/jquery.js"></script>
<script src="../static/js/member/register.js"></script>