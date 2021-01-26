import os
from dotenv import load_dotenv

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    # DEBUG = True
    # TESTING = True
    SQLALCHEMY_DATABASE_URI = f'postgresql://postgres:postgres@{os.getenv("DB_HOST")}:{os.getenv("DB_PORT")}/{os.getenv("DB_NAME")}'
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER')
    SERVER_NAME = f"{os.getenv('HOST')}:{os.getenv('PORT')}"
