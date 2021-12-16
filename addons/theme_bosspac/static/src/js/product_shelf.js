// var toggler = document.getElementsByClassName("caret");
// var i;
// for (i = 0; i < toggler.length; i++){
	// toggler[i].addEventListener("click", function() {
	// this.parentElement.querySelector(".nested").classList.toggle("active");
	// console.log('here!');
	// this.classList.toggle("caret-down"); 
	// });
// }

$(document).ready(function() {
	var vir = $(".drag");
	var modal = $("#myModal3");
	//console.log("Open the modal!!");
	vir.on("dblclick", function(e){
		//console.log("Open the modal!!");
		var xyz =$(this).attr('id');
		console.log(xyz);
		//$("#modal_odoo").modal({show: true});
		var x = $(modal).modal();
		//console.log("The modal is opened let's pull some data!!");
		//dataSafariAjax(xyz);
		if (x) {
			dataSafariAjax(xyz);
			tabAjax1(xyz);
		}
		//The function to enable the general info in the modal
		$("#first-bt").on('click', function(ev) {
			
			console.log('Hello World');
		});
		//The function to enable the variants tab in the modal
		$("#second-bt").on('click', function(ev) {
			tabAjax2(xyz);

		});
		//The function to enable the Sales tab of the modal
		$("#third-bt").on('click', function(ev) {
			tabAjax3(xyz);

		});
		//The function to enable the Point of Sale tab of the modal
		$("#fourth-bt").on('click', function(ev) {
			tabAjax4(xyz);

		});
		//The function to enable the eCommerce tab of the modal
		$("#fifth-bt").on('click', function(ev) {
			tabAjax5(xyz);

		});
		//The function to enable the Purchase tab of the modal
		$("#sixth-bt").on('click', function(ev) {
			tabAjax6(xyz);

		});
		//The function to enable the Inventory tab of the modal
		$("#seventh-bt").on('click', function(ev) {
			tabAjax7(xyz);

		});
		//the function to enable the acccounting tab of the modal
		$("#eight-bt").on('click', function(ev) {
			tabAjax8(xyz);

		});
		$(document).on('hidden.bs.modal', function(){
			document.getElementById('white-board').innerHTML=``;
		});
	});

	

	// $(modal).on('show.bs.modal', function(){
	// 	console.log("The modal is opened let's pull some data!!");
	// });
  
});

/*document.addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('caret')) {
        e.target.parentElement.querySelector(".nested").classList.toggle("active");
        e.target.classList.toggle("caret-down");
    }
});*/

function dataSafariAjax(uv) {
	ran = Math.random()
	odoo.define('web.ajax86'+ran, function(require){
		'use.strict';
		var ajax = require('web.ajax');

			//get the values to pass on to the controller
			var res = ajax.jsonRpc('/pcm/fetch', 'call', {
				'pid': uv,

			}).then(function(returnval){
				returnval = JSON.parse(returnval);
				if (returnval['status'] == 'OK') {
					//format the html with newly acquired data from dataSafariAjax()
					console.log('return successfull')
					var x = returnval['ents'];
					document.getElementById('name').innerHTML=x['name'];
					document.getElementById('vendor').innerHTML=x['vendor_id'];
					document.getElementById('description').innerHTML=x['description'];
					document.getElementById('image-1').src = "/web/image?model=product.template&field=image_128&id="+uv+"&unique=";
				}
			});
	});
};


function tabAjax1(uv){
	console.log("Hello World!")
	ran = Math.random()
	odoo.define('web.ajax186'+ran, function(require){
	'use.strict';
	var ajax = require('web.ajax');

		//get the values to pass on to the controller
		var res = ajax.jsonRpc('/pcm/fetch', 'call', {
			'pid': uv,

		}).then(function(returnval){
			returnval = JSON.parse(returnval);
			if (returnval['status'] == 'OK') {
				//format the html with newly acquired data from dataSafariAjax()
				console.log('return successfull')
				var x = returnval['ents'];
				console.log(x);
				document.getElementById('white-board').innerHTML= `
																	<div class='row'><div class='col-sm'>`+
																	`Product Type: `+x['type']+'<br />'+
																	`Brand: `+x['brand'] +'<br />'+ 
																	`Product Category: `+x['category']+'<br />'+
																	`Sales Price: `+x['list_price'] + `$`+'<br />'+
																	`Qty 1: `+x['qty1'] +'<br />'+ 
																	`Qty 2: `+x['qty2']+'<br />'+
																	`Qty 3: `+x['qty3'] +'<br />'+ 
																`</div>`+
																`<div class='col-sm'>`+
																		`Height: `+x['height']+'<br />'+
																		`Width: `+x['width']+ '<br />'+ 
																		`Length: `+x['length'] +'<br />'+ 
																		`Sydney Warehouse: `+x['syd']+'<br />'+
																		`Melb Warehouse: `+x['melb'] + '<br />'+
																		`Perth Warehouse: `+x['perth']+'<br />'+
																		`Qty 1: `+x['qty1'] +'<br />'+ 
																		`Qty 2: `+x['qty2']+'<br />'+
																		`Qty 3: `+x['qty3'] +'<br />'+ 
																		`Qty2 Price: `+x['qty2_price'] +'<br />'+ 
																		`Qty3 Price: `+x['qty3_price'] + 
																`</div></div>
														`;
			}
		});
	});
};



function tabAjax2(uv){
	console.log("Hello World!")
	ran = Math.random()
	odoo.define('web.ajax286'+ran, function(require){
	'use.strict';
	var ajax = require('web.ajax');

		//get the values to pass on to the controller
		var res = ajax.jsonRpc('/pcm/fetch', 'call', {
			'pid': uv,

		}).then(function(returnval){
			returnval = JSON.parse(returnval);
			if (returnval['status'] == 'OK') {
				//format the html with newly acquired data from dataSafariAjax()
				console.log('return successfull')
				var x = returnval['ents'];
				document.getElementById('white-board').innerHTML=`
				<div class="o_field_one2many o_field_widget o_field_x2many o_field_x2many_list" name="attribute_line_ids" id="o_field_input_191">
				<div class="o_cp_controller">
				   <div class="o_x2m_control_panel">
					  <nav class="o_cp_buttons" aria-label="Control panel toolbar" role="toolbar"></nav>
					  <nav class="o_cp_pager" aria-label="Pager" role="toolbar">
						 <div class="o_pager o_hidden">
							<span class="o_pager_counter">
							<span class="o_pager_value"></span> / <span class="o_pager_limit"></span>
							</span>
							<span class="btn-group" aria-atomic="true">
							<button type="button" class="fa fa-chevron-left btn btn-secondary o_pager_previous" aria-label="Previous" title="Previous" tabindex="-1"></button>
							<button type="button" class="fa fa-chevron-right btn btn-secondary o_pager_next" aria-label="Next" title="Next" tabindex="-1"></button>
							</span>
						 </div>
					  </nav>
				   </div>
				</div>
				<div class="o_list_view">
				   <div class="table-responsive">
					  <table class="o_list_table table table-sm table-hover table-striped o_list_table_ungrouped o_empty_list" style="table-layout: fixed;">
						 <thead>
							<tr>
							   <th data-name="attribute_id" tabindex="-1" class="o_column_sortable" title="Attribute" style="width: 50%;">Attribute</th>
							   <th data-name="value_ids" class="o_many2many_tags_cell" tabindex="-1" title="Values" style="width: 50%;">Values</th>
							</tr>
						 </thead>
						 <tbody class="ui-sortable">
							<tr>
							   <td colspan="2">&nbsp;</td>
							</tr>
							<tr>
							   <td colspan="2">&nbsp;</td>
							</tr>
							<tr>
							   <td colspan="2">&nbsp;</td>
							</tr>
							<tr>
							   <td colspan="2">&nbsp;</td>
							</tr>
						 </tbody>
						 <tfoot>
							<tr>
							   <td></td>
							   <td></td>
							</tr>
						 </tfoot>
					  </table>
				   </div>
				</div>
			 </div>
			 <p class="oe_grey oe_edit_only"><strong>Warning</strong>: adding or deleting attributes
				will delete and recreate existing variants and lead
				to the loss of their possible customizations.
			 </p>
				`;
				
			}
		});
	});
};



function tabAjax3(uv){
	console.log("Hello World!")
	ran = Math.random()
	odoo.define('web.ajax386'+ran, function(require){
		'use.strict';
		var ajax = require('web.ajax');

			//get the values to pass on to the controller
			var res = ajax.jsonRpc('/pcm/fetch', 'call', {
				'pid': uv,

			}).then(function(returnval){
				returnval = JSON.parse(returnval);
				if (returnval['status'] == 'OK') {
					//format the html with newly acquired data from dataSafariAjax()
					console.log('return successfull')
					var x = returnval['ents'];
					document.getElementById('white-board').innerHTML=`
					<div class="o_group">
					<table class="o_group o_inner_group o_group_col_6">
					   <tbody>
						  <tr>
							 <td colspan="2" style="width: 100%;">
								<div class="o_horizontal_separator">Invoicing</div>
							 </td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label" for="o_field_input_81" data-original-title="" title="">Invoicing Policy</label></td>
							 <td style="width: 100%;"><span class="o_field_radio o_field_widget" name="invoice_policy" id="o_field_input_81">Ordered quantities</span></td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label o_invisible_modifier" for="o_field_input_83" data-original-title="" title="">Track Service</label></td>
							 <td style="width: 100%;"><span class="o_field_radio o_field_widget o_invisible_modifier" name="service_type" id="o_field_input_83">Manually set quantities on order</span></td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label o_invisible_modifier" for="o_field_input_85">Service Invoicing Policy</label></td>
							 <td style="width: 100%;"><span class="o_field_radio o_field_widget o_invisible_modifier" name="service_policy" id="o_field_input_85"></span></td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label o_invisible_modifier" for="o_field_input_87" data-original-title="" title="">Service Tracking</label></td>
							 <td style="width: 100%;"><span class="o_field_radio o_field_widget o_invisible_modifier" name="service_tracking" id="o_field_input_87">Don't create task</span></td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label o_invisible_modifier o_form_label_empty" for="o_field_input_88" data-original-title="" title="">Project</label></td>
							 <td style="width: 100%;"><a class="o_form_uri o_field_widget o_invisible_modifier o_field_empty" href="#" name="project_id" id="o_field_input_88"><span></span></a></td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label o_invisible_modifier o_form_label_empty" for="o_field_input_89" data-original-title="" title="">Project Template</label></td>
							 <td style="width: 100%;"><a class="o_form_uri o_field_widget o_invisible_modifier o_field_empty" href="#" name="project_template_id" id="o_field_input_89"><span></span></a></td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label o_invisible_modifier o_readonly_modifier" for="o_field_input_90">Re-Invoice Policy visible</label></td>
							 <td style="width: 100%;">
								<div class="o_field_boolean o_field_widget custom-control custom-checkbox o_invisible_modifier o_readonly_modifier" name="visible_expense_policy"><input type="checkbox" id="checkbox-138" class="custom-control-input" disabled=""><label for="o_field_input_90" class="custom-control-label">​</label></div>
							 </td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label" for="o_field_input_92" data-original-title="" title="">Re-Invoice Expenses</label></td>
							 <td style="width: 100%;"><span class="o_field_radio o_field_widget" name="expense_policy" id="o_field_input_92">No</span></td>
						  </tr>
					   </tbody>
					</table>
					<table class="o_group o_inner_group o_group_col_6">
					   <tbody>
						  <tr></tr>
					   </tbody>
					</table>
					<table class="o_group o_inner_group o_group_col_6">
					   <tbody>
						  <tr>
							 <td colspan="2" style="width: 100%;">
								<div class="o_horizontal_separator">Events</div>
							 </td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label" for="o_field_input_93" data-original-title="" title="">Is an Event Ticket</label></td>
							 <td style="width: 100%;">
								<div class="o_field_boolean o_field_widget custom-control custom-checkbox" name="event_ok"><input type="checkbox" id="checkbox-139" class="custom-control-input" disabled=""><label for="o_field_input_93" class="custom-control-label">​</label></div>
							 </td>
						  </tr>
					   </tbody>
					</table>
				 </div>
				 <div class="o_group">
					<table class="o_group o_inner_group o_group_col_6">
					   <tbody>
						  <tr>
							 <td colspan="2" style="width: 100%;">
								<div class="o_horizontal_separator">Options</div>
							 </td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label o_form_label_empty" for="o_field_input_94" data-original-title="" title="">Optional Products</label></td>
							 <td style="width: 100%;">
								<div class="o_field_many2manytags o_field_widget o_field_empty" name="optional_product_ids">   </div>
							 </td>
						  </tr>
					   </tbody>
					</table>
				 </div>
				 <table class="o_group o_inner_group">
					<tbody>
					   <tr>
						  <td colspan="2" style="width: 100%;">
							 <div class="o_horizontal_separator">Sales Description</div>
						  </td>
					   </tr>
					   <tr>
						  <td style="width: 50%;"><span class="o_field_text o_field_widget" name="description_sale" placeholder="This note is added to sales orders and invoices." data-original-title="" title="">ACC LAN Emulex VFA5.2 ML2 Dual Port 10GbE SFP Adapter</span></td>
					   </tr>
					</tbody>
				 </table>
				 <table class="o_group o_inner_group o_invisible_modifier">
					<tbody>
					   <tr>
						  <td colspan="2" style="width: 100%;">
							 <div class="o_horizontal_separator">Warning when Selling this Product</div>
						  </td>
					   </tr>
					   <tr>
						  <td style="width: 50%;"><span name="sale_line_warn" class="o_field_widget o_required_modifier" data-original-title="" title="">No Message</span></td>
					   </tr>
					   <tr>
						  <td colspan="3" style="width: 150%;"><span class="o_field_text o_field_widget o_invisible_modifier o_readonly_modifier o_field_empty" name="sale_line_warn_msg"></span></td>
					   </tr>
					</tbody>
				 </table>
					`;
					
				}
			});
	});
};

function tabAjax4(uv){
	console.log("Hello World!")
	ran = Math.random()
	odoo.define('web.ajax486'+ran, function(require){
		'use.strict';
		var ajax = require('web.ajax');

			//get the values to pass on to the controller
			var res = ajax.jsonRpc('/pcm/fetch', 'call', {
				'pid': uv,

			}).then(function(returnval){
				returnval = JSON.parse(returnval);
				if (returnval['status'] == 'OK') {
					//format the html with newly acquired data from dataSafariAjax()
					console.log('return successfull')
					var x = returnval['ents'];
					document.getElementById('white-board').innerHTML=`
					<div class="o_group">
					<table class="o_group o_inner_group o_group_col_6">
					   <tbody>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label" for="o_field_input_96" data-original-title="" title="">Available in POS</label></td>
							 <td style="width: 100%;">
								<div class="o_field_boolean o_field_widget custom-control custom-checkbox" name="available_in_pos"><input type="checkbox" id="checkbox-140" class="custom-control-input" disabled=""><label for="o_field_input_96" class="custom-control-label">​</label></div>
							 </td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label" for="o_field_input_97" data-original-title="" title="">Category</label></td>
							 <td style="width: 100%;"><a class="o_form_uri o_field_widget" href="#id=5&amp;model=pos.category" name="pos_categ_id" id="o_field_input_97"><span>All / Server Accessory</span></a></td>
						  </tr>
						  <tr>
							 <td class="o_td_label"><label class="o_form_label" for="o_field_input_98" data-original-title="" title="">To Weigh With Scale</label></td>
							 <td style="width: 100%;">
								<div class="o_field_boolean o_field_widget custom-control custom-checkbox" name="to_weight"><input type="checkbox" id="checkbox-141" class="custom-control-input" disabled=""><label for="o_field_input_98" class="custom-control-label">​</label></div>
							 </td>
						  </tr>
					   </tbody>
					</table>
				 </div>

					`;
					
				}
			});
	});
};

function tabAjax5(uv){
	console.log("Hello World!")
	ran = Math.random()
	odoo.define('web.ajax586'+ran, function(require){
	'use.strict';
	var ajax = require('web.ajax');

		//get the values to pass on to the controller
		var res = ajax.jsonRpc('/pcm/fetch', 'call', {
			'pid': uv,

		}).then(function(returnval){
			returnval = JSON.parse(returnval);
			if (returnval['status'] == 'OK') {
				//format the html with newly acquired data from dataSafariAjax()
				console.log('return successfull')
				var x = returnval['ents'];
				document.getElementById('white-board').innerHTML=`
				<div class="o_group">
				<table class="o_group o_inner_group o_group_col_6">
				   <tbody>
					  <tr>
						 <td colspan="2" style="width: 100%;">
							<div class="o_horizontal_separator">Shop</div>
						 </td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label o_invisible_modifier o_readonly_modifier" for="o_field_input_100" data-original-title="" title="">Website URL</label></td>
						 <td style="width: 100%;"><span class="o_field_char o_field_widget o_invisible_modifier o_readonly_modifier" name="website_url">/shop/product/00ag560-23390</span></td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label o_form_label_empty" for="o_field_input_101" data-original-title="" title="">Website</label></td>
						 <td style="width: 100%;"><a class="o_form_uri o_field_widget o_field_empty" href="#" name="website_id" id="o_field_input_101"><span></span></a></td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label o_invisible_modifier" for="o_field_input_102" data-original-title="" title="">Website Sequence</label></td>
						 <td style="width: 100%;"><span class="o_field_integer o_field_number o_field_widget o_invisible_modifier" name="website_sequence">10,125</span></td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label o_required_modifier" for="o_field_input_45" data-original-title="" title="">Product Category</label></td>
						 <td style="width: 100%;"><a class="o_form_uri o_field_widget o_required_modifier" href="#id=641&amp;model=product.category" name="categ_id" id="o_field_input_45"><span>Server Accessory</span></a></td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label o_invisible_modifier" for="o_field_input_103" data-original-title="" title="">Availability</label></td>
						 <td style="width: 100%;"><span name="inventory_availability" class="o_field_widget o_invisible_modifier">Sell regardless of inventory</span></td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label o_invisible_modifier" for="o_field_input_104">Availability Threshold</label></td>
						 <td style="width: 100%;"><span class="o_field_float o_field_number o_field_widget o_invisible_modifier" name="available_threshold">5.00</span></td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label o_invisible_modifier o_form_label_empty" for="o_field_input_105">Custom Message</label></td>
						 <td style="width: 100%;"><span class="o_field_text o_field_widget o_invisible_modifier o_field_empty" name="custom_message"></span></td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label" for="o_field_input_106" data-original-title="" title="">Alternative Products</label></td>
						 <td style="width: 100%;">
							<div class="o_field_many2manytags o_field_widget" name="alternative_product_ids">
							   <div class="badge badge-pill  o_tag_color_0" data-color="0" data-index="0" data-id="23391" title="Tag color: No color">
								  <span class="o_badge_text" title="00AG570"><span role="img" aria-label="Tag color: No color"></span>00AG570</span>
							   </div>
							</div>
						 </td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label" for="o_field_input_107" data-original-title="" title="">Accessory Products</label></td>
						 <td style="width: 100%;">
							<div class="o_field_many2manytags o_field_widget" name="accessory_product_ids">
							   <div class="badge badge-pill  o_tag_color_0" data-color="0" data-index="0" data-id="5" title="Tag color: No color">
								  <span class="o_badge_text" title="[FURN_7777] Office Chair"><span role="img" aria-label="Tag color: No color"></span>[FURN_7777] Office Chair</span>
							   </div>
							   <div class="badge badge-pill  o_tag_color_0" data-color="0" data-index="1" data-id="6" title="Tag color: No color">
								  <span class="o_badge_text" title="[FURN_8888] Office Lamp"><span role="img" aria-label="Tag color: No color"></span>[FURN_8888] Office Lamp</span>
							   </div>
							</div>
						 </td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label o_invisible_modifier o_form_label_empty" for="o_field_input_108">Styles</label></td>
						 <td style="width: 100%;">
							<div class="o_field_many2manytags o_field_widget o_invisible_modifier o_field_empty" name="website_style_ids">
							</div>
						 </td>
					  </tr>
				   </tbody>
				</table>
			 </div>
			 <table class="o_group o_inner_group">
				<tbody>
				   <tr>
					  <td colspan="2" style="width: 100%;">
						 <div class="o_horizontal_separator">Extra Product Media</div>
					  </td>
				   </tr>
				   <tr>
					  <td style="width: 50%;">
						 <div class="o_field_one2many o_field_widget o_field_x2many o_field_x2many_kanban o_website_sale_image_list" name="product_template_image_ids" id="o_field_input_195">
							<div class="o_cp_controller">
							   <div class="o_x2m_control_panel">
								  <nav class="o_cp_buttons" aria-label="Control panel toolbar" role="toolbar"></nav>
								  <nav class="o_cp_pager" aria-label="Pager" role="toolbar">
									 <div class="o_pager o_hidden">
										<span class="o_pager_counter">
										<span class="o_pager_value"></span> / <span class="o_pager_limit"></span>
										</span>
										<span class="btn-group" aria-atomic="true">
										<button type="button" class="fa fa-chevron-left btn btn-secondary o_pager_previous" aria-label="Previous" title="Previous" tabindex="-1"></button>
										<button type="button" class="fa fa-chevron-right btn btn-secondary o_pager_next" aria-label="Next" title="Next" tabindex="-1"></button>
										</span>
									 </div>
								  </nav>
							   </div>
							</div>
							<div class="o_kanban_view o_kanban_ungrouped">
							   <div class="o_kanban_record o_kanban_ghost"></div>
							   <div class="o_kanban_record o_kanban_ghost"></div>
							   <div class="o_kanban_record o_kanban_ghost"></div>
							   <div class="o_kanban_record o_kanban_ghost"></div>
							   <div class="o_kanban_record o_kanban_ghost"></div>
							   <div class="o_kanban_record o_kanban_ghost"></div>
							</div>
						 </div>
					  </td>
				   </tr>
				</tbody>
			 </table>
				`;
				
			}
		});
	});
};


function tabAjax6(uv){
	console.log("Hello World!")
	ran = Math.random()
	odoo.define('web.ajax686'+ran, function(require){
	'use.strict';
	var ajax = require('web.ajax');

		//get the values to pass on to the controller
		var res = ajax.jsonRpc('/pcm/fetch', 'call', {
			'pid': uv,

		}).then(function(returnval){
			returnval = JSON.parse(returnval);
			if (returnval['status'] == 'OK') {
				//format the html with newly acquired data from dataSafariAjax()
				console.log('return successfull')
				var x = returnval['ents'];
				document.getElementById('white-board').innerHTML=`
				<div class="o_field_one2many o_field_widget o_field_x2many o_field_x2many_list" name="seller_ids" id="o_field_input_192" data-original-title="" title="">
				<div class="o_cp_controller">
				   <div class="o_x2m_control_panel">
					  <nav class="o_cp_buttons" aria-label="Control panel toolbar" role="toolbar"></nav>
					  <nav class="o_cp_pager" aria-label="Pager" role="toolbar">
						 <div class="o_pager o_hidden">
							<span class="o_pager_counter">
							<span class="o_pager_value"></span> / 
							<span class="o_pager_limit"></span>
							</span>
							<span class="btn-group" aria-atomic="true">
							<button type="button" class="fa fa-chevron-left btn btn-secondary o_pager_previous" aria-label="Previous" title="Previous" tabindex="-1"></button>
							<button type="button" class="fa fa-chevron-right btn btn-secondary o_pager_next" aria-label="Next" title="Next" tabindex="-1"></button>
							</span>
						 </div>
					  </nav>
				   </div>
				</div>
				<div class="o_list_view o_list_optional_columns">
				   <div class="table-responsive">
					  <table class="o_list_table table table-sm table-hover table-striped o_list_table_ungrouped o_empty_list" style="table-layout: fixed;">
						 <thead>
							<tr>
							   <th data-name="sequence" class="o_handle_cell o-sort-up o_column_sortable o_list_number_th" tabindex="-1" aria-sort="ascending" title="" style="width: 33px;"></th>
							   <th data-name="name" tabindex="-1" class="o_column_sortable" title="Vendor" style="width: 50%;">Vendor</th>
							   <th data-name="company_id" tabindex="-1" class="o_column_sortable" title="Company" style="width: 50%;">Company</th>
							   <th data-name="min_qty" tabindex="-1" class="o_column_sortable o_list_number_th" title="Quantity" style="width: 92px;">Quantity</th>
							   <th data-name="price" tabindex="-1" class="o_column_sortable o_list_number_th" title="Price" style="width: 92px;">Price</th>
							</tr>
						 </thead>
						 <tbody class="ui-sortable">
							<tr>
							   <td colspan="5">&nbsp;</td>
							</tr>
							<tr>
							   <td colspan="5">&nbsp;</td>
							</tr>
							<tr>
							   <td colspan="5">&nbsp;</td>
							</tr>
							<tr>
							   <td colspan="5">&nbsp;</td>
							</tr>
						 </tbody>
						 <tfoot>
							<tr>
							   <td></td>
							   <td></td>
							   <td></td>
							   <td></td>
							   <td></td>
							</tr>
						 </tfoot>
						 <i class="o_optional_columns_dropdown_toggle fa fa-ellipsis-v"></i>
						 <div class="o_optional_columns text-center dropdown">
							<a class="dropdown-toggle text-dark o-no-caret" href="#" role="button" data-toggle="dropdown" data-display="static" aria-expanded="false"></a>
							<div class="dropdown-menu o_optional_columns_dropdown dropdown-menu-right" role="menu">
							   <div class="dropdown-item">
								  <div class="custom-control custom-checkbox">
									 <input type="checkbox" id="checkbox-181" class="custom-control-input" name="product_id">
									 <label for="checkbox-181" class="custom-control-label">Product Variant</label>
								  </div>
							   </div>
							   <div class="dropdown-item">
								  <div class="custom-control custom-checkbox"><input type="checkbox" id="checkbox-182" class="custom-control-input" name="product_name">
									 <label for="checkbox-182" class="custom-control-label">Vendor Product Name</label>
								  </div>
							   </div>
							   <div class="dropdown-item">
								  <div class="custom-control custom-checkbox">
									 <input type="checkbox" id="checkbox-183" class="custom-control-input" name="product_code">
									 <label for="checkbox-183" class="custom-control-label">Vendor Product Code</label>
								  </div>
							   </div>
							   <div class="dropdown-item">
								  <div class="custom-control custom-checkbox"><input type="checkbox" id="checkbox-184" class="custom-control-input" name="date_start">
									 <label for="checkbox-184" class="custom-control-label">Start Date</label>
								  </div>
							   </div>
							   <div class="dropdown-item">
								  <div class="custom-control custom-checkbox">
									 <input type="checkbox" id="checkbox-185" class="custom-control-input" name="date_end">
									 <label for="checkbox-185" class="custom-control-label">
									 End Date
									 </label>
								  </div>
							   </div>
							</div>
						 </div>
					  </table>
				   </div>
				</div>
			 </div>
			 <div class="o_field_one2many o_field_widget o_field_x2many o_field_x2many_list o_invisible_modifier" name="variant_seller_ids" id="o_field_input_193">
				<div class="o_cp_controller">
				   <div class="o_x2m_control_panel">
					  <nav class="o_cp_buttons" aria-label="Control panel toolbar" role="toolbar"></nav>
					  <nav class="o_cp_pager" aria-label="Pager" role="toolbar">
						 <div class="o_pager o_hidden">
							<span class="o_pager_counter">
							<span class="o_pager_value">
							</span> / 
							<span class="o_pager_limit">
							</span>
							</span>
							<span class="btn-group" aria-atomic="true">
							<button type="button" class="fa fa-chevron-left btn btn-secondary o_pager_previous" aria-label="Previous" title="Previous" tabindex="-1"></button>
							<button type="button" class="fa fa-chevron-right btn btn-secondary o_pager_next" aria-label="Next" title="Next" tabindex="-1"></button>
							</span>
						 </div>
					  </nav>
				   </div>
				</div>
				<div class="o_list_view o_list_optional_columns">
				   <div class="table-responsive">
					  <table class="o_list_table table table-sm table-hover table-striped o_list_table_ungrouped o_empty_list">
						 <thead>
							<tr>
							   <th data-name="sequence" class="o_handle_cell o-sort-up o_column_sortable o_list_number_th" tabindex="-1" aria-sort="ascending" title=""></th>
							   <th data-name="name" tabindex="-1" class="o_column_sortable" title="Vendor">Vendor</th>
							   <th data-name="company_id" tabindex="-1" class="o_column_sortable" title="Company">Company</th>
							   <th data-name="min_qty" tabindex="-1" class="o_column_sortable o_list_number_th" title="Quantity">Quantity</th>
							   <th data-name="price" tabindex="-1" class="o_column_sortable o_list_number_th" title="Price">Price</th>
							</tr>
						 </thead>
						 <tbody class="ui-sortable">
							<tr>
							   <td colspan="5">&nbsp;</td>
							</tr>
							<tr>
							   <td colspan="5">&nbsp;</td>
							</tr>
							<tr>
							   <td colspan="5">&nbsp;</td>
							</tr>
							<tr>
							   <td colspan="5">&nbsp;</td>
							</tr>
						 </tbody>
						 <tfoot>
							<tr>
							   <td></td>
							   <td></td>
							   <td></td>
							   <td></td>
							   <td></td>
							</tr>
						 </tfoot>
						 <i class="o_optional_columns_dropdown_toggle fa fa-ellipsis-v"></i>
						 <div class="o_optional_columns text-center dropdown">
							<a class="dropdown-toggle text-dark o-no-caret" href="#" role="button" data-toggle="dropdown" data-display="static" aria-expanded="false">
							</a>
							<div class="dropdown-menu o_optional_columns_dropdown dropdown-menu-right" role="menu">
							   <div class="dropdown-item">
								  <div class="custom-control custom-checkbox"><input type="checkbox" id="checkbox-186" class="custom-control-input" name="product_id">
									 <label for="checkbox-186" class="custom-control-label">Product Variant</label>
								  </div>
							   </div>
							   <div class="dropdown-item">
								  <div class="custom-control custom-checkbox">
									 <input type="checkbox" id="checkbox-187" class="custom-control-input" name="product_name">
									 <label for="checkbox-187" class="custom-control-label">Vendor Product Name</label>
								  </div>
							   </div>
							   <div class="dropdown-item">
								  <div class="custom-control custom-checkbox"><input type="checkbox" id="checkbox-188" class="custom-control-input" name="product_code"><label for="checkbox-188" class="custom-control-label">
									 Vendor Product Code
									 </label>
								  </div>
							   </div>
							   <div class="dropdown-item">
								  <div class="custom-control custom-checkbox"><input type="checkbox" id="checkbox-189" class="custom-control-input" name="date_start">
									 <label for="checkbox-189" class="custom-control-label">Start Date</label>
								  </div>
							   </div>
							   <div class="dropdown-item">
								  <div class="custom-control custom-checkbox">
									 <input type="checkbox" id="checkbox-190" class="custom-control-input" name="date_end"><label for="checkbox-190" class="custom-control-label">End Date</label>
								  </div>
							   </div>
							</div>
						 </div>
					  </table>
				   </div>
				</div>
			 </div>
			 <div class="o_group">
				<table class="o_group o_inner_group o_invisible_modifier o_group_col_6">
				   <tbody>
					  <tr>
						 <td colspan="2" style="width: 100%;">
							<div class="o_horizontal_separator">Reordering</div>
						 </td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label" for="o_field_input_110" data-original-title="" title="">Purchase Automatically</label>
						 </td>
						 <td style="width: 100%;">
							<div class="o_field_boolean o_field_widget custom-control custom-checkbox" name="service_to_purchase">
							   <input type="checkbox" id="checkbox-142" class="custom-control-input" disabled=""><label for="o_field_input_110" class="custom-control-label">​</label>
							</div>
						 </td>
					  </tr>
				   </tbody>
				</table>
				<table class="o_group o_inner_group o_group_col_6">
				   <tbody>
					  <tr>
						 <td colspan="2" style="width: 100%;">
							<div class="o_horizontal_separator">Vendor Bills</div>
						 </td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label o_form_label_empty" for="o_field_input_111" data-original-title="" title="">Vendor Taxes</label></td>
						 <td style="width: 100%;">
							<div class="o_field_many2manytags o_field_widget o_field_empty" name="supplier_taxes_id">
							</div>
						 </td>
					  </tr>
					  <tr>
						 <td class="o_td_label"><label class="o_form_label" for="o_field_input_113" data-original-title="" title="">Control Policy</label></td>
						 <td style="width: 100%;"><span class="o_field_radio o_field_widget" name="purchase_method" id="o_field_input_113">On received quantities</span></td>
					  </tr>
				   </tbody>
				</table>
			 </div>
			 <table class="o_group o_inner_group">
				<tbody>
				   <tr>
					  <td colspan="2" style="width: 100%;">
						 <div class="o_horizontal_separator">Purchase Description
						 </div>
					  </td>
				   </tr>
				   <tr>
					  <td style="width: 50%;">
						 <span class="o_field_text o_field_widget o_field_empty" name="description_purchase" placeholder="This note is added to purchase orders.">
						 </span>
					  </td>
				   </tr>
				</tbody>
			 </table>
			 <table class="o_group o_inner_group o_invisible_modifier">
				<tbody>
				   <tr>
					  <td colspan="2" style="width: 100%;">
						 <div class="o_horizontal_separator">
							Warning when Purchasing this Product
						 </div>
					  </td>
				   </tr>
				   <tr>
					  <td style="width: 50%;">
						 <span name="purchase_line_warn" class="o_field_widget o_required_modifier" data-original-title="" title="">
						 No Message
						 </span>
					  </td>
				   </tr>
				   <tr>
					  <td colspan="3" style="width: 150%;">
						 <span class="o_field_text o_field_widget o_invisible_modifier o_readonly_modifier o_field_empty" name="purchase_line_warn_msg">
						 </span>
					  </td>
				   </tr>
				</tbody>
			 </table>
				`;
				
			}
		});
	});
};



function tabAjax7(uv){
	console.log("Hello World!")
	ran = Math.random()
	odoo.define('web.ajax786'+ran, function(require){
	'use.strict';
	var ajax = require('web.ajax');

		//get the values to pass on to the controller
		var res = ajax.jsonRpc('/pcm/fetch', 'call', {
			'pid': uv,

		}).then(function(returnval){
			returnval = JSON.parse(returnval);
			if (returnval['status'] == 'OK') {
				//format the html with newly acquired data from dataSafariAjax()
				console.log('return successfull')
				var x = returnval['ents'];
				document.getElementById('white-board').innerHTML=`
				<div class="o_group">
					<table class="o_group o_inner_group o_group_col_6">
						<tbody>
							<tr>
								<td colspan="2" style="width: 100%;">
									<div class="o_horizontal_separator">
										Operations
									</div>
								</td>
							</tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label" for="o_field_input_543" data-original-title="" title="">
										Routes
									</label>
								</td>
								<td style="width: 100%;">
									<div aria-atomic="true" name="route_ids" class="o_field_widget">
										<div aria-atomic="true">
											<div>
												<div class="custom-control custom-checkbox">
													<input type="checkbox" id="o_many2many_checkbox_571" class="custom-control-input" data-record-id="1" disabled="">
													<label for="o_many2many_checkbox_571" class="custom-control-label o_form_label">Replenish on Order (MTO)</label>
												</div>
											</div>
											<div>
												<div class="custom-control custom-checkbox">
													<input type="checkbox" id="o_many2many_checkbox_572" class="custom-control-input" data-record-id="11" disabled="">
													<label for="o_many2many_checkbox_572" class="custom-control-label o_form_label">Manufacture</label>
												</div>
											</div>
											<div>
												<div class="custom-control custom-checkbox">
													<input type="checkbox" id="o_many2many_checkbox_573" class="custom-control-input" data-record-id="15" disabled="">
													<label for="o_many2many_checkbox_573" class="custom-control-label o_form_label">Buy</label>
												</div>
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label" for="o_field_input_544" data-original-title="" title="">
										Manufacturing Lead Time
									</label>
								</td>
								<td style="width: 100%;">
									<div attrs="{'invisible':[('type','=','service')]}">
										<span class="o_field_float o_field_number o_field_widget oe_inline" name="produce_delay">
											0.00
										</span> days
									</div>
								</td>
							</tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label o_invisible_modifier o_readonly_modifier o_form_label_empty" for="o_field_input_545">
										Category Routes
									</label>
								</td>
								<td style="width: 100%;">
									<div class="o_field_many2manytags o_field_widget o_invisible_modifier o_readonly_modifier o_field_empty" name="route_from_categ_ids">
				
									</div>
								</td>
							</tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label" for="o_field_input_546" data-original-title="" title="">
										Customer Lead Time
									</label>
								</td>
								<td style="width: 100%;">
									<div attrs="{'invisible': [('sale_ok', '=', False)]}">
									<span class="o_field_float o_field_number o_field_widget oe_inline" name="sale_delay" style="vertical-align:baseline">
										0.00
									</span> days
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="o_group o_inner_group o_invisible_modifier o_group_col_6">
						<tbody>
							<tr>
								<td colspan="2" style="width: 100%;">
									<div class="o_horizontal_separator">
										Traceability
									</div>
								</td>
							</tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label o_required_modifier" for="o_field_input_548" data-original-title="" title="">
										Tracking
									</label>
								</td>
								<td style="width: 100%;">
									<span class="o_field_radio o_field_widget o_required_modifier" name="tracking" id="o_field_input_548">
										No Tracking
									</span>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="o_group o_inner_group o_invisible_modifier o_group_col_6">
						<tbody>
							<tr>
								<td colspan="2" style="width: 100%;">
									<div class="o_horizontal_separator">
										Counterpart Locations
									</div>
								</td>
							</tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label" for="o_field_input_549" data-original-title="" title="">
										Production Location
									</label>
								</td>
								<td style="width: 100%;">
									<a class="o_form_uri o_field_widget" href="#id=15&amp;model=stock.location" name="property_stock_production" id="o_field_input_549">
										<span>
											Virtual Locations/YourCompany: Production
										</span>
									</a>
								</td>
							</tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label" for="o_field_input_550" data-original-title="" title="">
										Inventory Location
									</label>
								</td>
								<td style="width: 100%;">
									<a class="o_form_uri o_field_widget" href="#id=14&amp;model=stock.location" name="property_stock_inventory" id="o_field_input_550">
										<span>
											Virtual Locations/YourCompany: Inventory adjustment
										</span>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="o_group o_inner_group o_group_col_6">
						<tbody>
							<tr>
								<td colspan="2" style="width: 100%;">
									<div class="o_horizontal_separator">Logistics</div></td></tr>
										<tr>
											<td class="o_td_label">
												<label class="o_form_label" for="o_field_input_495">
													Weight
												</label>
											</td>
											<td style="width: 100%;"><div class="o_row" name="weight" attrs="{'invisible':[('product_variant_count', '>', 1), ('is_product_variant', '=', False)]}">
											<span class="o_field_float o_field_number o_field_widget" name="weight">
												0.20
											</span>
											<span>
												<span class="o_field_char o_field_widget o_readonly_modifier" name="weight_uom_name">
													kg
												</span>
											</span>
									</div>
								</td>
							</tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label" for="o_field_input_551">
										Volume
									</label>
								</td>
								<td style="width: 100%;">
									<div class="o_row" name="volume" attrs="{'invisible':[('product_variant_count', '>', 1), ('is_product_variant', '=', False)]}">
										<span class="o_field_float o_field_number o_field_widget o_readonly_modifier" name="vol">
											0.00
										</span>
										<span>
											<span class="o_field_char o_field_widget o_readonly_modifier" name="volume_uom_name">
												m³
											</span>
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label" for="o_field_input_552" data-original-title="" title="">
										Responsible
									</label>
								</td>
								<td style="width: 100%;">
									<a class="o_form_uri o_field_widget" href="#id=2&amp;model=res.users" name="responsible_id" id="o_field_input_552">
										<span>Mitchell Admin</span>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<table class="o_group o_inner_group o_invisible_modifier">
					<tbody>
						<tr>
							<td colspan="2" style="width: 100%;">
								<div class="o_horizontal_separator">
									Packaging
								</div>
							</td>
						</tr>
						<tr>
							<td style="width: 50%;">
								<div class="o_field_one2many o_field_widget o_field_x2many o_field_x2many_list" name="packaging_ids" id="o_field_input_622" data-original-title="" title="">
									<div class="o_cp_controller">
										<div class="o_x2m_control_panel">
											<nav class="o_cp_buttons" aria-label="Control panel toolbar" role="toolbar"></nav>
											<nav class="o_cp_pager" aria-label="Pager" role="toolbar">
												<div class="o_pager o_hidden">
													<span class="o_pager_counter">
														<span class="o_pager_value"></span> / <span class="o_pager_limit"></span>
													</span>
													<span class="btn-group" aria-atomic="true">
														<button type="button" class="fa fa-chevron-left btn btn-secondary o_pager_previous" aria-label="Previous" title="Previous" tabindex="-1"></button>
														<button type="button" class="fa fa-chevron-right btn btn-secondary o_pager_next" aria-label="Next" title="Next" tabindex="-1"></button>
													</span>
												</div>
											</nav>
										</div>
									</div>
									<div class="o_list_view">
										<div class="table-responsive">
											<table class="o_list_table table table-sm table-hover table-striped o_list_table_ungrouped o_empty_list">
												<thead>
													<tr>
														<th data-name="name" tabindex="-1" class="o_column_sortable" title="Packaging">Packaging</th>
														<th data-name="qty" tabindex="-1" class="o_column_sortable o_list_number_th" title="Contained Quantity">
															Contained Quantity
														</th>
														<th data-name="company_id" tabindex="-1" class="o_column_sortable" title="Company">
															Company
														</th>
													</tr>
												</thead>
												<tbody class="ui-sortable">
													<tr>
														<td colspan="3">&nbsp;
														</td>
													</tr>
													<tr>
														<td colspan="3">&nbsp;</td></tr><tr><td colspan="3">&nbsp;</td></tr><tr><td colspan="3">&nbsp;
														</td>
													</tr>
												</tbody>
												<tfoot>
													<tr>
														<td></td><td></td><td></td>
													</tr>
												</tfoot>
											</table>
										</div>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="o_group o_inner_group">
					<tbody>
						<tr>
							<td colspan="2" style="width: 100%;">
								<div class="o_horizontal_separator">
									Description for Delivery Orders
								</div>
							</td>
						</tr>
						<tr>
									<td style="width: 50%;">
								<span class="o_field_text o_field_widget o_field_empty" name="description_pickingout" placeholder="This note is added to delivery orders.">
								</span>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="o_group o_inner_group">
					<tbody>
						<tr>
							<td colspan="2" style="width: 100%;">
								<div class="o_horizontal_separator">Description for Receipts
								</div>
							</td>
						</tr>
						<tr>
							<td style="width: 50%;"><span class="o_field_text o_field_widget o_field_empty" name="description_pickingin" placeholder="This note is added to receipt orders (e.g. where to store the product in the warehouse).">
								</span>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="o_group o_inner_group o_invisible_modifier">
					<tbody>
						<tr>
							<td colspan="2" style="width: 100%;">
								<div class="o_horizontal_separator">
									Description for Internal Transfers
								</div>
							</td>
						</tr>
						<tr>
							<td style="width: 50%;">
								<span class="o_field_text o_field_widget o_field_empty" name="description_picking" placeholder="This note is added to internal transfer orders (e.g. where to pick the product in the warehouse).">
								</span>
							</td>
						</tr>
					</tbody>
				</table>													
				`;
			}
		});
	});
};


function tabAjax8(uv){
	console.log("Hello World!")
	ran = Math.random()
	odoo.define('web.ajax886'+ran, function(require){
	'use.strict';
	var ajax = require('web.ajax');

		//get the values to pass on to the controller
		var res = ajax.jsonRpc('/pcm/fetch', 'call', {
			'pid': uv,

		}).then(function(returnval){
			returnval = JSON.parse(returnval);
			if (returnval['status'] == 'OK') {
				//format the html with newly acquired data from dataSafariAjax()
				console.log('return successfull')
				var x = returnval['ents'];
				document.getElementById('white-board').innerHTML=`
				<div class="o_group">
					<table class="o_group o_inner_group o_group_col_6">
						<tbody>
							<tr>
								<td colspan="2" style="width: 100%;">
									<div class="o_horizontal_separator">
										Receivables
									</div>
								</td>
							</tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label o_form_label_empty" for="o_field_input_126" data-original-title="" title="">Income Account</label>
								</td>
								<td style="width: 100%;">
									<a class="o_form_uri o_field_widget o_field_empty" href="#" name="property_account_income_id" id="o_field_input_126">
										<span></span>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="o_group o_inner_group o_group_col_6">
						<tbody>
							<tr>
								<td colspan="2" style="width: 100%;">
									<div class="o_horizontal_separator">Payables</div></td></tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label o_form_label_empty" for="o_field_input_127" data-original-title="" title="">
										Expense Account
									</label>
								</td>
								<td style="width: 100%;">
									<a class="o_form_uri o_field_widget o_field_empty" href="#" name="property_account_expense_id" id="o_field_input_127">
										<span></span>
									</a>
								</td>
							</tr>
							<tr>
								<td class="o_td_label">
									<label class="o_form_label o_form_label_empty" for="o_field_input_128" data-original-title="" title="">
										Price Difference Account
									</label>
								</td>
								<td style="width: 100%;">
									<a class="o_form_uri o_field_widget o_field_empty" href="#" name="property_account_creditor_price_difference" id="o_field_input_128">
										<span></span>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<table class="o_group o_inner_group">
					<tbody>
						<tr></tr>
					</tbody>
				</table>
				`;
			}
		});
	});
};
