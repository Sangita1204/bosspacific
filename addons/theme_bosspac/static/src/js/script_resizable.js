$(document).ready(function(){
	//console.log('here!!')
	$("#myDiv").resizable({
		handles: 'e',
		resize: function(ev, ui) {
			var lim = (ui.size.width);
			//var sim = document.getElementById("myDiv2");
			$("#myDiv2").css( "margin-left", lim );

		}
	});
	var pim = $("#myDiv").css("width");
	$("#myDiv2").css( "margin-left", pim );
	//if record table exists
	// var recTable = document.getElementById("myTablei");
	// if (recTable.length != 0) {
	// 	//setup floating table head for each of the table found
	// 	$(recTable).each(function(index){
	// 		$(this).floatThead({top:0});
	// 		$(".floatThead-container").attr('aria-hidden', 'false');
	// 		//console.log("-float header set");
	// 		$(this).floatThead("reflow");
	// 	});

	// 	//set trigger for scroll header past table
	// 	var int_scrolledPastTable = false;
	// 	var ext_scrolledPastTable = false;

	// 	//setup checks to see if the header has reached the bottom of the table
	// 		$(window).scroll(function(){
	// 			if ($(window).width() > 768) {

	// 				var numberPattern = /-?\d+\.?\d*/g;
	// 				//internal
	// 				//get variable from translateX and translateY values
	// 				var inTransform = $('.floatThead-container').css("transform");
	// 				var inValues = inTransform.match(numberPattern);

	// 				//console.log('**window width:'+ $(window).width());
	// 				//console.log('**inTransform:'+ inValues);

	// 				if(inValues[5] < 0 && int_scrolledPastTable == false){
	// 					//if value is negative and trigger is false - change to true
	// 					int_scrolledPastTable = true;
	// 				} else if(inValues[5] == 0 && int_scrolledPastTable == true){
	// 					//scrolled past and coming back up - add extra padding for header and reset trigger
	// 					var newInY =  parseInt(inValues[5]) + 110;
	// 					$('.internal .floatThead-container').css({"transform" : "translateX("+inValues[4]+"px) translateY("+newInY+"px)"});
	// 					int_scrolledPastTable = false;
	// 				}
	// 				 //external
	// 				//get variable for translateX and translateY values
	// 				var exTransform = $('.floatThead-container').css("transform");
	// 				var exValues = exTransform.match( numberPattern );
					
	// 				if(exValues[5] < 0 && ext_scrolledPastTable == false){
	// 					//if value is negative and trigger is false - change to true
	// 					ext_scrolledPastTable = true;
	// 				} else if(exValues[5] == 0 && ext_scrolledPastTable == true){
	// 					//scrolled past and coming back up - add extra padding for header and reset trigger
	// 					var newExY =  parseInt(exValues[5]) + 110;
	// 					$('.floatThead-container').css({"transform" : "translateX("+exValues[4]+"px) translateY("+newExY+"px)"});
	// 					ext_scrolledPastTable = false;
	// 				}
	// 			}
	// 		});
	// 		// if window is smaller than the table width
	// 		// remove "all" option and select the next available option

	// 		if ( $(window).width() < 975 ){

	// 			//table_remove_allOption();

	// 		};
	// 		//if the window is resized - at the end of the event, check again
	// 		var resizeId;
	// 		$(window).resize(function() {

	// 			clearTimeout(resizeId);

	// 			resizeId = setTimeout(function(){

	// 				//console.log("- resize event ended")

	// 				if ( $(window).width() < 975 ){

	// 					//table_remove_allOption();

	// 				} else {

	// 					//table_allow_allOption();

	// 				};

	// 			}, 500);

	// 		});

	// 		// bind event to the select columns dropdown
	// 		$('.drag').on('change', function(){
	// 			//table_column_selected(this);
	// 		});
	// };
});