$(document).ready(function(){
	$(".drag").click(function(e){
	}).draggable({
		helper: "clone", 
		drag : function(event, ui){
			console.log("element : " + $(this))
			prev_val = $("#fieldid").val()
		}
	});

	var helper = $( ".drag " ).draggable( "option", "helper" );
	
    $( ".droppable" ).droppable({
      drop: function( event, ui ) {
		//console.log($( this ).first())
		//console.log("Source " + $("#fieldid").val())
		//console.log("Dest1 " +  $( this ))
		//console.log("Dest " +  $( this ).parent($("a")).attr("id"))
		//$( this ).first().css( "background-color", "#63C5DA" );
		//var source = $("#fieldid").val();
		//var dest = $( this ).parent($("a")).attr("id");
		//location.href="/pcm/update/"+source+"/"+dest;
		}
	});
});


