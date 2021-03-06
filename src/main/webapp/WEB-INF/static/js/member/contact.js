var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "api.map.baidu.com/api?ak=LnmEM5e3ZeG1H5h38tfc02Vz&v=2.0' type='text/javascript'%3E%3C/script%3E"));


//创建和初始化地图函数：
function initMap(){
createMap();//创建地图
setMapEvent();//设置地图事件
addMapControl();//向地图添加控件
addMarker();//向地图中添加marker
}

//创建地图函数：
function createMap(){
var map = new BMap.Map("map");//在百度地图容器中创建一个地图
var point = new BMap.Point(113.360213,23.163381);//定义一个中心点坐标1/坐标是多少，可以用百度提供的拾取坐标系统
"http://dev.baidu.com/wiki/static/map/API/tool/getPoint/"
map.centerAndZoom(point,19);//设定地图的中心点和坐标并将地图显示在地图容器中
window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
map.enableScrollWheelZoom();//启用地图滚轮放大缩小
map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
//向地图中添加缩放控件
var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
map.addControl(ctrl_nav);
//向地图中添加缩略图控件
var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
map.addControl(ctrl_ove);
//向地图中添加比例尺控件
var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
map.addControl(ctrl_sca);
}

//标注点数组
    var markerArr = [{title:"石继门大酒店",content:"咨询热线：400 8888 8888<br/><br/>地址：广东省广州市天河区五山483号",point:"113.360213|23.163381",isOpen:0,icon:{w:23,h:25,l:46,t:21,x:9,lb:12}}
];
//创建marker
function addMarker(){
for(var i=0;i<markerArr.length;i++){
var json = markerArr[i];
var p0 = json.point.split("|")[0];
var p1 = json.point.split("|")[1];
var point = new BMap.Point(p0,p1);
var iconImg = createIcon(json.icon);
var marker = new BMap.Marker(point,{icon:iconImg});
var iw = createInfoWindow(i);
var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+20,-20)});
marker.setLabel(label);
map.addOverlay(marker);
label.setStyle({
borderColor:"#ea5706",
backgroundColor:"#ea5706",
color:"#fff",
fontSize:"14px",
fontFamily:"微软雅黑",
borderRadius:"4px",
padding:"8px 12px",
cursor:"pointer"
});

(function(){
var index = i;
var _iw = createInfoWindow(i);
var _marker = marker;
_marker.addEventListener("click",function(){
this.openInfoWindow(_iw);
});
_iw.addEventListener("open",function(){
_marker.getLabel().hide();
})
_iw.addEventListener("close",function(){
_marker.getLabel().show();
})
label.addEventListener("click",function(){
_marker.openInfoWindow(_iw);
})
if(!!json.isOpen){
label.hide();
_marker.openInfoWindow(_iw);
}
})()
}
}
//创建InfoWindow
function createInfoWindow(i){
var json = markerArr[i];
var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
return iw;
}
//创建一个Icon
function createIcon(json){
var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-

json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
return icon;
}



	
function MyinitMap(){
if(typeof(BMap)=='undefined'){
	setTimeout(MyinitMap,500);	
	}	
	else{
	initMap();
	}
}	
MyinitMap();