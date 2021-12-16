from odoo import http

class OdooController(http.Controller):
    @http.route('/odoo_controller', auth='public', website=True)
    def action_templates(self, **kw):
        return request.render("bosspac_product_management.sample", {})
        