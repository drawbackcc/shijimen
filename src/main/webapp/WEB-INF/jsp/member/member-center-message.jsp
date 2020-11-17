<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%String path = request.getContextPath();%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>会员中心--系统消息</title>
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
        <div class="search_parent1">
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
                <dl class="on">
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
                        <dd class="in">
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
                    <h5>系统信息</h5>
                    <ul>
                        <a href="">
                            <li class="current">
                                <div class="dotted"></div>
                                <p class="txt">恭喜您注册成为酒店会员！</p>
                                <p class="time">2015-05-02</p>
                            </li>
                        </a>
                        <a href="">
                            <li class="current">
                                <div class="dotted"></div>
                                <p class="txt">恭喜您注册成为酒店会员！</p>
                                <p class="time">2015-05-02</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <div class="dotted"></div>
                                <p class="txt">恭喜您注册成为酒店会员！</p>
                                <p class="time">2015-05-02</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <div class="dotted"></div>
                                <p class="txt">恭喜您注册成为酒店会员！</p>
                                <p class="time">2015-05-02</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <div class="dotted"></div>
                                <p class="txt">恭喜您注册成为酒店会员！</p>
                                <p class="time">2015-05-02</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <div class="dotted"></div>
                                <p class="txt">恭喜您注册成为酒店会员！</p>
                                <p class="time">2015-05-02</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <div class="dotted"></div>
                                <p class="txt">恭喜您注册成为酒店会员！</p>
                                <p class="time">2015-05-02</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <div class="dotted"></div>
                                <p class="txt">恭喜您注册成为酒店会员！</p>
                                <p class="time">2015-05-02</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <div class="dotted"></div>
                                <p class="txt">恭喜您注册成为酒店会员！</p>
                                <p class="time">2015-05-02</p>
                            </li>
                        </a>
                    </ul>
                    <div class="page">
                        <a href="" class="prev">&lt;&lt;</a>
                        <a href="" class="page-c on">1</a>
                        <a href="" class="page-c">2</a>
                        <a href="" class="page-c">3</a>
                        <a href="" class="page-c">4</a>
                        <a href="" class="page-c">5</a>
                        <a href="" class="page-c">6</a>
                        <a href="" class="page-c">7</a>
                        <a href="" class="next">&gt;&gt;</a>
                    </div>
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