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
    <title>石继门-订单确认</title>
    <link rel="stylesheet" type="text/css" href="static/css/member/rest.css" />
    <link rel="stylesheet" type="text/css" href="static/css/member/base.css" />
    <link rel="stylesheet" type="text/css" href="static/css/member/lq.datetimepick.css"/>
    <link rel="stylesheet" type="text/css" href="static/css/member/hotel-reservation-detali01.css" />
    <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
</head>
<style>
.bg-gray {
background: #f5f5f5;
color: #000;
}
</style>
<body style="background:#fafafa;">
<!-- header -->
<jsp:include page="/WEB-INF/jsp/member/common/head.jsp"/>
<!-- header over-->
<!-- reservation -->
<div class="reservation">
    <div class="container">
        <div class="search_parent">
            <h2>订单确认</h2>
        </div>
        <div class="content">
            <div class="top">
                <div class="imgs">
                <c:if test="${not empty layout.images }">
                <img src="static/${layout.images[0] }" alt="" />
                </c:if>
                 <c:if test="${empty layout.images }">
                 <img src="static/image/member/reservation/img01.jpg" alt="" />
                </c:if>
                    
                </div>
                <div class="infos">
                    <div class="info">
                        <h6>${layout.name }</h6>
                        <p>
                            <span>${layout.summarize }</span>
                        </p>
                        <p class="jiage">
                            <i>价格</i>
                            <span>¥<em>${layout.price }</em>/晚</span>
                        </p>
                        <p class="all">
                            <i>总额</i>
                            <span>¥<em>${charge }</em></span>
                        </p>
                        <p>入住时间：<span class="from"><fmt:formatDate value="${from }" pattern="yyyy-MM-dd" /></span></p>
                        <p>退房时间：<span class="to"><fmt:formatDate value="${to }" pattern="yyyy-MM-dd" /></span></p>
                    </div>
                </div>
            </div>
            <ul class="person">
                <li>
                    <span>联系人：<input name="name" type="text" value="${name }"></span>
                    <span>联系电话：<input name="phone" type="text" value="${phone }"></span>
                    <span>备注：<input name="ps" type="text" placeholder="可不填"></span>
                    <a class="remove" onclick="remove(this)"></a>
                </li>
            </ul>
            <div class="add-person"><a class="add-link">&nbsp;+&nbsp;</a></div>
            <div class="jiesuan">
                <p>合计：￥<span>${charge }</span></p>
                <button id="check-btn" data-id="${layout.l_id }">结算</button>
            </div>
        </div>
    </div>
</div>
<!-- reservation over -->
<!-- footer -->
<jsp:include page="/WEB-INF/jsp/member/common/footer.jsp"/>
<!-- footer over -->
<script src="static/js/member/jquery.js"></script>
<script src="static/js/member/base.js"></script>
<script>
function remove(link) {
    //alert(e.className);
     $(link).parent().remove();
}
$(function(){
    $(".add-link").on("click", function () {
        $(".person").append('<li>' +
                            '<span>联系人：<input name="name" type="text"></span>' +
                            '<span>联系电话：<input name="phone" type="text"></span>' +
                            '<span>备注：<input name="ps" type="text" placeholder="可不填"></span>' +
                            '<a class="remove" onclick="remove(this)"></a>' +
                            '</li>');
    });
    
    $("#check-btn").on("click", function(){
    	$(this).attr("disabled","disabled")
    	//$(this).addClass("bg-gray")
    	$(this).text("等待页面跳转……")
    	var layoutID = $(this).data("id")
    	var persons = [];
    	$(".person li").each(function(index,value){
    		var name = $.trim($(this).find('input[name=name]').val())
    		var phone = $.trim($(this).find('input[name=phone]').val())
    		var ps = $.trim($(this).find('input[name=ps]').val())
    		if(name != '' || phone != '' || ps != ''){
    			persons.push({name: name, phone: phone, ps: ps});
    		}
    	})
    	console.log(persons);
    	var order = {
    			layoutID: layoutID,
    			describe: $(".info h6").text(),
    			fromDate: $(".info .from").text(),
    			toDate: $(".info .to").text(),
    			charge: $(".jiesuan span").text(),
    			realCharge: 0,
    			price: $(".jiage span em").text(),
    			persons: persons,
    	};
    	/*
    	 var temp = document.createElement("form");
 	    temp.action = URL;
 	    temp.method = "post";
 	    temp.style.display = "none";

         var opt1 = document.createElement("textarea");
         opt1.name = 'layoutID';
         opt1.value = layoutID;
         temp.appendChild(opt1);
         
         var opt2 = document.createElement("textarea");
         opt2.name = 'describe';
         opt2.value = $(".info h6").text();
         temp.appendChild(opt2);
         
         var opt3 = document.createElement("textarea");
         opt3.name = 'fromDate';
         opt3.value = $(".info .from").text();
         temp.appendChild(opt3);
         
         var opt4 = document.createElement("textarea");
         opt4.name = 'toDate';
         opt4.value = $(".info .to").text();
         temp.appendChild(opt4);
         
         var opt5 = document.createElement("textarea");
         opt5.name = 'charge';
         opt5.value = $(".jiesuan span").text();
         temp.appendChild(opt5);
         
         var opt6 = document.createElement("textarea");
         opt6.name = 'price';
         opt6.value = $(".jiage span em").text();
         temp.appendChild(opt6);
         
         var opt8 = document.createElement("textarea");
         opt8.name = 'persons';
         opt8.value = persons;
         temp.appendChild(opt8);
         
 	    document.body.appendChild(temp);
 	    temp.submit();
 	    */
    
    	console.log(order)
    	$.ajax({
            type: "post",
            url: "submitOrder",
            data: JSON.stringify(order),
            dataType: 'JSON',
            contentType : 'application/json;charset=utf-8',
            success: function (data) {
                if (data.status) {
                	var order = data.order;
                	/*
                	 var temp = document.createElement("form");
              	    temp.action = "alipay.trade.page.pay.jsp";
              	    temp.method = "post";
              	    temp.style.display = "none";

                      var opt1 = document.createElement("textarea");
                      opt1.name = 'WIDout_trade_no';
                      opt1.value = order.orderNum;
                      temp.appendChild(opt1);
                      
                      var opt2 = document.createElement("textarea");
                      opt2.name = 'WIDtotal_amount';
                      opt2.value = order.charge;
                      temp.appendChild(opt2);
                      
                      var opt3 = document.createElement("textarea");
                      opt3.name = 'WIDsubject';
                      opt3.value = order.describe;
                      temp.appendChild(opt3);
                      
                      var opt4 = document.createElement("textarea");
                      opt4.name = 'WIDbody';
                      opt4.value = order.describe + order.fromDate + order.toDate;
                      temp.appendChild(opt4);
                      
              	      document.body.appendChild(temp);
              	      temp.submit();
              	      */
                	var temp = document.createElement("form");
              	    temp.action = "alipay/alipayPay";
              	    temp.method = "post";
              	    temp.style.display = "none";

                      var opt1 = document.createElement("textarea");
                      opt1.name = 'tradeno';
                      opt1.value = order.orderNum;
                      temp.appendChild(opt1);
                      
                      var opt2 = document.createElement("textarea");
                      opt2.name = 'amount';
                      opt2.value = order.charge;
                      temp.appendChild(opt2);
                      
                      var opt3 = document.createElement("textarea");
                      opt3.name = 'subject';
                      opt3.value = order.describe;
                      temp.appendChild(opt3);
                      
                      var opt4 = document.createElement("textarea");
                      opt4.name = 'body';
                      opt4.value = order.describe + order.fromDate + order.toDate;
                      temp.appendChild(opt4);
                      
              	      document.body.appendChild(temp);
              	      temp.submit();
              	      
                }else{
                	alert(data.message);
                }
            },
            error: function () {
                alert('失败');
            },
        });
    
    	
    })
    
})
</script>