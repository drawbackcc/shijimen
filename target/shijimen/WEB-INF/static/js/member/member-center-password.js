function logout(){
	var r = confirm("确认退出吗")
	if (r == true) {
	window.location.href="logout";
	} else {
		
	}
}
function submit(){
	if($('#oldpass').length >0){
		if($('#oldpass').val() == null || $.trim($('#oldpass').val()) == ""){
			alert("请输入密码");
			return;
		}
		$.ajax({
	        url:'isPasswordRight',
	        type:'POST',
	        data:{'password':$.trim($('#oldpass').val())},
	        success:function (result) {
	        	if(result){
	        		$(".personal .baseW").remove();
		            $(".personal").prepend('<div class="baseW"><label for="newpass1">请输入新密码：</label><input type="password" id="newpass1" /></div>' +
				                           '<div class="baseW"><label for="newpass2">请再次输入新密码：</label><input type="password" id="newpass2" /></div>');
	        	}else{
	        		alert("密码错误");
	        	}
	        },
	        error:function(data){
	        	alert("error");
	        }
	    });
	}
	if($('#newpass1').length >0 && $('#newpass2').length >0){
		var pass1 = $('#newpass1').val();
		var pass2 = $('#newpass2').val();
		if(pass1 == null || $.trim(pass1) == "" || pass2 == null || $.trim(pass2) == ""){
			alert("密码不能为空");
			return;
		}
		if($.trim(pass1) != $.trim(pass2)){
			alert("密码不一致");
			return;
		}
		//alert("修改密码成功");
	//	alert($('#submit').data('id'));
		
		$.ajax({
	        url:'updateMemberInfo',
	        type:'POST',
	        data:{'memberID':$('#submit').data('id'),'password':$.trim($('#newpass1').val()),'type':3},
	        success:function (result) {
	        	if(result.status){
	        		window.location.reload();
	        	}else{
	        		alert(result.message);
	        	}
	        },
	        error:function(data){
	        	alert("error");
	        }
	    });
	    
	    
	}
	
}