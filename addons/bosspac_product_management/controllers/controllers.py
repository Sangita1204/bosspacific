# -*- coding: utf-8 -*-
# from odoo import http


# class BosspacProductManagement(http.Controller):
#     @http.route('/bosspac_product_management/bosspac_product_management/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/bosspac_product_management/bosspac_product_management/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('bosspac_product_management.listing', {
#             'root': '/bosspac_product_management/bosspac_product_management',
#             'objects': http.request.env['bosspac_product_management.bosspac_product_management'].search([]),
#         })

#     @http.route('/bosspac_product_management/bosspac_product_management/objects/<model("bosspac_product_management.bosspac_product_management"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('bosspac_product_management.object', {
#             'object': obj
#         })
