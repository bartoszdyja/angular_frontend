$(document).ready(function() {


    // Layer Slider Dynamic- Set height to fit navbar
    if($(".layer-slider-dynamic").length > 0){
    	layerSliderDynamic();
    }

    // Layer Slider Fullsize
    if($(".layer-slider-fullsize").length > 0){
    	layerSliderFullsize();
    }

    // Window resize events
    $(window).resize(function() {
    	if($(".layer-slider-dynamic").length > 0){
	    	layerSliderDynamic();
	    }
		if($(".layer-slider-fullsize").length > 0){
	    	layerSliderFullsize();
	    }
	});

    // Functions
    function layerSliderDynamic(){
    	var windowHeight = $(window).height();
    	var headerHight = $("#divHeaderWrapper").height();
    	var newSliderHeight = windowHeight - headerHight;
    	$("#layerslider").css({"height": newSliderHeight + "px"});
    }
    function layerSliderFullsize(){
    	var windowHeight = $(window).height();
    	$("#layerslider").css({"height": windowHeight + "px"});
    }


    var screenRes = $(window).width(),
        screenHeight = $(window).height(),
        html = $('html');

    // IE<8 Warning
    if (html.hasClass("ie8")) {
        $("body").empty().html('Please, Update your Browser to at least IE9');
    }


});
