/**
 
 	@package Toggle Slider jQuery Plug-in 
 	@version 1.0
 	@since 2014
 	@author Julian Paolo Dayag <trd-paolo@gmail.com>
 
*/

(function($){
				
	var func = function(params_obj,callback){
		var $this = this;
		var params = {};

		(callback!=undefined) || (callback = function(){});
		(params_obj!=undefined) || (params_obj = {});

		// apply defaults
		params.width = params_obj.width || 420;
		params.height = params_obj.height || 320;
		params.targetElement = params_obj.targetElement || $this.find(":nth-child(1)").prop("tagName").toLowerCase();
		params.duration = params_obj.duration || "normal";
		params.easing = params_obj.easing || "swing";
		params.buttonsCSS = params_obj.buttonsCSS || {};
		params.nextButton = params_obj.nextButton || {};
		params.prevButton = params_obj.prevButton || {};
		params.prevButton.css = params.prevButton.css || {};
		params.nextButton.css = params.nextButton.css || {};	
		params.nextButton.text = (params.nextButton.text!=undefined) ? params_obj.nextButton.text : ">";	
		params.prevButton.text = (params.prevButton.text!=undefined) ? params_obj.prevButton.text : "<";	
		params.nextButton.addClass = params.nextButton.addClass || "";	
		params.prevButton.addClass = params.prevButton.addClass || "";	
		
		// start
		
		var tag_name = this.selector.replace(/\W/g, '');
		
		// back up css
		var t = {};
		t.width = $this.css("width");
		t.height = $this.css("height");
		t.whiteSpace = $this.css("white-space");
		t.overflow = $this.css("overflow");
		t.padding = $this.css("padding");
		
		var c = [];
		
		var i=0;
		$this.find(params.targetElement).each(function(){
			c[i] = {};
			c[i].width = $(this).css("width");
			c[i].height = $(this).css("height");
			c[i].display = $(this).css("display");
			c[i].margin = $(this).css("margin");
			c[i].border = $(this).css("border");
			i++;
		});

		
		if ( $this.data("time_river") == null ){
			var time_river = {};
			time_river[tag_name] = t;
			time_river[tag_name+"__child"] = c;
			$this.data("time_river",time_river);

		}
		
		
		if ( typeof params_obj == "boolean" && params_obj == false/*params_obj.reset == true*/){
			$this.css($this.data("time_river")[tag_name]);	
			var i=0;
			$this.find(params.targetElement).each(function(){
				$(this).css($this.data("time_river")[tag_name+"__child"][i]);
				i++;
			});
			$this.data("next_btn").hide();
			$this.data("prev_btn").hide();				
			return false;
		}
		
		this.contents().filter(function() { return (this.nodeType == 3 && !/\S/.test(this.nodeValue)); }).remove();
		
		
		// apply custom css
		$this.css({
			width: params.width,
			height: params.height,
			whiteSpace: "nowrap",
			overflow: "hidden",
			padding:0
		});
		
		
		$this.find(params.targetElement).css({
			width: params.width,
			height: params.height,
			display:"inline-block",
			margin:0,
			border:0
		});


		var _current_dist = 0;
		if ($this.data("next_btn") == null ){
			
			var $prev = $("<div>");
			var $next = $("<div>");
			
			
			$prev.html(params.prevButton.text);
			$next.html(params.nextButton.text);
			$prev.addClass(params.prevButton.addClass);
			$next.addClass(params.nextButton.addClass);
			$this.after($prev);			
			$this.after($next);
			
			$prev.css({
				position:"absolute",
				height:50,
				width:20,
				backgroundColor:"#000",
				color: "#fff",
				"line-height":"50px",
				textAlign:"center",
				cursor:"pointer"
			});
			

			$next.css({
				position:"absolute",
				height:50,
				width:20,
				backgroundColor:"#000",
				color: "#fff",
				"line-height":"50px",
				textAlign:"center",
				cursor:"pointer"
			});
			
			
			
			$prev.css(params.buttonsCSS);
			$next.css(params.buttonsCSS);

			$prev.css(params.prevButton.css);
			$next.css(params.nextButton.css);

			
			
			

			
			$prev.offset({
				top: $this.offset().top+(($this.height()/2)-($prev.height()/2)),
				left: $this.offset().left
			});
			$next.offset({
				top: $this.offset().top+(($this.height()/2)-($prev.height()/2)),
				left:$this.offset().left+$this.outerWidth()-$next.width()
			});
			

			$next.bind("click",function(){
				if( _current_dist < params.width*($this.find(params.targetElement).length-1) || ((params.width*($this.find(params.targetElement).length-1))+params.width) <= params.width*($this.find(params.targetElement).length-1)){
					_current_dist += params.width;
					$this.animate({scrollLeft:_current_dist},params.duration,params.easing,function(){
						var index = parseInt(_current_dist/params.width);
						callback.apply($this,[index]);
					});
				}
			
			});
			$prev.bind("click",function(){
				if( _current_dist > 0 || (_current_dist-params.width) >= 0){
					_current_dist -= params.width;
					$this.animate({scrollLeft:_current_dist},params.duration,params.easing,function(){
						var index = _current_dist > 0 ? parseInt(_current_dist/params.width) : 0;
						callback.apply($this,[index]);
					});
				}				
			});
			
			
			$this.data("next_btn",$next);
			$this.data("prev_btn",$prev);
		} else {
			$this.data("next_btn").show();
			$this.data("prev_btn").show();
		}
			
	};
	$.fn.toogleSlider = func;
				
})(jQuery);