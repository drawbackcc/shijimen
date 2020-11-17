<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
 <%String path = request.getContextPath();%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap-table.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/bootstrap/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css">
    <link href="<%=path %>/static/css/employee/table1.css" rel="stylesheet" type="text/css">
</head>
<body style="background-color: #ecf0f5;font-family: 微软雅黑;color: #475059;min-width: 1000px;overflow: auto">
<div class="from_main" >
    <div class="news_check">
        <div class="check_left l_left">
        <button name="this-week-btn">本周</button>
        <button name="last-week-btn">上周</button>
        <button name="this-month-btn">本月</button>
        <button name="last-month-btn">上月</button>
        <button name="this-season-btn">本季度</button>
     
            <input type="text" id="datetimepicker1" autocomplete="off" class="find_input"/>至
            <input type="text" id="datetimepicker2" autocomplete="off" class="find_input"/>
        <button id="check-btn">查询</button>
        </div>
        <div class="clear"></div>
    </div>

    <div style="padding: 0 10px 0 10px ;border: 1px #ccc solid;background-color: #fff;">
        <div class="e_chart">
            <div class="charts l_left last_charts" style="width: 100%">
                <p class="charts_p">营业额（以下单时间为准）<span class="r_right">更多></span></p>
                <div id="container7" style="height:250px;"></div>
                <div style="width: 100%;margin-top: 20px">
                    <table class="annyTable" border="1">
                    <!--
                        <tr>
                            <td class="first_td">灯具总数</td>
                            <td class="">13025个</td>

                        </tr>
                        <tr>
                            <td class="first_td">高新区</td>
                            <td>120个</td>

                        </tr>
                        <tr>
                            <td class="first_td">天府新区</td>
                            <td>1230个</td>
                        </tr>
                        <tr>
                            <td class="first_td">锦江区</td>
                            <td>2301个</td>

                        </tr>
                        <tr>
                            <td class="first_td">金牛区</td>
                            <td>2301个</td>

                        </tr>
                        <tr>
                            <td class="first_td">成华区</td>
                            <td>2301个</td>

                        </tr>
                        <tr>
                            <td class="first_td">青羊区</td>
                            <td>2301个</td>

                        </tr>
                          -->

                    </table>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>

</div>

</body>
<script src="<%=path %>/static/js/employee/jquery/jQuery-2.2.0.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-table-zh-CN.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.min.js"></script>
<script src="<%=path %>/static/js/employee/bootstrap/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="<%=path %>/static/js/employee/echarts-all.js"></script>
<script src="<%=path %>/static/js/employee/admini/analysis2Manage.js"></script>
</html>