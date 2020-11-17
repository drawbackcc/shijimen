<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%String path = request.getContextPath();%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>找回密码</title>
    <link rel="stylesheet" type="text/css" href="../static/css/member/rest.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/register.css" />
    <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
</head>
<body>
<div class="kong">
    <div class="login">
        <a href="../index.html" class="logo">
            <img src="../static/image/member/login/logo.png" alt="" />
        </a>
        <h5>找回密码</h5>
        <div class="box">
            <!-- child box begin-->
          <div class="child-box1">
            <div class="baseW">
                <input id="phone-input" type="text" placeholder="请输入手机号码" />
            </div>
            <button id="get-code-btn" style="background-color: #d3dcdd;">获取验证码</button>
            <div class="baseW">
                <input id="code-input" type="text" placeholder="请输入验证码"/>
            </div>
            <button id="post-code-btn" style="background-color: #d3dcdd;">提交验证码</button>
          </div>
          <!-- child box over-->
            <!-- child box begin-->
           <div class="child-box2" style="visibility: hidden;">
            <div class="baseW">
                <input type="password" placeholder="请输入新密码" />
            </div>
            <div class="baseW">
                <input type="password" placeholder="请再次确认密码" />
            </div>
            <button>确认修改密码</button>
        </div>
            <!-- child box over-->
        </div>
</div>
</div>
</body>
</html>
<script src="../static/js/member/jquery.js"></script>
<script>
    $(function (){
        $("#get-code-btn").on("click",function(e){
            console.log("click get code btn");
        });

        $("#post-code-btn").on("click",function(e){
            console.log("click post code btn");
            $(".child-box1").hide();
            $(".child-box2").css("visibility","visible");

        });

        $("#get-code").on("click",function(e){

        });
    });
</script>