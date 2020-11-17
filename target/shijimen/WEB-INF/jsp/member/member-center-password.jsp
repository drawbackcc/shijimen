<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%String path = request.getContextPath();%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>会员中心--密码管理</title>
     <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="../static/css/member/rest.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/base.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/member-center-information.css" />
</head>
<body style="background:#fafafa;">
<!-- header -->
<jsp:include page="/WEB-INF/jsp/member/common/member-center-head.jsp"/>
<!-- header over-->
<!-- message -->
<div class="message">
    <div class="container">
        <div class="search_parent">
            <a><h2>会员中心</h2></a>
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
                    <a href=""member-center-password.html"">
                        <dd class="in">
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
                    <h5>密码管理</h5>
                    <div class="personal">
                        <div class="baseW">
                            <label for="oldpass">请输入旧密码：</label>
                            <input type="password" id="oldpass" />
                        </div>
                        <button id="submit" data-id=${sessionScope.memberID } onclick="submit()">提 交</button>
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
<script src="../static/js/member/member-center-password.js"></script>
<script type="text/javascript">
    $(function(){
        var ss = $('.message .content .right').height();
        $('.message .left').height(ss)
    })
</script>