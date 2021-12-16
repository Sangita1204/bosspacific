# -*- coding: utf-8 -*-
{
    'name': "Hello World",

    'summary': "Say Hello",
    'description': """
        Say Hellow to the world
    """,

    'version': '0.1',
    'depends': ['web', 'contacts', 'base_geolocalize'],
    'data': [
        "views/assets.xml",
        "views/data.xml",
        "views/bosspactemplate.xml"
    ],
    'qweb': ['static/src/templateold.xml'],
    'installable': True,
    'auto_install': True
}