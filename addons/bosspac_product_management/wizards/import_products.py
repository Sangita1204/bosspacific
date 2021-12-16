from odoo import models, fields, api
import base64
import io, csv
import pandas as pd
import logging


class import_products(models.Model):
    _name = "import.products"
    _inherit = "jinja.mixin"
    _description = "import_products"

    context_active_id = fields.Char(default=lambda self: self.env.context.get('test', False), store=False,
                                    readonly=True)
    vendor = fields.Selection([
        ('4','Synnex'),
        ('3', 'Tech Century'),
        ('2', 'Ingram'),
        ('1', 'Others'),
    ])

    uploads = fields.Binary(string="Upload", store=True, attachment=True)

    def view_data(self):
        df_input = pd.DataFrame([
            ["MYOB SKU", "Float", "myob_sku"],
            ["Product Description", "Text", "product_description"],
            ["Brand", "Char", "brand"],
            ["Price ex GST", "Float", "price_ex_gst"],
            ["Description", "Text", "description"],
            ["MPN", "Char", "mpn"],
            ["Category1", "Char", "category1"],
            ["Category2", "Char", "category2"]
        ], columns=["ColumnName", "DataType", "destination_column"])

        columnlist = df_input.columns.tolist()
        print(columnlist)
        rows = {}
        for i, row in df_input.iterrows():
            rows = row["ColumnName"]
            print("row", rows)
        return {
            "env": self.env,
            "rows": rows,
        }


    def imports(self):
        # record = super(import_products, self).imporrts()
        # record_obj = self.env['import.products']. browse(self._context.get('active_id'))
        # record.obj


        if (self.vendor == '4'):
            vendor = "Synnex"
        elif (self.vendor == '2'):
            vendor = "Ingram"
        elif (self.vendor == '3'):
            vendor = "Tech Century"
        else:
            vendor = "Others"
            # vendors name

        # Read CSV file(https://www.odoo.com/forum/help-1/how-to-read-a-csv-file-167642)

        if(vendor=="Others"):




            action = self.env.ref('bosspac_product_management.import_product_action').read()[0]
            context = self._context.copy()
            context['test'] = 'Sangita'
            action['context'] = context

            return action




        csv_data = base64.b64decode(self.uploads)
        data_file = io.StringIO(csv_data.decode("utf-8"))
        data_file.seek(0)
        file_reader = []
        csv_reader = csv.reader(data_file, delimiter='~')
        file_reader.extend(csv_reader)
        # print("file", file_reader)
        print("-------name-------", vendor)



class import_products_view(models.Model):
    _name = "import.products.view"
    _description = "import_products_view"
    
    vendor_name = fields.Char(string='Vendor')