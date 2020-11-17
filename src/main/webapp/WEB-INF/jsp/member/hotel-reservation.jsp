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
    <title>石继门--酒店预订</title>
    <link rel="stylesheet" type="text/css" href="static/css/member/rest.css" />
    <link rel="stylesheet" type="text/css" href="static/css/member/base.css" />
    <link rel="stylesheet" type="text/css" href="static/css/member/lq.datetimepick.css"/>
    <link rel="stylesheet" type="text/css" href="static/css/member/hotel-reservation.css" />
    <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
</head>
<body style="background:#fafafa url(static/image/member/index/h.png) no-repeat 90%  80%;">
<!-- header -->
<jsp:include page="/WEB-INF/jsp/member/common/head.jsp"/>
<!-- header over-->
<!-- banner -->
<!--<div class="banner" style="background-image:url(images/environment/banner.jpg);">-->
</div>
<!-- banner over -->
<div class="reserve">
    <div class="container">
        <div class="info">
            <div class="box">
                <div class="child">
                    <div class="form-group float-left w140">
                    <input type="text" name="datepicker" id="datetimepicker3" class="form-control" value="<fmt:formatDate value="${from }" pattern="yyyy-MM-dd" />" placeholder="入住时间"/>
                    </div>
              </div>
                <div class="child">
                    <div class="form-group float-left w140">
                    <input type="text" name="datepicker" id="datetimepicker4" class="form-control" value="<fmt:formatDate value="${to }" pattern="yyyy-MM-dd" />" placeholder="退房时间"/>
                    </div>
                </div>
                <div class="child btn" id="search-btn">查询</div>
            </div>
        </div>
    </div>
</div>
<!-- reservation -->
<div class="reservation">
    <div class="container">
        <div class="search_parent">
            <h2>房间预订</h2>
        </div>
        <ul>
        <c:forEach items="${layouts}" var="layout" varStatus="status">
            <a href="javascript:void(0);" class="detail-link" data-id="${layout.l_id }">
            <c:if test="${status.count % 2 == 0 }"><li></c:if>
            <c:if test="${status.count % 2 == 1 }"><li class="nor"></c:if>               
                    <div class="imgs">
                    <c:if test="${not empty layout.images }"><img src="static/${layout.images[0] }" alt="" /></c:if>  
                    <c:if test="${empty layout.images }"><img src="static/image/member/reservation/1.jpg" alt="" /></c:if>  
                    </div>
                    <div class="info">
                        <div class="name">
                            <h5>${layout.name }</h5>
                            <p>
                                <span>${layout.summarize }</span>
                             
                            </p>
                        </div>
                        <div class="money">
                        <c:if test="${layout.available }">
                        <span class="green">有房</span>
                        </c:if>
                        <c:if test="${not layout.available }">
                        <span class="red">已满</span>
                        </c:if>
                          |  ¥<em>${layout.price }</em>/晚
                        </div>
                    </div>
                </li>
            </a>
            </c:forEach>
        </ul>
    </div>
</div>
<!-- reservation over -->
<!-- footer -->
 <jsp:include page="/WEB-INF/jsp/member/common/footer.jsp"/>
<!-- footer over -->
</body>
<script src="static/js/member/jquery.js"></script>
<script src="static/js/member/base.js"></script>
<script src='static/js/member/lq.datetimepick.js'></script>
<script type="text/javascript">
$(function (){
    $(".reservation ul li").each(function(i,n){
        var dtime=i*0.4;
        
        base.anClasAdd($(n),"scaleIn",".6s",dtime+"s","ease-in-out","both");
    }); 
    $("#datetimepicker3").on("click",function(e){
        e.stopPropagation();
        $(this).lqdatetimepicker({
            css : 'datetime-day',
            dateType : 'D',
            selectback : function(){

            }
        });

    });    
    $("#datetimepicker4").on("click",function(e){
        e.stopPropagation();
        $(this).lqdatetimepicker({
            css : 'datetime-day',
            dateType : 'D',
            selectback : function(){

            }
        });

    });
    
    function checkDate(){
    	from_date = new Date($("#datetimepicker3").val());
        to_date = new Date($("#datetimepicker4").val());
        console.log('click search');
        console.log('from date ' + from_date);
        console.log('to date ' + to_date);
        if (from_date.getTime() == to_date.getTime()){
            console.log('时间不能一样');
            alert("时间不能一样");
            return false;
        }
        if (from_date.getTime() > to_date.getTime()){
            console.log("退房时间不能早于入住时间");
            alert("退房时间不能早于入住时间");
            return false;
        }
        return true;
    }
    
    $("#search-btn").on("click",function(e){
    	if(checkDate() == false) return;     
        window.location.href = "hotel-reservation?from=" + $("#datetimepicker3").val() + "&to=" + $("#datetimepicker4").val();
       
    });
    
    $(".detail-link").on("click",function(e){
    	if(checkDate() == false) return;   
    	window.location.href = "" + $(this).data("id") + "/hotel-reservation-detail?from=" + $("#datetimepicker3").val() + "&to=" + $("#datetimepicker4").val();
    });
});
</script>