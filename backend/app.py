from os import walk
import sys
import logging
from flask import Flask, jsonify, send_from_directory, request

from backend.colorizer import Colorizer
from backend.settings import HOST, PORT, UPLOAD_FOLDER, BW_IMAGES_FOLDER, C_IMAGES_FOLDER
from backend.utils import generate_file_name

logging.basicConfig(format='%(asctime)s [%(levelname)s] : %(message)s', stream=sys.stdout, level=logging.INFO)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg']


@app.route('/uploads/<folder>/<filename>')
def get_file(folder, filename):
    return send_from_directory(
        app.config['UPLOAD_FOLDER'], f'{folder}/{filename}'
    )


@app.route('/', methods=['GET'])
def test():
    return jsonify(
        test='ok'
    )


@app.route('/examples', methods=['GET'])
def get_examples():
    examples = []

    try:
        for (_, _, files) in walk('static/examples'):
            for file in files:
                examples.append(file)
    except IOError:
        logging.error('Not found static/examples')

    return jsonify(
        examples=examples
    )


@app.route('/colorize', methods=['POST'])
def colorize():
    bw_name = ''

    try:
        if 'file' in request.files:
            file = request.files['file']
            extension = file.filename.rsplit('.', 1)[1].lower() if '.' in file.filename else None

            if extension is None or extension not in ALLOWED_EXTENSIONS:
                return jsonify(
                    error='not allowed extension'
                )

            bw_name, c_name, filename = generate_file_name(BW_IMAGES_FOLDER, C_IMAGES_FOLDER, extension)
            file.save(bw_name)
    except:
        logging.error('file not found in request')

    colorizer.colorize_file(
        input_file=bw_name,
        render_factor=18
    )

    return jsonify(
        path=f'uploads/cimages/{filename}'
    )


if __name__ == '__main__':
    colorizer = Colorizer()

    app.run(host=HOST, port=PORT)
