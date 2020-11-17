$(function(){
	 var picker1 = $('#datetimepicker1').datetimepicker({
         format: 'yyyy-mm-dd',
         weekStart: 1,//周一开始
         minView : 2,//显示到月和日
         autoclose:true,//选完自动关闭
         language:'zh-CN',
         todayHighlight:true,//高亮当前日期
//         startDate: date,//设置最小时间
         endDate: new Date()
     });
     var picker2 = $('#datetimepicker2').datetimepicker({
         format: 'yyyy-mm-dd',
         weekStart: 1,
         minView : 2,
         autoclose:true,
         language:'zh-CN',
         todayHighlight:true,
         endDate: new Date()
     });
     
     var now = new Date(); //当前日期
     var nowDayOfWeek = now.getDay(); //今天本周的第几天
     var nowDay = now.getDate(); //当前日
     var nowMonth = now.getMonth(); //当前月
     var nowYear = now.getYear(); //当前年
     nowYear += (nowYear < 2000) ? 1900 : 0; //
     var lastMonthDate = new Date(); //上月日期
     lastMonthDate.setDate(1);
     lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
     var lastYear = lastMonthDate.getYear();
     var lastMonth = lastMonthDate.getMonth();
     //格式化日期：yyyy-MM-dd
     function formatDate(date) {
         var myyear = date.getFullYear();
         var mymonth = date.getMonth() + 1;
         var myweekday = date.getDate();
         if (mymonth < 10) {
             mymonth = "0" + mymonth;
         }
         if (myweekday < 10) {
             myweekday = "0" + myweekday;
         }
         return (myyear + "-" + mymonth + "-" + myweekday);
     }
     //获得某月的天数
     function getMonthDays(myMonth) {
         var monthStartDate = new Date(nowYear, myMonth, 1);
         var monthEndDate = new Date(nowYear, myMonth + 1, 1);
         var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
         return days;
     }
     //获得本季度的开始月份
     function getQuarterStartMonth() {
         var quarterStartMonth = 0;
         if (nowMonth < 3) {
             quarterStartMonth = 0;
         }
         if (2 < nowMonth && nowMonth < 6) {
             quarterStartMonth = 3;
         }
         if (5 < nowMonth && nowMonth < 9) {
             quarterStartMonth = 6;
         }
         if (nowMonth > 8) {
             quarterStartMonth = 9;
         }
         return quarterStartMonth;
     }
     //获得本周的开始日期
     function getWeekStartDate() {
         var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
         return formatDate(weekStartDate);
     }
     //获得本周的结束日期
     function getWeekEndDate() {
         var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
         return formatDate(weekEndDate);
     }
     //获得上周的开始日期
     function getLastWeekStartDate() {
         var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
         return formatDate(weekStartDate);
     }
     //获得上周的结束日期
     function getLastWeekEndDate() {
         var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
         return formatDate(weekEndDate);
     }
     //获得本月的开始日期
     function getMonthStartDate() {
         var monthStartDate = new Date(nowYear, nowMonth, 1);
         return formatDate(monthStartDate);
     }
     //获得本月的结束日期
     function getMonthEndDate() {
         var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
         return formatDate(monthEndDate);
     }
     //获得上月开始时间
     function getLastMonthStartDate() {
         var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
         return formatDate(lastMonthStartDate);
     }
     //获得上月结束时间
     function getLastMonthEndDate() {
         var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
         return formatDate(lastMonthEndDate);
     }
     //获得本季度的开始日期
     function getQuarterStartDate() {
         var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
         return formatDate(quarterStartDate);
     }
     //或的本季度的结束日期
     function getQuarterEndDate() {
         var quarterEndMonth = getQuarterStartMonth() + 2;
         var quarterStartDate = new Date(nowYear, quarterEndMonth,
                 getMonthDays(quarterEndMonth));
         return formatDate(quarterStartDate);
     }
     
     $('#datetimepicker1').val(getWeekStartDate());
     $('#datetimepicker2').val(getWeekEndDate());
     
     $("button[name=this-week-btn]").on("click", function(){
    	  $('#datetimepicker1').val(getWeekStartDate());
          $('#datetimepicker2').val(getWeekEndDate());
          $("#check-btn").trigger("click");
     })
     $("button[name=last-week-btn]").on("click", function(){
    	  $('#datetimepicker1').val(getLastWeekStartDate());
          $('#datetimepicker2').val(getLastWeekEndDate());
          $("#check-btn").trigger("click");
     })
     $("button[name=this-month-btn]").on("click", function(){
    	  $('#datetimepicker1').val(getMonthStartDate());
          $('#datetimepicker2').val(getMonthEndDate());
          $("#check-btn").trigger("click");
     })
     $("button[name=last-month-btn]").on("click", function(){
    	  $('#datetimepicker1').val(getLastMonthStartDate());
          $('#datetimepicker2').val(getLastMonthEndDate());
          $("#check-btn").trigger("click");
     })
     $("button[name=this-season-btn]").on("click", function(){
    	  $('#datetimepicker1').val(getQuarterStartDate());
          $('#datetimepicker2').val(getQuarterEndDate());
          $("#check-btn").trigger("click");
     })

     
     
     var myChart = echarts.init($("#container7")[0]);
     
     $("#check-btn").on("click", function(){
     	var startDate = $("#datetimepicker1").val()
     	var endDate = $("#datetimepicker2").val()
     	if($.trim(startDate) =='' || $.trim(endDate) =='') return;
     	$.ajax({
	            type: "get",
	            url: "analysisLayoutOrder",
	            data: {'startDate':startDate, 'endDate': endDate},
	            async: false, // 同步
	            dataType: 'JSON',
	            success: function (data) {
	                if (data.status) {
	                	
	                	$(".annyTable").empty();
	                	var html = [];
	                	var total = 0;
	                	$.each(data.data,function(index,value){
	                		total += value.value;
	                	     html.push('<tr><td class="first_td">' + value.name + '</td><td class="">' + value.value + '元</td></tr>')
	                	});
	                	html.push('<tr><td class="first_td">总营业额</td><td class="">' + total + '元</td></tr>')
	                	$(".annyTable").append(html.join(''));
	                	
	                	option = {

	                            tooltip : {
	                                trigger: 'item',
	                                formatter: "{a} <br/>{b} : {c} ({d}%)"
	                            },
	                            legend: {
	                                orient : 'vertical',
	                                x : 'left',
	                                data:data.names
	                            },
	                            toolbox: {
	                                show : true,
	                                feature : {
	                                    mark : {show: true},
	                                    dataView : {show: true, readOnly: false},
	                                    magicType : {
	                                        show: true,
	                                        type: ['pie', 'funnel'],
	                                        option: {
	                                            funnel: {
	                                                x: '25%',
	                                                width: '50%',
	                                                funnelAlign: 'left',
	                                                max: 1548
	                                            }
	                                        }
	                                    },
	                                    restore : {show: true},
	                                    saveAsImage : {show: true}
	                                }
	                            },
	                            calculable : true,
	                            series : [
	                                {
	                                    name:'营业额',
	                                    type:'pie',
	                                    radius : '55%',
	                                    center: ['40%', '60%'],
	                                    data:data.data
	                                }
	                            ]
	                        };
	                        myChart.setOption(option);
	                }else{
	                	alert(data.message);
	                }
	            },
	            error: function () {
	                alert('失败');
	            }
	      });
     })//点击查询
     
     $("#check-btn").trigger("click");
   

})

