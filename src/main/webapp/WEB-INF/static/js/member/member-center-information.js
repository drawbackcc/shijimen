function logout(){
	var r = confirm("确认退出吗")
	if (r == true) {
	window.location.href="logout";
	} else {
		
	}
}
function submit(){
	var memID = $('input[name="memID"]').val();
	var gender = $('input[name="gender"]').filter(':checked').val();
	var name = $.trim($('input[name="name"]').val());
	if(name == ""){
		alert("昵称不能为空");
		return;
	}
	var email = $.trim($('input[name="email"]').val());//加个格式验证
	var selfPs = $.trim($('textarea[name="selfPs"]').val());
	console.log(memID + gender + name + email + selfPs);
	$.ajax({
        url:'updateMemberInfo',
        type:'POST',
        data:{'memberID':memID, "name":name, "gender":gender, "email":email, "selfPs":selfPs, "type":1},
        success:function (result) {
        	if(result.status){
        		window.location.reload()
        	}else{
        		alert(result.message);
        	}
        },
        error:function(data){
        	alert("error");
        }
    });
}
$(function(){

})