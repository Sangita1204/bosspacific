$(document).ready(function(){
   //to point the page to the active category
	var url = window.location.href.split('#')[0];
	var arr = url.split("/");
	var last = arr[arr.length - 1];
	//console.log("The category id is:"+ last);
	if (document.getElementById("myDiv") !== null ) {
        // var curr = document.getElementById(last).scrollIntoView();
        // console.log(curr);
        let container = $('#myDiv');
        let element = $('#'+last);

        container.animate({
            scrollTop: container.scrollTop = container.scrollTop() + element.offset().top - container.offset().top
        }, {
            //duration: 0.000000000001,
            //specialEasing: {
              //  width: 'linear',
                //height: 'easeOutBounce'
            //},
            complete: function (e) {
                //console.log("animation completed");

            }
        });
        document.getElementById("bottom").remove();
    }

		// jsTree
		// $('#product_shelf_tree_view').jstree({
			// "core" : {
				// "check_callback" : true,
			// },
			// "plugins" : ["state", "checkbox", "contextmenu", "dnd"],
			// "contextmenu" : {
				// // "items" : customMenu
			// },

		// });

 });

// const customMenu = (node) => {
	// let items = {
        // 'item1' : {
            // 'label' : 'Create',
            // 'action' : function () { /* action */ }
        // },
        // 'item2' : {
            // 'label' : 'Rename',
            // 'action' : function () { /* action */ }
        // },
				// 'item3' : {
            // 'label' : 'Delete',
            // 'action' : function () { /* action */ }
        // },
				// 'item4' : {
            // 'label' : 'Edit',
            // 'submenu' : {
							// 'submenu1' : {
								// 'label' : 'Cut',
		            // 'action' : function () { /* action */ }
							// },
							// 'submenu2' : {
								// 'label' : 'Copy',
		            // 'action' : function () { /* action */ }
							// },
							// 'submenu3' : {
								// 'label' : 'Paste',
		            // 'action' : function () { /* action */ }
							// },
						// }
        // }
    // }

	// return items;
// };
