$(function() {
	var ss = $('.message .content .right').height();
	$('.message .left').height(ss);
	
	var commentElement;

	$(".comment").on('click', function() {
		commentElement = $(this)
		$('.commentbox .img .pic').attr('src', $(this).closest('li').find('img').attr('src'))
		$('.submitcomment').data('id', $(this).closest('li').data('id'))
		$(".mask").fadeIn();
//		center($(".commentbox"))
	})
	
	$('.submitcomment').on('click', function(){
         var content = $('.commentbox textarea').val()
         console.log(content)
         if($.trim(content) == '') return;
		 $.ajax({
		 url:'comment',
		 type:'POST',
		 data:{'orderID':$(this).data('id'), "content":content, "device":5, "service":5, "environment": 5},
		 success:function (result) {
		      if(result.status){
		    	  $(".mask").fadeOut();
//		    	  $(commentElement).removeClass('comment')
//		    	  $(commentElement).text('已评价')
		    	  $(commentElement).remove()
		    	  $('.commentbox textarea').val('')
		      }else{
		    	  alert("message");
		      }        
		 },
		 error:function(data){
		 alert("error");
		 }
		 });
	})
	
	$('.close').on('click', function(){
		$(".mask").fadeOut();
	})

//	function center(obj) {
//		var screenWidth = $(window).width();
//		screenHeight = $(window).height(); // 当前浏览器窗口的 宽高
//		var scrolltop = $(document).scrollTop();// 获取当前窗口距离页面顶部高度
//		var objLeft = (screenWidth - obj.width()) / 2;
//		var objTop = (screenHeight - obj.height()) / 2 + scrolltop;
//		obj.css({
//			left : objLeft + 'px',
//			top : objTop + 'px',
//			'display' : 'block'
//		});
//		// 浏览器窗口大小改变时
//		$(window).resize(function() {
//			screenWidth = $(window).width();
//			screenHeight = $(window).height();
//			scrolltop = $(document).scrollTop();
//			objLeft = (screenWidth - obj.width()) / 2;
//			objTop = (screenHeight - obj.height()) / 2 + scrolltop;
//			obj.css({
//				left : objLeft + 'px',
//				top : objTop + 'px',
//				'display' : 'block'
//			});
//		});
//		// 浏览器有滚动条时的操作、
//		$(window).scroll(function() {
//			screenWidth = $(window).width();
//			screenHeight = $(window).height();
//			scrolltop = $(document).scrollTop();
//			objLeft = (screenWidth - obj.width()) / 2;
//			objTop = (screenHeight - obj.height()) / 2 + scrolltop;
//			obj.css({
//				left : objLeft + 'px',
//				top : objTop + 'px',
//				'display' : 'block'
//			});
//		});
//	}

	$(".cancel").on("click", function() {
		var tradeno = $(this).closest('li').find('.title01 span').text()
		var amount = $(this).closest('li').find('.number').text()
		var subject = $(this).closest('li').find('.money p').text()
		var from = $(this).closest('li').find('.money span').eq(0).text()
		var to = $(this).closest('li').find('.money span').eq(1).text()
		console.log('tradeno:' + tradeno)
		console.log('amount:' + amount)
		console.log('subject:' + subject)
		console.log('from:' + from)
		console.log('to:' + to)
		if (confirm("确认取消该订单？")) {
			$.ajax({
				url : '../alipay/alipayPay',
				type : 'POST',
				data : {
					'tradeno' : tradeno,
					"amount" : amount,
					"subject" : subject,
					"body" : from + to
				},
				success : function(result) {

				},
				error : function(data) {
					alert("error");
				}
			});
		}
	})

	$(".pay").on("click", function() {
		console.log("pay")
		var tradeno = $(this).closest('li').find('.title01 span').text()
		var amount = $(this).closest('li').find('.number').text()
		var subject = $(this).closest('li').find('.money p').text()
		var from = $(this).closest('li').find('.money span').eq(0).text()
		var to = $(this).closest('li').find('.money span').eq(1).text()
		console.log('tradeno:' + tradeno)
		console.log('amount:' + amount)
		console.log('subject:' + subject)
		console.log('from:' + from)
		console.log('to:' + to)

		// $.ajax({
		// url:'../alipay/alipayPay',
		// type:'POST',
		// data:{'tradeno':tradeno, "amount":amount, "subject":subject, "body":
		// from + to},
		// success:function (result) {
		//              
		// },
		// error:function(data){
		// alert("error");
		// }
		// });

		var temp = document.createElement("form");
		temp.action = "../alipay/alipayPay";
		temp.method = "post";
		temp.style.display = "none";

		var opt1 = document.createElement("textarea");
		opt1.name = 'tradeno';
		opt1.value = tradeno;
		temp.appendChild(opt1);

		var opt2 = document.createElement("textarea");
		opt2.name = 'amount';
		opt2.value = amount;
		temp.appendChild(opt2);

		var opt3 = document.createElement("textarea");
		opt3.name = 'subject';
		opt3.value = subject;
		temp.appendChild(opt3);

		var opt4 = document.createElement("textarea");
		opt4.name = 'body';
		opt4.value = from + to;
		temp.appendChild(opt4);

		document.body.appendChild(temp);
		temp.submit();
	})

})