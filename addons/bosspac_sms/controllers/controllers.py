from odoo import http
import Telstra_Messaging

class Bosspacsms(http.Controller):

   def _check_valid_number(self, num):
        # rule = re.compile(r'^(?:\+?61)?[04]\d{9}$')
        rule = re.compile(r'(?:(?:\+?61)?(?:0|\(0\)))?[4]\d{8}$')
        if not rule.search(num):
            return False
        else:
            return True


   def _getcode(self, msg):
        m = re.search(r"\(([A-Za-z0-9_]+)\)", msg)
        return m.group(1)

   def send_sms(self, cr, uid, ids, context=None):
       ctx = dict(context)

       sms_client_id = None
       sms_client_secret = None
       sms_grant_type = None
       sms_from = None
       sms_validity = None
       sms_scheduled_delivery = 1
       sms_notify_url = ''
       sms_reply_request = False
       sms_priority = False
       sms_to = str(ctx['send_sms_to'])
       sms_body = str(ctx['send_sms_body'])

       _active_model = str(ctx['_active_model'])
       _related_to = str(ctx['_related_to'])
       _order_id = ctx['_order_id']
       _recipient_id = ctx['_recipient_id']
       _sms_provider = 'telstra'

       # GET configutation data
       sql = """SELECT sms_client_id, sms_client_secret_key, sms_grant_type, sms_from, sms_validity FROM bosspac_account_setting""";
       cr.execute(sql)
       rows = cr.dictfetchone()
       if rows and len(rows) > 0:
           sms_client_id = rows['sms_client_id']
           sms_client_secret = rows['sms_client_secret_key']
           sms_grant_type = rows['sms_grant_type']
           sms_from = str(rows['sms_from'])

           if rows['sms_validity']:
               sms_validity = int(rows['sms_validity'])

       vals = {}
       api_response = None
       try:
           # Instantiate the Telstra API
           api_instance = Telstra_Messaging.AuthenticationApi()

           # Generate OAuth2 token
           api_response = api_instance.auth_token(sms_client_id, sms_client_secret, sms_grant_type)
           configuration = Telstra_Messaging.Configuration()
           configuration.access_token = api_response.access_token

           get_provision_number = Telstra_Messaging.ProvisioningApi(Telstra_Messaging.ApiClient(configuration))
           _create_for_new_no = None
           provision_number_request = Telstra_Messaging.ProvisionNumberRequest()

           _create_for_new_no = get_provision_number.create_subscription(provision_number_request)

           send_sms_message = Telstra_Messaging.MessagingApi(Telstra_Messaging.ApiClient(configuration))
           send_sms_request = Telstra_Messaging.SendSMSRequest(sms_to, sms_body, sms_from, sms_validity,
                                                               sms_scheduled_delivery, sms_notify_url,
                                                               sms_reply_request, sms_priority)

           api_response = send_sms_message.send_sms(send_sms_request)
           msg_id = None
           for message in api_response.messages:
               msg_id = message.message_id

           # if msg_id and msg_id is not None:
           #     vals = {
           #         'mail_message_id': msg_id,
           #         'number': sms_to,
           #         'body': sms_body,
           #         'partner_id': _active_model,
           #         'state': _related_to,
           #         'order_id': _order_id,
           #         'error_code': _recipient_id
           #     }
           #     _cid = self.create(cr, uid, vals, context)
           #     st = _sms_status['PEND']
           #     sql = "update sms_sms SET sms_status = '%s' where message_id = '%s'" % (st, msg_id)
           #     cr.execute(sql)

       except Exception as e:
           # for e in Exception:
           error_code = self._getcode(str(e))
           _logger.error(
               "Message send error from Telstra SMS. Exception when calling AuthenticationApi->send_sms: [[[%s]]]\n " % e)
           if error_code and error_code != '400':
               _logger.info("bosspac_sms.send_sms {Second SMS API Required}")
           else:  # Number is not valid error_code = 400, popup to notify invalid number
               self._display_err_msg(cr, uid, ids, error_code, context)