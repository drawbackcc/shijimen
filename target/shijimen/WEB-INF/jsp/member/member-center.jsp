<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%String path = request.getContextPath();%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>石继门--会员中心</title>
     <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="../static/css/member/rest.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/base.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/member-center.css" />
</head>
<body style="background:#fafafa;">
<!-- header -->
<jsp:include page="/WEB-INF/jsp/member/common/member-center-head.jsp"/>
<!-- header over-->
<!-- message -->
<div class="message">
    <div class="container">
        <div class="search_parent">
            <h2>会员中心</h2>
        </div>
        <div class="content">
            <div class="left">
                <dl>
                    <dt><p>我的订单</p></dt>
                    <a href="member-center-hotelOrder.html?type=all">
                        <dd>
                            <p>酒店订单</p>
                        </dd>
                    </a>
                </dl>
                <dl>
                    <dt><p>基本信息</p></dt>
                    <a href="member-center-information.html">
                        <dd>
                            <p>个人信息</p>
                        </dd>
                    </a>                    
                    <a href="member-center-password.html">
                        <dd>
                            <p>密码管理</p>
                        </dd>
                    </a>                   
                    <a href="member-center-message.html">
                        <dd>
                            <p>系统消息</p>
                        </dd>
                    </a>
                     <a href="javascript:void(0);" onclick="logout()">
                        <dd>
                            <p>退出登录</p>
                        </dd>
                    </a>
                </dl>
            </div>
            <div class="right">
                <div class="info">
                    <h5>欢迎您！<span style="color:#ea5706;">${sessionScope.memberName}</span></h5><br>
                    <p>您可以在右侧导航栏查看和管理您的信息</p>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- message over -->
<!-- footer -->
 <jsp:include page="/WEB-INF/jsp/member/common/member-footer.jsp"/>
<!-- footer over -->
<script src="../static/js/member/jquery.js"></script>
<script src="../static/js/member/base.js"></script>
<script type="text/javascript">
    $(function(){
        var ss = $('.message .content').height();
        $('.message .left').height(ss);
    })
</script>
<script type="text/javascript">
function logout(){
	var r = confirm("确认退出吗")
	if (r == true) {
	window.location.href="logout";
	} else {
		
	}
}
</script>