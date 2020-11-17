<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh_CN">
<%String path = request.getContextPath();%>
<head>
    <title>酒店后台管理</title>
    <link rel="stylesheet" type="text/css" href="<%=path %>/static/css/employee/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<%=path %>/static/css/employee/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="<%=path %>/static/css/employee/eindex1.css">
    <link rel="stylesheet" type="text/css" href="<%=path %>/static/css/employee/skins/_all-skins1.css">
    <link rel="icon" href="<%=path %>/favicon.ico" type="image/x-icon"/>
</head>
<body class="hold-transition skin-blue sidebar-mini" style="overflow:hidden;">
    <div id="ajax-loader" style="cursor: progress; position: fixed; top: -50%; left: -50%; width: 200%; height: 200%; background: #fff; z-index: 10000; overflow: hidden;">
        <img src="<%=path %>/static/image/employee/ajax-loader.gif" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto;" />
    </div>
    <div class="wrapper">
        <!--头部信息-->
        <header class="main-header">
            <a href="javascript:void (0)" class="logo">
               <img src="<%=path %>/static/image/employee/bslogo1.png" />
            </a>
            <nav class="navbar navbar-static-top" style="display:block;font-weight: 500;font-size: 14px;color: #fff;padding-left: 10px">
                <span class="index_top"><strong></strong></span>
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">

                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="<%=path %>/static/image/employee/user3.jpg" class="user-image" alt="User Image">
                                <span class="hidden-xs">${sessionScope.adminiName}[${sessionScope.adminiNum}]您的身份是管理员</span>
                            </a>
                            <ul class="dropdown-menu pull-right">
                                <li><a href="logout"><i class="ace-icon fa fa-power-off"></i>安全退出</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <!--左边导航-->
        <div class="main-sidebar">
            <div class="sidebar">
                <ul class="sidebar-menu" id="sidebar-menu">
                    <li class="header">导航菜单</li>
                </ul>
            </div>
        </div>
        <!--中间内容-->
        <div id="content-wrapper" class="content-wrapper">
            <div class="content-tabs">
                <button class="roll-nav roll-left tabLeft">
                    <i class="fa fa-backward"></i>
                </button>
                <nav class="page-tabs menuTabs">
                    <div class="page-tabs-content" style="margin-left: 0px;">
                        <a href="javascript:;" class="menuTab active" data-id="analysis2Manage">营业额统计</a>
                    </div>
                </nav>
                <button class="roll-nav roll-right tabRight">
                    <i class="fa fa-forward" style="margin-left: 3px;"></i>
                </button>
                <div class="btn-group roll-nav roll-right">
                    <button class="dropdown tabClose" data-toggle="dropdown">
                        页签操作<i class="fa fa-caret-down" style="padding-left: 3px;"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li><a class="tabReload" href="javascript:void(0);">刷新当前</a></li>
                        <li><a class="tabCloseCurrent" href="javascript:void(0);">关闭当前</a></li>
                        <li><a class="tabCloseAll" href="javascript:void(0);">全部关闭</a></li>
                        <li><a class="tabCloseOther" href="javascript:void(0);">除此之外全部关闭</a></li>
                    </ul>
                </div>
                <button class="roll-nav roll-right fullscreen"><i class="fa fa-arrows-alt"></i></button>
            </div>
            <div class="content-iframe" >
                <div class="mainContent" id="content-main" style="margin: 10px; margin-bottom: 0; padding: 0;">
                    <iframe id="myFrame" class="LRADMS_iframe" width="100%" height="100%" src="analysis2Manage" frameborder="0" data-id="analysis2Manage"></iframe>
                </div>
            </div>
        </div>
    </div>
    <script src="<%=path %>/static/js/employee/jquery/jQuery-2.2.0.min.js"></script>
    <script src="<%=path %>/static/js/employee/bootstrap/bootstrap.min.js"></script>
    <script src="<%=path %>/static/js/employee/admini/index.js"></script>
    <script>
        $(function(){
            setColor();
        });
        function setColor() {
            var logo = $(".logo");
            var navbar = $(".skin-blue .main-header .navbar");
            var left_Side = $(".skin-blue .wrapper, .skin-blue .main-sidebar, .skin-blue .left-side");
            var header = $(".skin-blue .sidebar-menu > li.header");
            var treeview_menu = $(".skin-blue .sidebar-menu > li > .treeview-menu");
            var aa = $(".skin-blue .sidebar-menu > li.active > a");
            var page_tabs_content = $(".content-wrapper .content-tabs .page-tabs .page-tabs-content a");

            // blue
            logo.addClass("logo1");
            navbar.addClass("navbar1");
            left_Side.addClass("left-side1");
            header.addClass("header1");
            treeview_menu.addClass("treeview-menu1");
            aa.addClass("a0");
        }



    </script>
</body>
</html>
