function valifcode(){
	$.ajax({
        url:"valifcode",
        type:'get',
        data:{},
        success:function (data) {
        	console.log("data:" + data);
        	if(data.status){
        		$('.ma img').attr('src', '../' + data.imageUrl);
        	}else{
        		cosole.log(data.message);
        	}
        },
        error:function(data){
        	console.log("error");
        }
    });
}
$(function(){
	valifcode();
	
	$('.ma img').on("click", function(){
		valifcode();
	})
	
	$("input").hover(function(){$(this).focus(); },function(){
    	   $(this).blur();
//    	   var name = $(this).attr('name');
//    	   switch(name){
//    	   case 'phone':break;
//    	   case 'code':if($.trim($(this).val()) == '') $(this).next().text("验证码不能为空"); break;
//    	   case 'password1':break;
//    	   case 'password2':break;
//    	   }
       })
	
	$("#register-btn").on("click", function(){
		var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
		var phoneReg = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/;
		var phone = $("input[name=phone]").val();
		if(!phoneReg.test(phone)){
			alert("手机号格式不对");
			return;
		}
		var code = $("input[name=code]").val();
		if($.trim(code) == ''){
			alert("请输入验证码");
			return;//提醒注册失败信息，也许是号码已被注册，也许是验证码不对
		}
		var password1 = $("input[name=password1]").val();
		var password2 = $("input[name=password2]").val();
		if(password1 != password2){
			alert("密码不一致");
			return;
		}
		if(!pwdReg.test(password1)){
			alert("密码应为8到16位数字和字母的组合");
			return;
		}
		$.ajax({
	        url:"doRegister",
	        type:'post',
	        data:{'phone': phone, 'valifCode': code, 'password': password1},
	        success:function (data) {
	        	console.log("data:" + data);
	        	if(data.status){
	        		alert("注册成功，请登录试试");
	        		window.location.href = "login";
	        	}else{
	        		alert(data.message);
	        		valifcode();
	        	}
	        },
	        error:function(data){
	        	alert.log("error");
	        }
	    });
		
	})
	
	
})