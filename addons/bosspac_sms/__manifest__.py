# -*- coding: utf-8 -*-
{
    'name': "Boss Pacific SMS",

    'summary': """
        Boss Pacific SMS Module""",

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
    'depends': ['base'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
