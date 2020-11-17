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
    <title>会员中心--个人信息</title>
    <link rel="stylesheet" type="text/css" href="../static/css/member/rest.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/base.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/member-center-information.css" />
     <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
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
                        <dd class="in">
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
                    <h5>个人信息</h5>
                  <!--  <form action="" class="personal"> --> 
                  <div class="personal"> 
                        <div class="baseW">
                            <label for="s">昵称：</label>
                            <input type="text" name="name" id="s" value="${member.name }"/>
                            <input type="hidden" name="memID"  value="${member.memID }"/>
                        </div>
                        <div class="baseW">
                            <label for="s1">手机号：</label>
                            <input type="text" name="" id="s1" value="${member.phone }" readonly="readonly"/>
                        </div>
                        <div class="baseW">
                            <label for="s2">电子邮箱：</label>
                            <input type="text" name="email" id="s2" value="${member.email }"/>
                        </div>
                        <div class="baseR">
                            <label for="">性别：</label>
                            <div class="s">
                                <input type='radio'  <c:if test="${member.gender eq 1 }">checked</c:if> name="gender" value="1"/>
                                <span>男</span>
                            </div>
                            <div class="s">
                                <input type='radio' <c:if test="${member.gender eq 0 }">checked</c:if> name="gender" value="0"/>
                                <span>女</span>
                            </div>
                        </div>
                         <div class="baseT">
                            <label for="">留言：</label>
                            <textarea name="selfPs" id="" cols="30" rows="10">${member.selfPs }</textarea>
                        </div>
                        <button onclick="submit()">提 交</button>
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
<!-- 
<script src="../static/js/member/china.js"></script>
 -->
<script src="../static/js/member/base.js"></script>
<script src="../static/js/member/member-center-information.js"></script>
<script type="text/javascript">
    $(function(){
        var ss = $('.message .content .right').height();
        $('.message .left').height(ss)
    })
</script>
<script type="text/javascript">
/*
function $(id){
    return document.getElementById(id);
}
*/
</script>