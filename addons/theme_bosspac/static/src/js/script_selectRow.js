$(document).ready(function() {
	var table = $('#myTablei').DataTable({
		fixedHeader: { 
			header: true, 
			footer: true,
			headerOffset: 2*$('nav').outerHeight(),
			//headerOffset: 200
		}
	});	
	// table.on("draw", function(e){
		// $(".o_header_affix").addClass("affixed");
		// //$("#myDiv").css("margin-top", $('nav').outerHeight())
	// });
	//console.log(table);
	
	var milan =[];
    $('#myTablei tbody').on( 'click', 'tr', function (event) {
		var barca = document.getElementsByClassName('selected');
		var t = $(".drag");

		if (event.ctrlKey) {
			for (var x = 0, y = barca.length; x < y; ++x) {
			
				milan.push(barca[x].id);
			}
			console.log(milan);
			
			if (milan.length > 0) {

				for (var m = 0, n=milan.length; m < n; ++m) {
					var su = milan[m];
					//document.getElementById(su).classList.remove("selected");
					$(this).addClass('selected');
				}

			} else {
				$(this).addClass('selected');

			}
			prev_val = $("#fieldid").val()
			if(prev_val.includes($( this ).attr("id")+";")){

				prev_val = prev_val.replace($( this ).attr("id")+";","")
				$("#fieldid").val(prev_val)

			}
			else
				$("#fieldid").val($("#fieldid").val() + $( this ).attr("id")+";")




		} else if (event.shiftKey) {

			//console.log("You've pressed the shift key")
			//Your code goes here
			for (var x = 0, y = barca.length; x < y; ++x) {
			
				milan.push(barca[x].id);
			}
			console.log(milan);
			//$(this).addClass('selected');
			if (milan.length > 0) {

				var rufus = document.getElementById(milan[0]),
				u = t.index(rufus);
				console.log(u);

				var v = t.index(this);
				console.log(v);
				var list = [];
				//Compare selector indices, and loop from lower to higher
				if (v > u) {

					for (var i = (u+1); i <= v; i++) {

						list.push(t.eq(i).attr("id"));
				
						console.log("aaa + " + t.eq(i).attr("id"))
						prev_val = $("#fieldid").val()

						if(prev_val.includes(t.eq(i).attr("id")+";")){

							prev_val = prev_val.replace(t.eq(i).attr("id")+";","")
							$("#fieldid").val(prev_val)

						}
						else {
							$("#fieldid").val($("#fieldid").val() + t.eq(i).attr("id")+";")
						}

					}
					console.log(list)
					//Your code goes here
				}
				else {
						for (var i =(u-1); i >= v; i--) {

							//t.eq(i).addClass("selected")
							list.push(t.eq(i).attr("id"));
							console.log("aaa + " + t.eq(i).attr("id"))

							prev_val = $("#fieldid").val()
							if(prev_val.includes(t.eq(i).attr("id")+";")){
								prev_val = prev_val.replace(t.eq(i).attr("id")+";","")
								$("#fieldid").val(prev_val)
							}
							else {

								$("#fieldid").val($("#fieldid").val() + t.eq(i).attr("id")+";")

							}
						}
					console.log(list)
				}
				//Your code goes here
				for (var m = 0, n=list.length; m < n; ++m) {
					var su = list[m];
					console.log("Mein ho Don"+su);
					if (document.getElementById(su) != null) {
						document.getElementById(su).classList.add("selected");
					}
					//t.addClass('selected');
				}

			} else { }
			
		}
		
		
		else {
		
			for (var x = 0, y = barca.length; x < y; ++x) {
				
				milan.push(barca[x].id);
			}
			console.log(milan);

			if (milan.length > 0) {
				for (var m = 0, n=milan.length; m < n; ++m) {
					var su = milan[m];
					document.getElementById(su).classList.remove("selected");
				}
			};
			$(this).addClass('selected');
			val_i =$(this).attr("id")+";";
			//console.log("Remember Remember the 5th of November!"+val_i)
			document.getElementById('fieldid').value=val_i;

		}
	});
});










//Unified Process Methodology

//The process flow for multiselector javascript interface design.
//1. onclick $(".drag") push the id to $fieldid and onclick on it again set $fieldid to '' 
//1.1 onclick another $drag_ii remove $drag_i from $fieldid set $field to $drag_ii


//2. on ctrl+click clear 
//2.1 keep all the previous values just go on adding   

//3. on shift + click
//3.1 fetch last event and use algorithm.
//3.2 among a row of selected items select the one at the top or the first item of the array
//3.3 index it out using t.(eq)
//3.4 do not pass on the next logic unless that array on 3.2 is set to not null
//3.5 then pass the if condition to alter the class of all elements within the array[0] and element obtained on click event

