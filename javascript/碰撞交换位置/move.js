function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,null))[name];
}

// json:name end
// options:duration 时间  easeing：运动类型 complete：函数


function move(obj,json,options){
	options=options||{};
	options.duration=options.duration||1000;
	options.easing=options.easing||"linear";

	var start={};
	var dis={};

	for (name in json) {
		if (name=="opacity") {
			start.opacity=parseFloat(getStyle(obj,name));

		} else {
			start[name]=parseInt(getStyle(obj,name));
		}
		dis[name]=json[name]-start[name];	
	}

	var count=Math.round(options.duration/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for (var name in json) {
			switch(options.easing){
	              case "linear":
	              var a=n/count;
	              var cur=start[name]+dis[name]*a;
	              break;
	              case "ease-in":
	              var a=n/count;
	              var cur=start[name]+dis[name]*a*a*a;
	              break;
	              case "ease-out":
	              var a=1-n/count;
	              var cur=start[name]+dis[name]*(1-a*a*a);
	              break;
			}

			if (name=="opacity") {
				obj.style.opacity=cur;
				obj.style.filter="alpha(opacity:"+cur*100+")";

			} else {
				obj.style[name]=cur+"px";
			}

			//函数！！！！！
			if (n==count) {
				clearInterval(obj.timer);
				options.complete&&options.complete();
			}

		}
	},30);
	
}