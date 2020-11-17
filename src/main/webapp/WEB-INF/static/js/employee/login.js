$(function(){
//	 $("input").hover(function(){
//  	   $(this).focus();
//     },function(){
//  	   $(this).blur();
//     })
     
     $('input[type=text]').bind('keypress',function(e){
    	 e = e || window.event;
 	    key = e.keyCode || e.which || e.charCode;
 	    if (key == 13) {
 	        if($.trim($('input[type="text"]').val()) != '') $('input[type=password]').focus();
 	    }
    	 
      });
	 
	 $('input[type=password]').bind('keypress',function(e){
    	 e = e || window.event;
 	    key = e.keyCode || e.which || e.charCode;
 	    if (key == 13) {
 	        if($.trim($('input[type="password"]').val()) != '') $("#btn_login").click();
 	    }
    	 
      });
	
	$("#btn_login").on("click", function(e){
		var n = $('input[type="text"]').val();
		var pw = $('input[type="password"]').val();
		
		var t = $('input[name="type"]').filter(':checked').val();
		var url = t == 0 ? "doLogin" : "../a/doLogin";
		var reUrl = t == 0 ? "index" : "../a/index";
		console.log(n+pw+t);
		console.log("url:" + url)
		$.ajax({
            url:url,
            type:'POST',
            data:{'emplNum':n, "password":pw, "type":t},
            success:function (data) {
            	console.log("data:" + data);
            	if(data){
            		console.log("reurl:" + reUrl)
            		window.location.href = reUrl;
            	}else{
            		alert("账号或密码错误");
            	}
            },
            error:function(data){
            	alert("error");
            }
        });
		
	})
})