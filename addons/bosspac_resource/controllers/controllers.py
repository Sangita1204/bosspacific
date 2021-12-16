# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request
import logging

import urllib
import urllib.request
from bs4 import BeautifulSoup
import datetime
import time

from string import ascii_lowercase
from odoo import conf, api
from odoo.addons.bosspac_resource.controllers.bosspac_resource import Product_Management
from openerp.addons.bosspac_utils.bosspac_varaibles import BosspacVariables
from openerp.addons.bosspac_utils.bosspac_utils import BosspacUtils
import string
import random
import argparse
import os
import sys

from urllib.request import urlopen, Request
import requests
import json

_logger = logging.getLogger(__name__)

REQUEST_HEADER = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
}


class BosspacResource(http.Controller):

    def __init__(self):
        self.UTILS = BosspacUtils()
        self.VARS = BosspacVariables()


    @http.route('/', auth='public', website=True)
    def home(self, **kw):
        return http.request.render('bosspac_resource.pages', {})

    @http.route('/<string:urlpart1>', type='http', auth="public", website=True)
    def level1(self, urlpart1=''):
        val = self.level1_data(urlpart1)
        return http.request.render('bosspac_resource.pages', val)

    def level1_data(self,urlpart1):
        cr, uid, context = request.cr, request.uid, request.context
        user_id = uid
        userName = request.env[self.VARS.RES_USER].browse(user_id).name
        _id="9"
        val = {
            'user': user_id,
            'username': userName,
            'urlpart1': urlpart1,
        }
        if urlpart1 == "product":

            productcategory = http.request.env["product.category"]
            status = True
            items3 = productcategory.search([("parent_id", "=", False)])
            subitems = []
            for item in items3:
                vals = {
                    "id": item.id,
                    "name": item.name,
                    "complete_name": item.complete_name,
                    "selected": item.id,
                    "parent_path": item.parent_path,
                }
                vals["subitems2"] = self.get_subitems(item.id)
                subitems.append(vals)
            related_products = self.obtain_ir_property(_id)
            
            val["id"] = _id
            val["ProductCategory"] = http.request.env["product.category"].search([], order="name asc")
            val["item"] = related_products
            val["subitems"] = subitems
            val["status"] = status
            val["lyes"] = http.request.env["product.category"].search([("id", "=", _id)])
            return val

 

    def get_subitems(self, parentId):
        productcategory = http.request.env["product.category"]
        items3 = productcategory.search(
            [("parent_id", "=", parentId)], order="name asc"
        )
        subitems = []
        for item in items3:
            # _logger.error("get_subitems111111111111["+str(item)+"]")
            if productcategory.search([("parent_id", "=", item.id)]):
                val = {
                    "id": item.id,
                    "name": item.name,
                    "complete_name": item.complete_name,
                    "parent_path": item.parent_path,
                }
                val["subitems2"] = self.get_subitems(item.id)
                subitems.append(val)
            else:
                val = {
                    "id": item.id,
                    "name": item.name,
                    "complete_name": item.complete_name,
                    "parent_path": item.parent_path,
                }
                val["subitems2"] = []
                subitems.append(val)
        return subitems

    def obtain_ir_property(self, catid):
        records = http.request.env["product.template"].search(
            [("categ_id", "=", catid)]
        )
        total_template = []
        for rec in records:
            items = dict(
                [
                    ("id", rec.id),
                    ("name", rec.name),
                    ("vendor_id", rec.vendor_id),
                    ("brand", rec.Brand.name),
                    ("qty1", rec.Qty1),
                    ("sales_price", rec.list_price),
                ]
            )
            product_product_id = (
                http.request.env["product.product"]
                    .search([("product_tmpl_id", "=", rec.id)])
                    .id
            )
            res_product = "product.product," + str(product_product_id)
            value_float_product = http.request.env["ir.property"].search(
                ["&", ("name", "=", "standard_price"), ("res_id", "=", res_product)]
            )
            items["cost"] = value_float_product.value_float
            total_template.append(items)
        return total_template

    # Load the table on click event of each category
    @http.route("/pcm/fetch/<int:cat_id>", type="json", auth="public", website=True)
    def _load_table(self, cid):
        val = []
        sol = http.request.env["product.template"].search([("categ_id", "=", cid)])
        for record in sol:
            lar = {record.id, record.vendor_id, record.name}
            val.append(lar)
        _logger.error("33333333333333333333 %s " % val)
        result = {
            "status": "OK",
            "message": "",
            "val": val,
        }
        return json.dumps(result)

    # Update the database once drag and drop is accomplished
    @http.route(
        "/pcm/update/<string:product_id>/<int:cat_id>",
        type="json",
        auth="public",
        website=True,
    )
    def update_dynamic_id(self, product_id="", cat_id="", **kw):
        product_ids = product_id[:-1]
        product_ids = product_ids.split(";")
        for product_id in product_ids:
            product_id = product_ids
            values = {"categ_id": cat_id}
            product = http.request.env["product.template"].search(
                [("id", "=", product_id)]
            )
            product.write(values)

        productcategory = http.request.env["product.category"]
        items3 = productcategory.search([("parent_id", "=", False)])
        subitems = []
        for item in items3:
            val = {
                "id": item.id,
                "name": item.name,
                "complete_name": item.complete_name,
                "selected": item.id,
            }
            val["subitems2"] = self.get_subitems(item.id)
            subitems.append(val)

        result = {
            "status": "OK",
            "message": "",
        }
        return json.dumps(result)

    # to scrape the images from vendor sites
    @http.route(
        "/pcm/products/browse/<int:prod_id>", type="json", auth="public", website=True
    )
    def my_world(self, prod_id, **kw):
        header = {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
        }
        pools = http.request.env["product.template"].search([("id", "=", prod_id)])
        subpool = []
        # if man_code:
        for pool in pools:
            vall = {"id": pool.id, "man_code1": pool.vendor_id, "name": pool.name}
            # vall['julus'] = self.get_ids(pool.name)
            subpool.append(vall)
            name = pool.name
            man_code = pool.vendor_id.replace(" ", "")
            # self.flickr_scraper(man_code, prod_id, name)
            _logger.info("The values posted from man_code1111: %s" % man_code)
            # initialise the newegg instance of the class
            product_elements = Product_Management(
                man_code, prod_id, name, header, "newegg", "checkedimg"
            )
            product_elements.get_images_store()
            self.get_images_new(man_code, prod_id, name, header)
            self.get_images_amazon(man_code, prod_id, name, header)
            self.get_images_pcbyte(man_code, prod_id, name, header)
            # self.get_images_newegg(man_code, prod_id, name, header)
            # self.get_images_mwave(man_code, prod_id, name, header)

        result = {
            "status": "OK",
            "message": "",
        }
        return json.dumps(result)

    def get_images_new(self, man_code, prod_id, name, header, **kw):
        i = 1
        url = "https://www.google.com.au/search?q=%s&source=lnms&tbm=isch" % man_code
        _logger.info("Subitemsyyyyyyyyyyyyyy: %s" % url)
        response = urlopen(
            Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
                },
            )
        )
        html = response.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
        image_elements = soup.find_all("img", {"class": "t0fcAb"})
        # _logger.info("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj11111[%s] [%s]" % (soup, image_elements))
        for img in image_elements:
            # temp1 = img.get('src')
            # _logger.info("11111[%s]" % (temp1))
            temp = img.get("data-src") or img.get("src")
            if temp and i < 7:
                image = temp
                _logger.error("11111[%s]" % (image))
                filename = str(i)
                if filename:
                    path = (
                            "/usr/lib/python3/dist-packages/odoo/addons/bosspac_resource/static/src/img/"
                            + str(prod_id)
                    )
                    if not os.path.exists(path):
                        os.mkdir(path)
                    _logger.error("ath.existath.existath.exist[%s]" % (image))
                    imagefile = open(path + "/" + filename + ".png", "wb+")
                    req = Request(image, headers=REQUEST_HEADER)
                    resp = urlopen(req)
                    imagefile.write(resp.read())
                    imagefile.close()
                i += 1

    def get_images_amazon(self, man_code, prod_id, name, header, **kw):
        i = 1
        url = "https://www.amazon.com.au/s?k=%s&ref=nb_sb_noss_1" % man_code
        _logger.info("Subitemsyyyyyyyyyyyyyy: %s" % url)
        response = urlopen(
            Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
                },
            )
        )
        html = response.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
        image_elements = soup.find_all("img", {"class": "s-image"})
        # _logger.info("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj11111[%s] [%s]" % (soup, image_elements))
        for img in image_elements:
            # temp1 = img.get('src')
            # _logger.info("11111[%s]" % (temp1))
            temp = img.get("data-src") or img.get("src")
            if temp and i < 7:
                image = temp
                _logger.error("11111[%s]" % (image))
                filename = str(i)
                if filename:
                    path = (
                            "/usr/lib/python3/dist-packages/odoo/addons/bosspac_resource/static/src/img/amazon/"
                            + str(prod_id)
                    )
                    if not os.path.exists(path):
                        os.mkdir(path)
                    _logger.error("ath.existath.existath.exist[%s]" % (image))
                    imagefile = open(path + "/" + filename + ".png", "wb+")
                    req = Request(image, headers=REQUEST_HEADER)
                    resp = urlopen(req)
                    imagefile.write(resp.read())
                    imagefile.close()
                i += 1

    def get_images_newegg(self, man_code, prod_id, name, header, **kw):
        i = 1
        url = "https://www.amazon.com.au/s?k=%s&ref=nb_sb_noss_1" % man_code
        _logger.info("Subitemsyyyyyyyyyyyyyy: %s" % url)
        response = urlopen(
            Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
                },
            )
        )
        html = response.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
        image_elements = soup.find_all("img", {"class": "t0fcAb"})
        # _logger.info("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj11111[%s] [%s]" % (soup, image_elements))
        for img in image_elements:
            # temp1 = img.get('src')
            # _logger.info("11111[%s]" % (temp1))
            temp = img.get("data-src") or img.get("src")
            if temp and i < 7:
                image = temp
                _logger.error("11111[%s]" % image)
                filename = str(i)
                if filename:
                    path = (
                            "/usr/lib/python3/dist-packages/odoo/addons/bosspac_resource/static/src/img/newegg/"
                            + str(prod_id)
                    )
                    if not os.path.exists(path):
                        os.mkdir(path)
                    _logger.error("ath.existath.existath.exist[%s]" % image)
                    imagefile = open(path + "/" + filename + ".png", "wb+")
                    req = Request(image, headers=REQUEST_HEADER)
                    resp = urlopen(req)
                    imagefile.write(resp.read())
                    imagefile.close()
                i += 1

    def get_images_mwave(self, man_code, prod_id, name, header, **kw):
        i = 1
        url = "https://www.mwave.com.au/searchresult?button=go&w=%s&af=" % man_code
        _logger.info("Subitemsyyyyyyyyyyyyyy: %s" % url)
        response = urlopen(
            Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
                },
            )
        )
        html = response.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
        image_elements = soup.find_all("img", {"class": "t0fcAb"})
        # _logger.info("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj11111[%s] [%s]" % (soup, image_elements))
        for img in image_elements:
            # temp1 = img.get('src')
            # _logger.info("11111[%s]" % (temp1))
            temp = img.get("data-src") or img.get("src")
            if temp and i < 7:
                image = temp
                _logger.error("11111[%s]" % (image))
                filename = str(i)
                if filename:
                    path = (
                            "/usr/lib/python3/dist-packages/odoo/addons/bosspac_resource/static/src/img/mwave/"
                            + str(prod_id)
                    )
                    if not os.path.exists(path):
                        os.mkdir(path)
                    _logger.error("ath.existath.existath.exist[%s]" % image)
                    imagefile = open(path + "/" + filename + ".png", "wb+")
                    req = Request(image, headers=REQUEST_HEADER)
                    resp = urlopen(req)
                    imagefile.write(resp.read())
                    imagefile.close()
                i += 1

    def get_images_pcbyte(self, man_code, prod_id, name, header, **kw):
        i = 1
        url = "https://www.pcbyte.com.au/store?search=%s" % man_code
        _logger.info("Subitemsyyyyyyyyyyyyyy: %s" % url)
        response = urlopen(
            Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
                },
            )
        )
        html = response.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
        image_elements = soup.find_all("img", {"class": "product_detail_img"})
        # _logger.info("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj11111[%s] [%s]" % (soup, image_elements))
        for img in image_elements:
            # temp1 = img.get('src')
            # _logger.info("11111[%s]" % (temp1))
            temp = img.get("data-src") or img.get("src")
            if temp and i < 7:
                image = temp
                _logger.error("11111[%s]" % (image))
                filename = str(i)
                if filename:
                    path = (
                            "/usr/lib/python3/dist-packages/odoo/addons/bosspac_resource/static/src/img/pcbyte/"
                            + str(prod_id)
                    )
                    if not os.path.exists(path):
                        os.mkdir(path)
                    _logger.error("ath.existath.existath.exist[%s]" % image)
                    imagefile = open(path + "/" + filename + ".png", "wb+")
                    req = Request(image, headers=REQUEST_HEADER)
                    resp = urlopen(req)
                    imagefile.write(resp.read())
                    imagefile.close()
                i += 1

    @http.route("/pcm/update/images/<int:idy>", type="json", website=True)
    def signup(self, idy, f_names, **kw):
        # try:
        # _logger.info('Filenames0000000000000 %s',kw)
        # f_names = kw.get('textBox1')
        # src_f = kw.get('id')
        src_f = idy
        # _logger.info('Filenames11111111111 %s', f_names)
        # _logger.info('Filenames1111111111122222222222222 %s', src_f)
        f_name = f_names[:-1]
        f_name = f_name.split(";")
        for f in f_name:
            _logger.info("Filenames3333333333333 %s", f)
            new_filename = self.get_rand_filename()
            # data = self.get_rand_filename()
            data = new_filename[:2]
            new_path = (
                    "//var/lib/odoo/.local/share/Odoo/filestore/bosspacerp14demo/" + data
            )
            src_path = (
                    "/usr/lib/python3/dist-packages/odoo/addons/bosspac_resource/static/src/img/"
                    + str(src_f)
                    + "/"
                    + str(f)
                    + ".png"
            )
            # image_src = open()
            if not os.path.exists(new_path):
                os.mkdir(new_path)
            new_file = open(new_path + "/" + new_filename, "wb+")
            with open(src_path, "rb") as p:
                image_src = p.read()
            new_file.write(image_src)
            new_file.close()
            fields = http.request.env.cr.execute(
                "SELECT * FROM ir_attachment WHERE name='image_1920' AND res_model='product.template' AND res_id='"
                + str(src_f)
                + "'"
            )
            fields1 = http.request.env["ir.attachment"]
            if fields is None:
                http.request.env.cr.execute(
                    "INSERT INTO ir_attachment (res_id, name, res_model, res_field, store_fname, checksum, type, file_size, mimetype, index_content, company_id) VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')"
                    % (
                        src_f,
                        "image_1920",
                        "product.template",
                        "image_1920",
                        data + "/" + new_filename,
                        new_filename,
                        "binary",
                        1,
                        "image/jpg",
                        "image",
                        2,
                    )
                )
                http.request.env.cr.execute(
                    "INSERT INTO ir_attachment (res_id, name, res_model, res_field, store_fname, checksum, type, file_size, mimetype, index_content, company_id) VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')"
                    % (
                        src_f,
                        "image_1920",
                        "product.template",
                        "image_256",
                        data + "/" + new_filename,
                        new_filename,
                        "binary",
                        1,
                        "image/jpg",
                        "image",
                        2,
                    )
                )
                http.request.env.cr.execute(
                    "INSERT INTO ir_attachment (res_id, name, res_model, res_field, store_fname, checksum, type, file_size, mimetype, index_content, company_id) VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')"
                    % (
                        src_f,
                        "image_1920",
                        "product.template",
                        "image_512",
                        data + "/" + new_filename,
                        new_filename,
                        "binary",
                        1,
                        "image/jpg",
                        "image",
                        2,
                    )
                )
                http.request.env.cr.execute(
                    "INSERT INTO ir_attachment (res_id, name, res_model, res_field, store_fname, checksum, type, file_size, mimetype, index_content, company_id) VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')"
                    % (
                        src_f,
                        "image_1920",
                        "product.template",
                        "image_1024",
                        data + "/" + new_filename,
                        new_filename,
                        "binary",
                        1,
                        "image/jpg",
                        "image",
                        2,
                    )
                )
                http.request.env.cr.execute(
                    "INSERT INTO ir_attachment (res_id, name, res_model, res_field, store_fname, checksum, type, file_size, mimetype, index_content, company_id) VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')"
                    % (
                        src_f,
                        "image_1920",
                        "product.template",
                        "image_128",
                        data + "/" + new_filename,
                        new_filename,
                        "binary",
                        1,
                        "image/jpg",
                        "image",
                        2,
                    )
                )
                status = "Inserted"
            else:
                store_fname = data + "/" + new_filename
                http.request.env.cr.execute(
                    "UPDATE ir_attachment SET store_fname='"
                    + str(store_fname)
                    + "',  checksum='"
                    + str(new_filename)
                    + "', company_id=2 WHERE res_id='"
                    + str(src_f)
                    + "'"
                )
                status = "Updated"
        # return ("Database Succesfully %s!!" % (status))
        # gauls = http.request.env['product.template'].search([("id", "=", src_f)])
        # http.request.env.cr.execute("SELECT categ_id FROM product_template WHERE id='"+str(src_f)+"'")
        # for res in http.request.env.cr.fetchall():
        # 	gauls = {'categ_id': res[0]}
        # 	_logger.info('Oeeeeyyyyyyyyyeyeyeyeyeyeeyeyey [%s]' %(gauls))
        # #_logger.info('Oeeeeyyyyyyyyyeyeyeyeyeyeeyeyey [%s]' %(gauls))
        # sugauls = []
        # insub = []
        # insub.append(gauls)
        # _logger.info('Oeeeeyyyyyyyyyeyeyeyeyeyeeyeyey111111111 [%s]' %(sugauls))
        # _logger.info('Oeeeeyyyyyyyyyeyeyeyeyeyeeyeyey111111111 [%s]' %(sugauls))
        # _logger.info('Oeeeeyyyyyyyyyeyeyeyeyeyeeyeyey111111111 %s' %insub)
        # return http.request.render('bosspac_resource.new_world',{
        # 	'root': '/',
        # 	'id': src_f,
        # 	'insub': insub,
        # 	'gauls': gauls
        # })
        result = {
            "status": "OK",
            "message": "Upload Accomplish",
        }
        return json.dumps(result)

    # except:
    # 	return ("Failed to Update the Database. Please redirect to erp13.bosspacific.com.au:8069/")
    def get_rand_filename(self):
        alf_num = 40
        checksum = "".join(
            random.choices(string.ascii_lowercase + string.digits, k=alf_num)
        )
        return checksum

    @http.route("/pcm/category/<int:idx>", type="json", auth="public", website=True)
    def create_category(self, idx, name, complete_name, parent_path, **kw):
        # prod_cat = http.request.env['product.category'].search([('id', '=', idx)])
        # kittens = http.request.env['product.category'].search([])
        # http.request.env.cr.execute("SELECT id FROM product_category ORDER BY id DESC LIMIT 1")
        # alfa = http.request.env.cr.fetchone()
        beta = http.request.env["product.category"].search([], order="id desc")[0].id
        beta = int(beta) + 1
        # _logger.info("wwwwwwwwwwwwwwwwwwwwwwwww[%s]" % (alfa))
        _logger.info("wwwwwwwwwwwwwwwwwwwwwwwww[%s]" % (beta))
        # _logger.info("xxxxxxxxxxxxxxxxxxxxxxxx[%s]" % (kw))
        # base = []
        # base.append(kw)
        # name = kw.get('name')
        # _logger.info("xxxxxxxxxxxxxxxxxxxxxxxx[%s]" % (name))
        # complete_name = kw.get('complete_name') + ' / ' + str(name)
        # _logger.info("xxxxxxxxxxxxxxxxxxxxxxxx[%s]" % (complete_name))
        # parent_path = parent_path + '/' + str(beta)
        if len(parent_path) > 1:
            parent_path = parent_path + str(beta)
        else:
            parent_path = parent_path
        _logger.info("Dil kyu yeh mera sor kare[%s]" % (parent_path))

        if len(parent_path) > 1:
            parent_id = int(parent_path.split("/")[-2])
        else:
            parent_id = int(parent_path)
        _logger.info("xxxxxxxxxxxxxxxxxxxxxxxx[%s]" % (parent_id))

        # noob = {'parent_id':parent_id}
        # base.append(noob)
        # _logger.info("xxxxxxxxxxxxxxxxxxxxxxxx[%s]" % (base))
        base = {
            "id": beta,
            "parent_path": str(parent_path),
            "name": str(name),
            "complete_name": str(complete_name),
            "parent_id": parent_id,
        }
        _logger.info("basesesesesesesessesese[%s]" % (base))
        # kittens.create(base)
        http.request.env.cr.execute(
            "INSERT INTO product_category (id, parent_path, name, complete_name, parent_id) VALUES ('%s', '%s', '%s', '%s', '%s')"
            % (beta, parent_path, name, complete_name, parent_id)
        )
        # for cat in prod_cat:
        # 	my_tuple={'id'}
        # prod_cat.create(my_tuple)
        # return http.request.render('bosspac_resource.old_world',{
        # 	'root': '/',
        # 	'id': idx,
        # 	'prod_cat': prod_cat,
        # })

        # to acquire the parent_id of the corresponding entry in product_public_category
        # male = http.request.env['product.template'].search([('categ_id', '=', int(parent_id))])
        # sigma = self.get_last_id()
        # mylist=[]
        # eta=1
        # for record in male:
        # 	val = record.id
        # 	mylist.append(val)
        # if len(mylist) > 0:
        # 	eta = self._get_foreign_key(mylist[0])[0][0]
        # values = {'id':sigma, 'name': str(name), 'parent_id': eta,}
        # http.request.env.cr.execute("INSERT INTO product_public_category (id, parent_path, name, parent_id) VALUES ('%s','%s/%s/', '%s', '%s')" % (sigma, eta, sigma, name, eta))
        result = {
            "status": "OK",
            "message": "",
            "idi": beta,
        }
        return json.dumps(result)

    # the portion below is to simultaneously create category for product_public_category

    def create_public(self, pyvar):
        mega = http.request.env["product.public.category"].search(
            [("id", "=", int(pyvar))]
        )
        return mega

    def get_last_id(self):
        male = http.request.env.cr.execute(
            "SELECT MAX(id) FROM product_public_category"
        )
        chi = http.request.env.cr.fetchall()
        chi = int(chi[0][0]) + 1
        return chi

    @http.route("/pcm/delete/<int:idw>", type="json", auth="public", website=True)
    def delete_category(self, idw, **kw):
        # error handling to check the foreign key constraint violation
        http.request.env.cr.execute(
            "SELECT id FROM product_template WHERE categ_id=" + str(idw) + ""
        )
        # gun =http.request.env.cr.execute("SELECT id  from product_category WHERE parent_id ="+str(idw)+"")
        # sun = http.request.env['product.category'].search([('parent_id', '=', idw)])
        # this value also needs to be appended to the list for a fail-proof system that handles all the exceptions
        # http.request.env.cr.execute("SELECT id  from product_category WHERE parent_id ="+str(idw)+"")
        naja = http.request.env.cr.fetchall()
        # naja = http.request.env['product.template'].search([('categ_id', '=', idw)])
        val = []
        sol = self._get_parent_id(idw=idw)
        lucy = self.get_mother_id(idw)
        _logger.error(
            "Marhaba Ya Mustafa, Marhaba Ya Mustafa, Marhaba Ya Mustafa, Ali Maula Mohammed bin Maula 111111111111111111 lucy %s "
            % (lucy)
        )
        lucy = lucy[0].id
        # cara = self.get_millet(lucy)[0].id
        # hara = self.get_target(cara)
        for item in naja:
            # book = item.id
            book = item
            val.append(book)
        _logger.info(
            "All the world's a stage and all the men and women merely players %s "
            % (val)
        )
        # for dor in sun:
        # 	#dor = sun.id
        # 	sol.append(dor.id)
        # _logger.info("A journey of a thousand mile begins with a single step %s " % (sol))

        if len(val) > 0:
            # http.request.env.cr.execute("DELETE FROM product_category WHERE id="+str(idw)+"")
            result = {
                "status": "!OKEY",
                "message": "",
                "zoop": len(val),
            }
        elif len(sol) > 0:
            result = {
                "status": "!OKEY",
                "message": "",
            }
        else:
            http.request.env.cr.execute(
                "DELETE FROM product_category WHERE id=" + str(idw) + ""
            )
            # lara = self.get_mother_id(idw)
            # _logger.error("Woh77777777777777777777777777777777777777777777777777777777777777777777 %s " % (lara))
            # lara = lucy.id[0]
            # cara = self._get_foreign_key(lara)[0]
            # self.pub_cat_del(hara)
            # this code is to be looked at again
            # tara = self.my_method(idw)
            # self.pub_cat_del(tara)
            result = {
                "status": "OK",
                "message": "",
            }

        return json.dumps(result)

    def _get_parent_id(self, idw, **kw):
        sun = http.request.env["product.category"].search([("parent_id", "=", idw)])
        sol1 = []
        for dor in sun:
            # dor = sun.id
            sol1.append(dor.id)
        return sol1

    def get_mother_id(self, idm):
        sara = http.request.env["product.category"].search([("id", "=", int(idm))])
        var = []
        for fa in sara:
            lati = fa.parent_id
            var.append(lati)
        _logger.error(
            "Full Fathom Five Thy Father Lies Full Fathom Five Thy Father Lies Full Fathom Five Thy Father Lies  %s "
            % (var)
        )
        return var

    def my_method(self, xpy):
        sara = http.request.env["product.category"].search([("id", "=", xpy)])
        _logger.error(
            "Marhaba Ya Mustafa, Marhaba Ya Mustafa, Marhaba Ya Mustafa, Ali Maula Mohammed bin Maula %s "
            % (xpy)
        )
        sara = sara.parent_id
        rama = []
        for record in sara:
            item = record.id
            rama.append(item)
        # _logger.error("Marhaba Ya Mustafa, 1111111111111111111111111111111111111111111 %s " % (sara))
        # _logger.error("kiteskites23232323232323232322222222222333333333333333333 %s " % (rama[0]))
        rama = rama[0]
        mara = self.get_millet(rama)
        _logger.error(
            "theloveofthedarling theloveofthedarling theloveofthedarling theloveofthedarling111111111111111 %s "
            % (mara)
        )
        rak = []
        for temp in mara:
            pet = temp.id
            rak.append(pet)
        tara = (
            http.request.env["product.public.category"]
                .search([("parent_id", "=", rak[0])])[0]
                .id
        )
        # _logger.error("om namah shivaya2222222222222222222222222222222 %s " % (tara))
        return tara

    @http.route("/pcm/prodel/<int:idk>", type="json", auth="public", website=True)
    def al_del_prod(self, idk, **kw):
        # http.request.env.cr.execute("DELETE FROM product_template WHERE categ_id="+str(idk)+"")
        wir = http.request.env["product.template"].search([("categ_id", "=", idk)])
        tore = self.search_child(idk)
        xy = self.get_mother_id(idk)
        xy = xy[0].id
        # _logger.info("Aesop's fables are the most widely read folklores of old times9595959595959595959595%s " % (xy))
        wire = []
        # res = []
        for i in wir:
            wire.append(i.id)
        _logger.info(
            "Marhaba Ya Mustafa, Marhaba Ya Mustafa, Marhaba Ya Mustafa %s " % (wire)
        )
        zoop = str(len(wire))
        _logger.info(
            "Khwajamrerekhwajadilmeinsamajashahokashahtualikadulara %s " % (zoop)
        )
        # the portion below this comment is to find the corresponding category in public page

        if len(wire) > 0:

            self.drop_prod(idk)
            self.al_cat_del(idk)
            # to delete the record shop

            # per = self.get_millet(xy)
            # per2 = per.id
            # _logger.info(
            #    "A journey of thousand miles begins with a single step- Lao Tzu is the great master %s " % (per))
            # ser = self.get_target(per2)
            # if len(per) > 0:
            #    # her = ser[0][0]
            #    self.pub_cat_del(ser)

            result = {
                "status": "tamam",
                "message": "",
                # 'zoop': zoop,
            }

        elif len(tore) > 0:
            result = {
                "status": "!OKEY",
                "message": "",
                # 'zoop': zoop,
            }

        else:
            result = {
                "status": "OK",
                "message": "",
                # 'zoop': '0',
            }
        _logger.info("Sa Re Ga Ma Pa Dha Ni Sa %s " % result)
        return json.dumps(result)

    def drop_prod(self, cid, **kw):
        http.request.env.cr.execute(
            "DELETE FROM product_template WHERE categ_id=" + str(cid) + ""
        )

    def al_cat_del(self, catid, **kw):
        http.request.env.cr.execute(
            "DELETE FROM product_category WHERE id=" + str(catid) + ""
        )

    def pub_cat_del(self, py_cat, **kwargs):
        http.request.env["product.public.category"].search(
            [("id", "=", py_cat)]
        ).unlink()

    def search_child(self, lid, **kw):
        tor = http.request.env["product.category"].search([("parent_id", "=", lid)])
        res = []
        for him in tor:
            res.append(him)
        return res

    @http.route("/pcm/fetch", type="json", auth="public", website=True)
    def fetch_assoc(self, pid, **kw):
        _logger.info(
            "Hum tere bina reh nahi sakte tere bina kya wazood mera %s " % (kw)
        )
        ents = self.capii_data(pid)
        result = {
            "status": "OK",
            "message": "",
            "ents": ents,
        }
        return json.dumps(result)

    def capii_data(self, prod_id, **kw):
        cent = http.request.env["product.template"].search([("id", "=", prod_id)])
        pent = http.request.env["product.category"].search(
            [("id", "=", cent.categ_id.id)]
        )
        dent = http.request.env["bosspacific.brand"].search(
            [("id", "=", cent.Brand.id)]
        )
        # tres=[]
        # for cent in cents:
        res = {
            "name": cent.name,
            "vendor_id": cent.vendor_id,
            "description": cent.description,
            "type": cent.type,
            "list_price": cent.list_price,
            "qty1": cent.Qty1,
            "qty2": cent.Qty2,
            "qty3": cent.Qty3,
            "qty2_price": cent.Qty2_Price,
            "qty3_price": cent.Qty3_Price,
            "melb": cent.Melbourne_Wh,
            "syd": cent.Sydney_Warehouse,
            "perth": cent.Perth_Warehouse,
            "length": cent.Length,
            "width": cent.Width,
            "height": cent.Height,
        }
        # 	tres.append(res)
        res["category"] = pent.complete_name
        res["brand"] = dent.name
        _logger.info(
            "Hum tere bina reh nahi sakte tere bina kya wazood mera %s " % (res)
        )
        return res

    # Update the database once drag and drop is accomplished
    @http.route("/pcm/catupdate", type="json", auth="public", website=True)
    def _update_cat(self, obj_id, des_id):
        _logger.info(
            "Marhaba Ya Mustafa, Marhaba Ya Mustafa, Marhaba Ya Mustafa %s %s "
            % (obj_id, des_id)
        )
        values = {"parent_id": int(des_id)}
        hill = http.request.env["product.category"].search([("id", "=", obj_id)])
        _logger.info(
            "Marhaba Ya Mustafa, Marhaba Ya Mustafa, Marhaba Ya Mustafa %s %s "
            % (values, hill)
        )
        for i in hill:
            i.write(values)

        # The code underneath this updates table product_public_category simultaneously as well
        # self._update_public(sid=obj_id, did=des_id)
        result = {
            "status": "OK",
            "message": "",
        }
        return json.dumps(result)

    def _update_public(self, sid, did):
        # basa = http.request.env['product.template'].search([('categ_id','=', int(sid))])[0].id
        # aries = self._get_foreign_key(basa)
        # aries = aries[0][0]
        # var barley is the arrow (mobile) category to which the parent id is to be ascribed
        barley = self.get_millet(sid)
        # var zillet is the target (immobile) category whose id is to ascribed as parent id to the arrow category
        lhasa = http.request.env["product.template"].search(
            [("categ_id", "=", int(did))]
        )
        _logger.info("Lhasaaassasaasasa22222222222222222222  %s" % (lhasa))
        pylist = []
        for record in lhasa:
            lhasa = record.id
            pylist.append(lhasa)
        if len(pylist) > 0:
            taurus = self._get_foreign_key(pylist[0])
            taurus = taurus[0][0]
            zillet = (
                http.request.env["product.public.category"]
                    .search([("id", "=", taurus)])
                    .id
            )
            values = {"parent_id": zillet}
            # millet =  http.request.env['product.public.category'].search([('id','=', sid)])
            _logger.info(
                "Mera Dil bhi kitna pagal heh yeh pyar to htumse karta heh Targett  %s"
                % (values)
            )
            barley.write(values)
        else:
            myvar = http.request.env["product.category"].search(
                [("parent_id", "=", int(did))]
            )
            thonlist = []
            for entry in myvar:
                tib = entry.id
                thonlist.append(tib)
            if len(thonlist) > 0:
                harley = self.get_millet(thonlist[0])
                harley = harley[0][0].parent_id
                _logger.info(
                    "The elimination of sorrow is achieved by correct observation00000000000  %s"
                    % (harley.id)
                )
                gamma = harley.id
                # alfa =  http.request.env['product.public.category'].search([('parent_id', '=', int(harley))]).id
                # _logger.info("The elimination of sorrow is achieved by correct observation11111111  %s" % (alfa))
                beta = (
                    http.request.env["product.public.category"]
                        .search([("id", "=", gamma)])
                        .parent_id
                )
                # _logger.info("The elimination of sorrow is achieved by correct observation2222222222  %s" % (beta))
                pyvalues = {"parent_id": beta.id}
                _logger.info(
                    "The parent category target that is empty  %s" % (pyvalues)
                )
                barley.write(pyvalues)

    def get_millet(self, pyvar):
        basa = (
            http.request.env["product.template"]
                .search([("categ_id", "=", int(pyvar))])[0]
                .id
        )
        _logger.info(
            "Sallala u halai iba sallam1111111111111111111 Product_id:   %s" % (basa)
        )
        aries = self._get_foreign_key(basa)
        aries = aries[0][0]
        _logger.info("Child id111111111111111111111111111111111Arrow  %s" % (aries))
        millet = http.request.env["product.public.category"].search(
            [("id", "=", aries)]
        )
        return millet

    def get_target(self, o_var):
        syam = (
            http.request.env["product.public.category"]
                .search([("parent_id", "=", int(o_var))])[0]
                .id
        )
        return syam

    def _get_foreign_key(self, value):
        hasa = http.request.env.cr.execute(
            "SELECT DISTINCT product_public_category_id FROM product_public_category_product_template_rel WHERE product_template_id = '"
            + str(value)
            + "'"
        )
        nasa = http.request.env.cr.fetchall()
        return nasa

