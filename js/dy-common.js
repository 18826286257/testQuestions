$(document).ready(function() {
	var temp1=true;
    
	//手机版快捷菜单控制
    var head_menu=$("#dy_menu");
    var head_nav =$("#head_nav");
    head_menu.on("click",function(){
        $(this).children().toggleClass("menu-expand");
        head_nav.toggleClass("menu-show");
    });
    $("#head_nav").on("click",function(){
    	console.log(11)
        head_menu.children().removeClass("menu-expand");
        $("#head_nav").removeClass("menu-show");
    });
	
	//手机版中文切换按钮
	$('.eng').click(function(e) {
		if(temp1==true){
			$(".language-en").css({"display":"none",});
			$(".language-cn").css({"display":"block",});
			temp1=false;
		}else if(temp1==false){
			$(".language-en").css({"display":"block",});
			$(".language-cn").css({"display":"none",});
			temp1=true;
		}
	});	
	//手机版产品列表菜单控制	
	$(".list-box").click(function(){
		$(this).toggleClass("menu-box")
		$(this).parent().siblings(".mobile-menu-list").toggleClass("active");
	});
	
	$(".dy-main .main-conter .mobile-menu-list ul li").click(function(){
 		$(this).addClass('active');
 		$(this).siblings().removeClass('active');
 		$(this).children("div").addClass('active');
 		$(this).siblings().children("div").removeClass('active');
	})
	$(".wx-list").click(function(){
 		$(this).children(".items-cate").addClass('active');
 		$(this).siblings().children(".items-cate").removeClass('active');
 		$(this).parent().parent().siblings().children("div").children().children(".items-cate").removeClass("active");
	})
})
function imgShow(dy_enlarge, innerdiv, bigimg, pimg){  
	var src = pimg.attr("src");//获取当前点击的pimg元素中的src属性  
	$(bigimg).attr("src", src);//设置#bigimg元素的src属性 
    lookup(src) 	//调用lookup函数	      
	$(dy_enlarge).click(function(){//再次点击淡出消失弹出层  
		$(this).fadeOut("fast");
	});  
}
function lookup(t){
    var img = new Image(); //创建图片对象
    img.src=t
    var windowW = $(window).width();//获取当前窗口宽度  
	var windowH = $(window).height();//获取当前窗口高度  
	var realWidth = img.width;//获取图片真实宽度  
	var realHeight = img.height;//获取图片真实高度
	var imgWidth, imgHeight;  
	var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放
	if(realHeight>windowH*scale) {//判断图片高度  
		imgHeight = windowH*scale;//如大于窗口高度，图片高度进行缩放  
		imgWidth = imgHeight/realHeight*realWidth;//等比例缩放宽度  
		if(imgWidth>windowW*scale) {//如宽度扔大于窗口宽度  
		    imgWidth = windowW*scale;//再对宽度进行缩放  
		    }  
	} else if(realWidth>windowW*scale) {//如图片高度合适，判断图片宽度  
		imgWidth = windowW*scale;//如大于窗口宽度，图片宽度进行缩放  
		imgHeight = imgWidth/realWidth*realHeight;//等比例缩放高度  
	} else {//如果图片真实高度和宽度都符合要求，高宽不变  
		imgWidth = realWidth;  
		imgHeight = realHeight;  
	}  
		$(bigimg).css("width",imgWidth);//以最终的宽度对图片缩放  	          
		var w = (windowW-imgWidth)/2;//计算图片与窗口左边距  
		var h = (windowH-imgHeight)/2;//计算图片与窗口上边距  
		$(innerdiv).css({"top":h, "left":w});//设置#innerdiv的top和left属性  
		$(dy_enlarge).fadeIn("fast");//淡入显示#outerdiv及.pimg
}