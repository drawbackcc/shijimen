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
    <title>${layout.name }--详细信息</title>
    <link rel="stylesheet" type="text/css" href="../static/css/member/rest.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/base.css" />
    <link rel="stylesheet" type="text/css" href="../static/css/member/lq.datetimepick.css"/>
    <link rel="stylesheet" type="text/css" href="../static/css/member/hotel-reservation-detali.css" />
    <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
</head>
<body style="background:#fafafa;">
<!-- header -->
<div id="header">
    <div class="container">
        <a href="../index">
            <div class="m-logo">
                <img src="../static/image/member/logo.png" alt="" />
            </div>
        </a>
        <div class="bigBox00"></div>
        <div class="wapBtn">
            <span class="one"></span>
            <span class="two"></span>
            <span class="three"></span>
        </div>
        <ul class="nav">
            <div class="navTop"></div>
            <a href="../index">
                <li class="on"><span>首页</span><em>首页</em></li>
            </a>
            <a href="../hotel-environment">
                <li><span>酒店环境</span><em>酒店环境</em></li>
            </a>
            <a href="../hotel-environment">
                <li><span>酒店政策</span><em>酒店政策</em></li>
            </a>
            <a href="../index">
                <li class="logo">
                    <img src="../static/image/member/logo.png" alt="" />
                </li>
            </a>
            <a href="../goods-online">
                <li><span>积分商城</span><em>积分商城</em></li>
            </a>
            <a href="../hotel-contact">
                <li><span>联系我们</span><em>联系我们</em></li>
            </a>
            <div class="login">
                <a href="../member/member-center" class="login-c">
                </a>
            </div>
        </ul>
    </div>
</div>
<div class="kong"></div>
<!-- header over-->
<!-- banner -->
<!--<div class="banner02" style="background-image:url(images/environment/banner.jpg);">-->
</div>
<!-- banner over -->
<!-- reservation -->
<div class="reservation">
    <div class="container">
        <div class="head">
                <div class="box">
                    
                    <div class="box_big">
                        <span class="anniu prev">
                            <img src="../static/image/member/reservation/left.png" alt="" />
                        </span>
                        <span class="anniu next">
                            <img src="../static/image/member/reservation/right.png" alt="" />
                        </span>
                        <ul class="pic_box">
                        <c:if test="${not empty layout.images }">
                         <c:forEach items="${layout.images}" var="image" varStatus="status">
                         <li><img src="../static/${image }"  alt="" class="imgs" /></li>
                         </c:forEach>
                        </c:if> 
                        <c:if test="${empty layout.images }">
                         <li> <img src="../static/image/member/reservation/banner.jpg"  alt="" class="imgs" /></li>
                            <li><img src="../static/image/member/reservation/banner.jpg" alt="" class="imgs"/></li>
                            <li><img src="../static/image/member/reservation/banner.jpg"  alt="" class="imgs"/></li>
                             <li><img src="../static/image/member/reservation/banner.jpg"  alt="" class="imgs"/></li>
                              <li> <img src="../static/image/member/reservation/banner.jpg"  alt="" class="imgs" /></li>
                               <li> <img src="../static/image/member/reservation/banner.jpg"  alt="" class="imgs" /></li>
                            <li><img src="../static/image/member/reservation/banner.jpg" alt="" class="imgs"/></li>
                            <li><img src="../static/image/member/reservation/banner.jpg"  alt="" class="imgs"/></li>
                             <li><img src="../static/image/member/reservation/banner.jpg"  alt="" class="imgs"/></li>
                              <li> <img src="../static/image/member/reservation/banner.jpg"  alt="" class="imgs" /></li>
                        </c:if>
                        </ul>
                    </div>
                    <div class="box_litle">
                    </div>   
                </div>
            </div> 
        <div class="info">
            <div class="txt">
                <h6>${layout.name }</h6>
                <p>${layout.summarize }</p>
                <p><span>价格</span><em>¥<i>${layout.price }</i>/晚</em></p>
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
                <div class="button" id="total-price" data-price="${layout.price }" style="background:#f5f5f5; color:#696969;">共${nights }晚，${totalMoney }元</div>               
                <a href="javascript:void(0);" id="book-btn"><div class="button">立即预定</div></a>
            </div>
        </div>
    </div>
</div>
<!-- reservation over -->
<!--introduce or comment-->
<div class="intro-com">
    <a class="intro-link">详情</a>
    <a class="com-link">评论</a>
</div>
<!--introduce or comment over-->
<!-- Introduce -->
<div class="introduce" id="introduce-div">
    <div class="container">
        <div class="infos">
        <p>${layout.describe }</p>
        </div>
        <p class="imgs"><img src="../static/image/member/reservation/bg.png" alt="" /></p>
    </div>
</div>

<div class="introduce comment" id="comment-div" style="display:none;" data-id="${layout.l_id }">
    <div class="container">
        <div class="infos">
        
            <ul>
            <!-- 
                    <li>
                        <p class="user">2**p</p> <p class="time">2015-05-02</p>
                        <p class="txt">难以形容，人生第一次收到小卡片……</p>
                        <p class="reply">尊敬的张女士，感谢您选择石继门大酒店！但是请您以后入住酒店注意关好门窗！避免不必要的财产损失！尊敬的张女士，感谢您选择石继门大酒店！但是请您以后入住酒店注意关好门窗！尊敬的张女士，感谢您选择石继门大酒店！但是请您以后入住酒店注意关好门窗！</p>
                    </li>
                    <li>
                        <p class="user">张**</p><p class="time">2015-05-02</p>
                        <p class="txt">主打的低碳环保建筑理念，内部环境以木质的新中式室内和家具设计为主，宽敞明亮，柔和的色调和原色的木制家具营造出温馨的环境。进口床垫，高等级纯棉精纺用品和布件，主打的低碳环保建筑理念，内部环境以木质的新中式室内和家具设计为主，宽敞明亮，柔和的色调和原色的木制家具营造出温馨的环境。进口床垫，高等级纯棉精纺用品和布件，恭喜您注册成为中民集装箱酒店会员！</p>
                    </li>
                    <li>
                        <p class="user">用**户</p><p class="time">2015-05-02</p>
                        <p class="txt">恭喜你永远失去我这个尊贵的会员了</p>
                        <p class="reply">客观别走呀！有什么事咱们坐下来好好商量一下！</p>
                    </li>
                    -->
            </ul>
            
            <div class="page">
            </div>
             <p class="imgs"><img src="../static/image/member/reservation/bg.png" alt="" /></p>
        </div>
    </div>
</div>
<!-- Introduce over -->
<!-- footer -->
<!-- footer -->
 <jsp:include page="/WEB-INF/jsp/member/common/member-footer.jsp"/>
<!-- footer over -->
<!-- footer over -->
</body>
<script src="../static/js/member/jquery.js"></script>
<script src="../static/js/member/base.js"></script>
<script src='../static/js/member/lq.datetimepick.js'></script>
<script src="../static/js/member/animate.js"></script>
<script src="../static/js/member/hotel-reservation-detail.js"></script>
<script type="text/javascript">
datas({'time':'20000'});//第一个轮播的时间 2000可设置其他数字 1000 = 1秒

</script>
