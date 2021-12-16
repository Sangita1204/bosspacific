$(document).ready(function() {
	//var hume = '';
	//dnd of nodes in the tree view
	var txt = '';
    $(".droppable").click(function(e){
	}).draggable({
		helper: "clone",
		drag : function(event, ui){

            var hume = $( this ).parent($("a")).attr("id");

			$("#fieldid").val(hume);


		}
	});

	var helper = $( ".droppable " ).draggable( "option", "helper" );

    $( ".droppable" ).droppable({
      drop: function( event, ui ) {



		var source = $("#fieldid").val(),

		dest = $(this).parent($("a")).attr("id")

		console.log(source, dest);

			if (source.includes(";") === false) {

				$( this ).first().css( "border", " 3px dotted #5D90A2" );

				mergeToParentAjax(source, dest);

	 		} else {

				$( this ).first().css( "background-color", "#63C5DA" );

				//location.href="/pcm/update/"+source+"/"+dest;
				halamAjax(source, dest);
			 }

		//release the background color after 5 seconds
		// removeDotted = setTimeout(function(){
			// console.log("Attribute removed after 8 seconds!");
		// }, 8000)
		}
	
	});

});

function mergeToParentAjax(u, v){
 
	ran = Math.random();
    odoo.define('web.ajax007'+ran, function(require) {

		'use.strict';
		var ajax = require('web.ajax');

		//get the values to pass into the controller

		var res = ajax.jsonRpc("/pcm/catupdate", "call", {
			'obj_id': u,
			'des_id': v,
		}).then(function(returnval){

			returnval = JSON.parse(returnval);

			if (returnval['status'] == 'OK') {

				//format into the suitable html
				console.log('Update successfull');
				var x = document.createElement("ul"),
				y = document.createElement("li"),
				z = document.createElement("div"),
				a = document.getElementById(u).innerText;
				t = document.createTextNode(a)
				x.className = "nested";
				z.className = "droppable";
				x.appendChild(y).appendChild(z).appendChild(t)
				document.getElementById(v).appendChild(x);
				document.getElementById(u).innerHTML = ``;
			}

		});
	});
}

function halamAjax(m, n){

	ran = Math.random();
	odoo.define('web.ajax0007'+ran, function(require){

		'use.strict';
		var ajax = require('web.ajax');

		// get the values to pass into the controller function

		var res = ajax.jsonRpc('/pcm/update/'+m+'/'+n, 'call', {
			'product_id': m,
			'cat_id':n,
		}).then(function(returnval){

			returnval = JSON.parse(returnval);

			if (returnval['status'] == 'OK') {

				//format the changes in the html template after successfull update
				var p =document.getElementsByClassName("selected");
				for (i = 0; i<p.length; i++) {
					p[i].remove();
				}

				var count = document.getElementsByClassName("drag");
				var mesham = count.length;
				var vrisham = document.getElementById("myTablei_info");
				if (mesham == 0) {
					vrisham.innerText = `Showing 0 to 0 of `+mesham+ ` entries`;
				}
				else {
					vrisham.innerText = `Showing 1 to 10 of `+mesham+ ` entries`;
				}

			}

		});
	});

};



































// $(document).ready(function()
// {
// 	$(".drag").click(function(e)
// 	{
// 		var t = $(".drag");
// 		console.log("first click " + t.index(this))
// 		var lowEnd = t.index(this);
// 		console.log("ff " + $(this).attr("id"))
// 		var shiftHeld = false;
// 		$('.drag').on('mousedown', function(e)
// 		{
// 			shiftHeld = e.ShiftKey
// 			//e.preventDefault()
// 			console.log("second click "+t.index(this))
// 			//find the index of selector after shift
// 			var u = $(".drag");
// 			var highEnd = u.index(this);
// 			var list = [];
// 			var v = $(".drag");
// 			//Compare selector indices, and loop from lower to higher
// 			if (highEnd > lowEnd){
// 					for (var i = (lowEnd+1); i < highEnd; i++){
// 					//j=i+1;
// 					list.push(i);

// 					v.eq((i)).toggleClass("selected")
// 					console.log("aaa + " + v.eq(i).attr("id"))
// 					prev_val = $("#fieldid").val()
// 					if(prev_val.includes(v.eq(i).attr("id")+";")){
// 						prev_val = prev_val.replace(v.eq(i).attr("id")+";","")
// 						$("#fieldid").val(prev_val)
// 					}
// 					else
// 						$("#fieldid").val($("#fieldid").val() + v.eq(i).attr("id")+";")
// 				}
// 			}
// 			else{
// 					for (var i =lowEnd; i > highEnd; i--) {
// 						v.eq(i).toggleClass("selected")
// 					list.push(i);
// 					console.log("aaa + " + v.eq(i).attr("id"))
// 					prev_val = $("#fieldid").val()
// 					if(prev_val.includes(v.eq(i).attr("id")+";")){
// 						prev_val = prev_val.replace(v.eq(i).attr("id")+";","")
// 						$("#fieldid").val(prev_val)
// 					}
// 					else
// 						$("#fieldid").val($("#fieldid").val() + v.eq(i).attr("id")+";")
// 				}
// 			}
// 			console.log(list);
// 		} );
// 	});
// });
