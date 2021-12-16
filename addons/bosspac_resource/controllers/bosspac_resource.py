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
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 "
    "Safari/537.36"
}


class Product_Management:
    def __init__(
        self, man_code, prod_id, name, header, store_name, common_class_img, **kw
    ):
        self.man_code = man_code
        self.prod_id = prod_id
        self.name = name
        self.header = header
        self.store_name = store_name
        self.common_class_img = common_class_img

    def scrape_img(self):
        return (
            "Hello this is a test script user main method void parse int as argument!"
        )

    def get_images_store(self):
        i = 1
        url = "https://www.newegg.com/global/au-en/p/pl?d=%s" % self.man_code
        _logger.info(
            "This method is being execute from main main main main main1111111: %s"
            % url
        )
        response = urlopen(
            Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/43.0.2357.134 Safari/537.36"
                },
            )
        )
        html = response.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
        # image_elements = soup.find_all("img", {"class": str(self.common_class_img)})
        image_elements = soup.find_all("img", {"class": str(self.common_class_img)})
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
                        "/usr/lib/python3/dist-packages/odoo/addons/product_shelf/static/src/img/"
                        + str(self.store_name)
                        + "/"
                        + str(self.prod_id)
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
