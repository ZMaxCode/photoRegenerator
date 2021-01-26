from dotenv import load_dotenv
import os

load_dotenv()

BW_IMAGES_FOLDER = os.getenv('BW_IMAGES_FOLDER')
C_IMAGES_FOLDER = os.getenv('C_IMAGES_FOLDER')

DB_NAME = os.getenv('DB_NAME')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
