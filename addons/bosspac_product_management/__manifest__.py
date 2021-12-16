# -*- coding: utf-8 -*-
{
    'name': "Boss Pacific Product Management",

    'summary': """
        Boss Pacific Product Management Module""",

    'description': """
        Boss Pacific Product Management Module
    """,

    'author': "Boss Pacific",
    'website': "https://www.bosspacific.com.au",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Website',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'product', 'web','contacts', 'base_geolocalize','hello_world_view'],

    # always loaded
    'data': [

        # 'views/settings.xml',
        'security/ir.model.access.csv',
        'wizards/import_products.xml',
        'views/assets.xml',
        'views/views.xml',
        'views/template.xml',
        'views/bosspactemplate.xml',



    ],
    'qweb': ['static/src/xml/templates.xml','static/src/xml/template.xml'],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
