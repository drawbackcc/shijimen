<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%String path = request.getContextPath();%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>石继门大酒店--首页</title>
    <link rel="stylesheet" type="text/css" href="static/css/member/rest.css" />
    <link rel="stylesheet" type="text/css" href="static/css/member/lq.datetimepick.css"/>

    <link rel="stylesheet" type="text/css" href="static/css/member/base.css" />
    <link rel="stylesheet" type="text/css" href="static/css/member/index.css" />
    <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
</head>
<body>
<!-- header -->
<jsp:include page="/WEB-INF/jsp/member/common/head.jsp"/>
<!-- 
 -->
<!-- header over-->
<!-- banner -->
<div class="bigBanner">
    <div class="banner01">
        <div class="content01" style="background-image:url(static/image/member/index/show1.jpg)"></div>
        <div class="content01" style="background-image:url(static/image/member/index/show3.jpg)"></div>
        <div class="max-container01">
            <div class="btn01 prev" onclick="banner01.todo({'direc':'-'})"></div>
            <div class="btn01 next" onclick="banner01.todo({'direc':'+'})"></div>
        </div>
    </div>
    <div class="xiala"></div>
    <div class="reserve">
        <div class="bg"></div>
        <div class="container">
            <div class="info">
                <h5><em>在线预订</em></h5>
                <span><img src="static/image/member/index/line.png" alt="" /></span>
                <div class="box">
                    <div class="child">
                        <div class="form-group float-left w140">
                        <input type="text" name="datepicker" id="datetimepicker3" class="form-control" value="" placeholder="入住时间" autocomplete="off"/>
                        </div>
                    </div>
                    <div class="child">
                        <div class="form-group float-left w140">
                        <input type="text" name="datepicker" id="datetimepicker4" class="form-control" value="" placeholder="退房时间" autocomplete="off"/>
                        </div>
                    </div>
                    <div class="child btn" id="search-btn">查询</div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- banner over -->

<!-- footer -->
 <jsp:include page="/WEB-INF/jsp/member/common/footer.jsp"/>
<!-- footer over -->
</body>
</html>
<script src="static/js/member/jquery.js"></script>
<script src="static/js/member/base.js"></script>
<script src="static/js/member/dydong.change.js"></script>
<script src="static/js/member/index.js"></script>
<script src="static/js/member/reserve.js"></script>
<script src="static/js/member/show.js"></script>
<script src='static/js/member/lq.datetimepick.js'></script>