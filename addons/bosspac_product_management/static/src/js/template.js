odoo.define('bosspac_product_management.Dashboard', function(require){
   "use strict";

   var AbstractAction = require('web.AbstractAction');
   var core = require('web.core');

   var Dashboard = AbstractAction.extend({
       template : 'HomePageTemplate',

       init: function(){
           this._super.apply(this,arguments);
           console.log("Sangitaaaaaa")
       }
   });
   core.action_registry.add('bosspac_product_management',Dashboard )
    return Dashboard;
});


//old using Qweb
// odoo.bosspac_product_management = function(instance,local){
//      var _t = instance.web._t,
//
//     _lt = instance.web._lt;
//      var QWeb = instance.web.qweb;
//     local.HomePage = instance.Widget.extend({
//     start: function() {
//         // var self = this;
//         // var model = new instance.web.model("bosspac.product");
//
//         this.$el.append(QWeb.render("HomePageTemplate"));
//     },
// });
// }
