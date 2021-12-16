from odoo import models, fields, api


class ProductManagementSettings(models.TransientModel):
    _inherit = 'res.config.settings'
    access_code = fields.Char(string='access_code')

    # def set_values(self):
    #     res = super(ProductManagementSettings, self).set_values()
    #     self.env['ir.config_parameter'].set_param('bosspac_product_management.note', self.note)
    #     return res
    #
    # @api.model
    # def get_values(self):
    #     res = super(ProductManagementSettings, self).get_values()
    #     ICPSudo = self.env['ir.config_parameter'].sudo()
    #     notes = ICPSudo.get_param('bosspac_product_management.note')
    #     res.update(
    #         note=notes
    #     )
    #     return res