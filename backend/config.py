import os
from dotenv import load_dotenv

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    # DEBUG = True
    # TESTING = True
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER')
    SERVER_NAME = f"{os.getenv('HOST')}:{os.getenv('PORT')}"
