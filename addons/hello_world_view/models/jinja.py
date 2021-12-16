from odoo import models
from jinja2 import Environment


class JinjaMixin(models.AbstractModel):
    """Model mixin to enable jinja templating"""
    _name = "jinja.mixin"

    templater = Environment(
        variable_start_string="{{{",
        variable_end_string="}}}",
    )

    def imports(self):
        return {}

    def fields_view_get(self, *args, **kwargs):
        res = super(JinjaMixin, self).fields_view_get(*args, **kwargs)
        res["arch"] = self.templater.from_string(res["arch"]).render(**self.view_data())
        return res
