/*!
JSKeynote
---------
author: 	Mariz Melo (MM) 2011
website: 	http//:www.emoriz.com
download: 	https://github.com/jmarizgit/JSKeynote
license: 	http://creativecommons.org/licenses/by-sa/3.0/
*/
(function($){  
	
	$.fn.jskeynote = function(){
		
		
		var config = {
			titles: true,
			rounded: true,
			shadow: true,
			margin: 80,
			width: 960,
			height: 700
		}
 		
 		var $element = "#"+$(this).attr("id"); //cache id for the slide div wrapper
 		
 		
 		
 		var activeTitles = function(){
 			
 			$($element+" dd").each(function(){
 				var holdTitle = $(this).attr("title");
				$(this).removeAttr("title");
				$(this).append("<div class='jsk_tooltip' style='margin-top:"+(config.height+30)+";width:"+config.width+"px;'>"+holdTitle+"</div>");
 			});//each()
 			
 		}//activeTitles
 		
 		
 		//INSERT TITLE FOR SLIDES
 		if(config.titles)
 		{
 			activeTitles();
 			
 		}else{
 			$($element+" dd").attr("title");	//remove titles anyway	
 		}
 		
 		
 		var ddsize = $($element+" dd").size();
 		
 		var dlsize = ddsize * (config.width+config.margin); //size for slides wrapper
 		
 		var lastpos = config.width/2 + (config.width+config.margin) * (ddsize-1); //calculating last position
 		
 		$($element+" dd").first().addClass("firstslide currentslide"); //not used yet
 		$($element+" dd").last().addClass("lastslide");
 		$($element+" dl").css({'width': dlsize+"px"});	//size for the dl wrapper 
 		
 		
 		//ROUNDED CORNERS
 		if(config.rounded)
 			$($element+" dd").addClass("rounded");
 		
 		//SHADOWS
 		if(config.shadow)
	 		$($element+" dd").addClass("shadow");
 		
 		
 		//FUNCTION FOR DEALING WITH WINDOW RESIZE
 		var resizeWindow = function(){
 			$($element).css({'width':$(window).width(), 'height':$(window).height()});
 		}
 		
 		resizeWindow();
 		
 		//if resize window
 		$(window).resize(function(){
 			resizeWindow();
 		});
 				
 		
 		var checkKey = function(){
 			
 			$(window).bind("keyup",function(e){

	 			switch(e.keyCode)
				{
					case 37:
						//PREVIOUS KEY
						if(parseInt($($element+" dl").css("margin-left")) < parseInt("-"+config.width/2))
						{	
						  	$(window).unbind("keyup");
						  	$($element+" dl").animate({"margin-left": "+=1040"}, 500, function(){
						  		checkKey();
							});
						}//if
					break;
				  
					case 39:
						//NEXT KEY
						if(parseInt($($element+" dl").css("margin-left")) > parseInt("-"+lastpos))
				  		{
							$(window).unbind("keyup");
							$($element+" dl").animate({"margin-left": "-=1040"}, 500, function(){
								checkKey();
							});
				  		}//if
				 	break;
				 	
				 	case 84:			  
				 		//TITLES
				 		if(config.titles && $($element+" .jsk_tooltip").is(":hidden"))
				 			$($element+" .jsk_tooltip").show();
				 		else
				 			$($element+" .jsk_tooltip").hide();
				 	break;
				}//switch
 			});//window.bind()
 		}//checkKey()
 		
 		
 		checkKey();	//initial call for the function
 		
 		
	}//fn.jskeynote
 
})(jQuery);  