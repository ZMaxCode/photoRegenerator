from dotenv import load_dotenv
import os

load_dotenv()

HOST = os.getenv('HOST')
PORT = os.getenv('PORT')

UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER')
BW_IMAGES_FOLDER = os.getenv('BW_IMAGES_FOLDER')
C_IMAGES_FOLDER = os.getenv('C_IMAGES_FOLDER')
