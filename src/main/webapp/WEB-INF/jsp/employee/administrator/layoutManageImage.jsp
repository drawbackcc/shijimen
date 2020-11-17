<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
      <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    <%String path = request.getContextPath();%>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
    <title></title>
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/table.css" rel="stylesheet" type="text/css" />
    <link href="<%=path %>/static/plugins/fileUpload/css/iconfont.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path %>/static/plugins/fileUpload/css/fileUpload.css" rel="stylesheet" type="text/css">
    
</head>
<style>
img {
    max-width: 400px;
    float:left;
}
</style>
<body style="background-color: #ecf0f5;font-family: 微软雅黑;color: #475059;min-width: 1000px;overflow: auto">
<div class="notice_main">
<input type="hidden" id="hidden-text">
     
        <div class="notice_check">
              <div id="fileUploadContent" data-id="" class="fileUploadContent"></div>
        </div>
        
        <div class="notice_check" style="text-align:center">
        <table id="room-table" class="table table-condensed" style="">
        <thead>
        <tr>
        <th><input type="checkbox" name="all-check"></th>
        <th>展示图片</th>
        </tr>
        </thead>
        <tbody>
         <c:forEach items="${images}" var="i" varStatus="status">
            <tr><td><input type="checkbox" name="image-check" data-value="${i }"></td>
           <td><img src="<%=path %>/static/${i}" width="auto" height="auto" alt="" /></td></tr>
         </c:forEach>
         <tr><td><button class="btn-primary" id="delete-btn">删除</button></td></tr>
        </tbody>
        </table>
        </div>

</div>
<script src="<%=path %>/static/js/employee/jquery/jQuery-2.2.0.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=path %>/static/plugins/fileUpload/js/fileUpload.js"></script>
<script type="text/javascript">
    $("#fileUploadContent").initUpload({
        "uploadUrl":"upLoadLayoutImages",//上传文件信息地址
        "size":2048,//文件大小限制，单位kb,默认不限制
        "maxFileNumber":10,//文件个数限制，为整数
        //"filelSavePath":"",//文件上传地址，后台设置的根目录
        "beforeUpload":beforeUploadFun,//在上传前执行的函数
        //"onUpload":onUploadFun，//在上传后执行的函数
        //autoCommit:true,//文件是否自动上传
        "fileType":['png','jpg']//文件类型限制，默认不限制，注意写的是文件后缀
    });
    function beforeUploadFun(opt){
        opt.otherData =[{"name":"layoutID","value":$("#hidden-text").val()}];
    }
    function onUploadFun(opt,data){
        alert(data);
        uploadTools.uploadError(opt);//显示上传错误
    }
$(function(){
	var flag = false;
	$("input[type=checkbox][name=all-check]").on("click", function(){
		$('input[type=checkbox]').prop('checked', $("input[type=checkbox][name=all-check]").prop("checked") ? true : false);
	})
	
	$("#delete-btn").on("click", function(){
		var images=[];
		$("input[type=checkbox][name=image-check]:checked").each(function (i, e) {
			images.push($(this).data("value"));
		})
		console.log(images);
	
		if(images.length > 0){
			$.ajax({
                cache: false,
                type: "post",
                url: "removeLayoutImage",
                dataType:"json",
                data:{"images":images,"layoutID":$("#hidden-text").val()},
                async: false,
                success: function (data) {
                	if(data.status){
                	//	alert(data,message + "成功");
                	window.location.reload();
                	}else{
                		alert(data.message + "失败");
                	}
                },
                error:function(){
                	alert("错误");
                }
            })
		}
	})
})
</script>
</body>
</html>

