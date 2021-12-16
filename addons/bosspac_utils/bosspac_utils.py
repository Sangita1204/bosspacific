import pytz
import datetime
import dateutil.parser
import os.path
import inspect
import logging


_logger = logging.getLogger(__name__)
class BosspacUtils:


    """ Method to log error
       *) PARAMS : exception message as e
       """

    def log_error(self, ex):
        try:
            caller_functionName = inspect.stack()[1][3]
            parent_functionName = inspect.stack()[2][3] if inspect.stack()[2][3] != "<module>" else self.DCS_VAR.EMPTY_STRING
            function_name = "{}.{}".format(parent_functionName,caller_functionName) if parent_functionName else caller_functionName
            file_path_list = inspect.stack()[1][1].split("/")
            file_name = (file_path_list[len(file_path_list) - 1]).split(".")[0]
            line_number = inspect.stack()[1][2]
            _logger.error("PID:{}|FileName:{}|FunctionName:{}::::{}|ErrorMessage:{}".format(os.getpid(), file_name, line_number,
                                                                                  function_name, ex))
            # _logger_obj =request.env[self.DCS_VAR.DINCELACCOUNT_CONFIG_SETTING].sudo().search([])
            # if _logger_obj and str(_logger_obj.logger_server_list) == self.HOSTNAME:
            # usr_details = self.user_details()
        except Exception as e:
            _logger.error("PID:{}|FileName:{}|FunctionName:{}::::{}|ErrorMessage:{}".format(os.getpid(),os.path.basename(__file__).split(".")[0],inspect.stack()[1][2],inspect.stack()[0][3], e))

    """ Method to log error
        *) PARAMS : exception message as e
        """

    def log_info(self, msg):
        try:
            _logger_obj = request.env[self.DCS_VAR.DINCELACCOUNT_CONFIG_SETTINGS].sudo().search([])
            if _logger_obj and str(_logger_obj.logger_server_list) != self.HOSTNAME:
                caller_functionName = inspect.stack()[1][3]
                parent_functionName = inspect.stack()[2][3] if inspect.stack()[2][3] != "<module>" else self.DCS_VAR.EMPTY_STRING
                function_name = "{}.{}".format(parent_functionName,caller_functionName) if parent_functionName else caller_functionName
                file_path_list = inspect.stack()[1][1].split("/")
                file_name = (file_path_list[len(file_path_list) - 1]).split(".")[0]
                line_number = inspect.stack()[1][2]
                _logger.info("FileName:{}|FunctionName:{}::::{}|LogMessage:{}".format(file_name,line_number,function_name, msg))

        except Exception as e:
            _logger.error("PID:{}|FileName:{}|FunctionName:{}::::{}|ErrorMessage:{}".format(os.getpid(),os.path.basename(__file__).split(".")[0],inspect.stack()[1][2],inspect.stack()[0][3], e))

    """ Method to change_timezone
           *) PARAMS : _datetime > object or string type
           *) PARAMS : from_timezone > can be None of date format
           *) PARAMS : to_timezone >can be None of date format
           *) PARAMS : dt_format >  string type
    """
    def change_timezone(self, _datetime, from_timezone=None, to_timezone=None, dt_format=None):
        try:
            if _datetime:
                if not from_timezone:
                    from_timezone = self.VARS.TIMEZONE_UTC
                if not to_timezone:
                    to_timezone = self.VARS.TIMEZONE_AUSTRALIA_SYDNEY
                if not dt_format:
                    dt_format = self.VARS.DEFAULT_DATETIME_FORMAT
            ob_dt = dateutil.parser.parse(str(_datetime))
            time_zone = pytz.timezone(from_timezone)
            ob_converted_dt = time_zone.localize(ob_dt).astimezone(pytz.timezone(to_timezone))
            return (ob_converted_dt).strftime(dt_format)
        except Exception as ex:
            self.log_error(ex)
            return datetime.now().strftime(dt_format)