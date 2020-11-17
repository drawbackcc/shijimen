<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%String path = request.getContextPath();%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>会员中心--酒店订单</title>
    <link rel="stylesheet" type="text/css" href="../static/css/member/rest.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/base.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/member-center-hotelOrder.css" />
    <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
</head>
<style>

.mask{width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);display: none;position: fixed;z-index: 1;}
.commentbox{width: 420px;height: 250px;margin: 0 auto;background-color: rgba(255,255,255,1);padding: 18px;}
.boxhead{width: 100%;margin-bottom:5px; margin-right:10px; padding: 10px; background:#ef5b00; color:#fff;text-align:center;font-family:"微软雅黑";font-size:18px;}
.commentbox .close{float:right;}
.comment .box:hover{cursor:pointer;}
.commentbox .img .pic{width: 50%;}
.commentbox textarea{width: 100%; heoght: 100%; border:1px solid #ef5b00}
.commentbox button{color: #fff; background: #ef5b00; padding:5px; float:right;margin:10px; cursor:hand;}

</style>
<body style="background:#fafafa;">
<!-- header -->
<jsp:include page="/WEB-INF/jsp/member/common/member-center-head.jsp"/>
<!-- header over -->
<!-- message -->
	<div class="mask">
		<div class="commentbox">
		<div class="boxhead">订单评价<span class="close">X</span></div>
			<div class="img">
				<img class="pic" src="" alt="" />
			</div>
			<textarea></textarea>
			<button class="submitcomment" data-id="">提交评论</button>
		</div>
	</div>
	<div class="message">
    <div class="container">
        <div class="search_parent">
            <h2>会员中心</h2>
        </div>
        <div class="content">
            <div class="left">
                <dl class="on">
                    <dt><p>我的订单</p></dt>
                    <a href="member-center-hotelOrder.html?type=all">
                        <dd  class="in">
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
                    <h5>酒店订单</h5>
                    <div class="top">
                        <div onclick="clickall()" class='child <c:if test="${'all' eq type }">on</c:if>'>全部订单( <span>${allSize }</span> )</div>                       
                        <div onclick="clickwait()" class='child <c:if test="${'wait' eq type }">on</c:if>'>待入住( <span>${waitSize }</span> )</div>                         
                    </div>
                    <ul>
                    <c:forEach items="${orders}" var="order">
                    <li data-id="${order.orderID}">
                            <div class="title01">
                                订单：<span>${order.orderNum }  </span>
                                <em>下单时间：<fmt:formatDate value="${order.date }" pattern="yyyy-MM-dd" /></em>
                            </div>
                            <div class="content">
                                <div class="imgs">
                                <c:if test="${empty order.orderImage}">
                                    <img src="../static/image/member/center/1.jpg" alt="" />
                                </c:if>
                                <c:if test="${not empty order.orderImage}">
                                    <img src="<%=path %>/static/${order.orderImage}" alt="" />
                                </c:if>
                                </div>
                                <div class="money">
                                  <!--  <p>${order.layoutName }</p> --> 
                                  <p>${order.describe }</p>
                                    <span>入住日期: <fmt:formatDate value="${order.fromDate }" pattern="yyyy-MM-dd" /></span>
                                   <span> 退房日期: <fmt:formatDate value="${order.toDate }" pattern="yyyy-MM-dd" /></span>
                                </div>
                                <div class="number">${order.charge }</div>
                               
                                <div class="state">
                                <c:if test="${order.state eq 1 }">
                                   <c:if test="${order.inDate != null }"><p>已完成</p></c:if>
                                   <c:if test="${order.inDate == null }"><p>待入住</p></c:if>
                                </c:if>
                                <c:if test="${order.state ne 1 }">
                                   <p>已取消</p>
                                </c:if>
                                </div>
                                 <c:if test="${order.state eq 1 }">
                                  <div class="payment">
                                    <c:if test="${order.payState eq 0}">
                                       <span class="yes pay">付款</span>
                                       <span class="quxiao cancel">取消订单</span>
                                    </c:if>
                                    <c:if test="${order.payState eq 1}">
                         
                                       <span class="quxiao">已付款</span>
                                       <c:if test="${order.outDate != null and order.comment == null}"><span class="yes comment">评价</span></c:if>
                                    </c:if>
                                  </div>
                                  </c:if>
                            </div>
                        </li>
                    </c:forEach> 
                    </ul>
                    <div class="page">
                        <a href='member-center-hotelOrder?type=${type }&curPage=<c:if test="${curPage le 1 }">1</c:if><c:if test="${curPage gt 1 }">${curPage-1 }</c:if>&pageSize=${pageSize }' class="prev">&lt;&lt;</a>
                        <c:forEach var="page"  begin="1" end="${pageNum }">
                        <c:if test="${page eq curPage }"><a href="member-center-hotelOrder?type=${type }&curPage=${page }&pageSize=${pageSize }" class="page-c on">${page }</a></c:if>
                        <c:if test="${page ne curPage }"><a href="member-center-hotelOrder?type=${type }&curPage=${page }&pageSize=${pageSize }" class="page-c">${page }</a></c:if>
                        </c:forEach>
                        <a href='member-center-hotelOrder?type=${type }&curPage=<c:if test="${curPage ge pageNum }">${pageNum }</c:if><c:if test="${curPage lt pageNum }">${curPage+1 }</c:if>&pageSize=${pageSize }' class="next">&gt;&gt;</a>
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
<script src="../static/js/member/address.js"></script>
<script src="../static/js/member/member-center-hotelOrder.js"></script>
<script type="text/javascript">
function logout(){
	var r = confirm("确认退出吗")
	if (r == true) {
	window.location.href="logout";
	} else {
		
	}
}
function clickall(){
	console.log("点击全部订单");
	window.location.href="member-center-hotelOrder?type=all";
}
function clickwait(){
	console.log("点击未完成订单");
	window.location.href="member-center-hotelOrder?type=wait";
}
</script>