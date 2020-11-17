  $(function(){
	  var picker1 = $('#datetimepicker1').datetimepicker({
 		 startView: 'decade',
 		         minView: 'decade',
 		         format: 'yyyy',
 		         maxViewMode: 2,
 		         minViewMode: 2,
 		         autoclose: true,
 		         endDate: new Date()
      }).on('changeDate',function(ev){
    	             $("#check-btn").trigger("click");
    	          });
	  var year = new Date().getFullYear();
	  $("#datetimepicker1").val(year)

        var myChart = echarts.init($("#container7")[0]);
	  
        $("#check-btn").on("click", function(){
        	var year = $("#datetimepicker1").val()
        	if($.trim(year) == '') return;
        	$.ajax({
	            type: "get",
	            url: "analysisInlineAndOfflineOrder",
	            data: {'year':year},
	            async: false, // 同步
	            dataType: 'JSON',
	            success: function (data) {
	                if (data.status) {
	                	var offline = data.offline;
	                	var online = data.online;
	                	 option = {
	                           tooltip : {
	                               trigger: 'axis'
	                           },
	                           legend: {
	                               data:['线上订单','线下订单']
	                           },
	                           toolbox: {
	                               show : true,
	                               feature : {
	                              
	                                   restore : {show: true},
	                                   saveAsImage : {show: true}
	                               }
	                           },
	                           calculable : true,
	                           xAxis : [
	                               {
	                                   type : 'category',
	                                   boundaryGap : false,
	                                   data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	                               }
	                           ],
	                           yAxis : [
	                               {
	                                   type : 'value/万',
	                               }
	                           ],
	                           series : [
	                               {
	                                   name:'线上订单',
	                                   type:'line',
	                                   data:online,
	                               },
	                               {
	                                   name:'线下订单',
	                                   type:'line',
	                                   data:offline,
	                               }
	                           ]
	                         };//option
	                           myChart.setOption(option);
	                }else{
	                	alert(data.message);
	                }
	            },
	            error: function () {
	                alert('失败');
	            }
	      });
        })
        
        
        $("#check-btn").trigger("click");
        
    });