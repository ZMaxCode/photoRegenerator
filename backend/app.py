from os import walk
import os
import sys
import logging
import redis
import re
from rq import Queue
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.engine import Connection, ResultProxy
from sqlalchemy.orm import sessionmaker, Session

from settings import BW_IMAGES_FOLDER, C_IMAGES_FOLDER, DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD
from utils import generate_file_name
from worker import colorize_file
from config import Config

from models import metadata, archive

logging.basicConfig(format='%(asctime)s [%(levelname)s] : %(message)s', stream=sys.stdout, level=logging.INFO)

ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)

CORS(app)
app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

redis = redis.Redis()
queue = Queue('high', is_async=False, connection=redis)

engine = create_engine(f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}')
Session: Session = sessionmaker(bind=engine)

ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg']

connection: Connection = engine.connect()
metadata.create_all(engine)


@app.route('/uploads/<folder>/<filename>')
def get_file(folder, filename):
    return send_from_directory(
        app.config['UPLOAD_FOLDER'], f'{folder}/{filename}'
    )


# @app.route('/', methods=['GET'])
# def test():
#     job = queue.enqueue(task, request.args.get('n'))
#     q_len = len(queue)
#
#     print(job.is_finished)
#
#     return jsonify(
#         test=job.id,
#         len=q_len
#     )


@app.route('/test')
def test2():
    session = Session()
    session.begin(subtransactions=True)

    body = request.form

    if 'vk_id' in body:
        try:
            a: ResultProxy = session.execute(
                archive.insert().values(
                    vk_id=body['vk_id'],
                    bw_image_path='q',
                    c_image_path='w')
            )

            ar: ResultProxy = session.execute(archive.select()
                                              #     .where(
                                              #     # archive.c.vk_id == 172349355
                                              # )
                                              )
            ar = ar.fetchall()

            session.commit()
            return jsonify(
                {'result': [dict(row.items()) for row in ar]}
            )
        except Exception as e:
            logging.error('error', exc_info=e)
            session.rollback()
            return jsonify(
                error='db error'
            )
        # finally:
        # session.close()
    else:
        try:
            ar: ResultProxy = session.execute(archive.select()
                                              #     .where(
                                              #     # archive.c.vk_id == 172349355
                                              # )
                                              )
            ar = ar.fetchall()

            session.commit()
            return jsonify(
                {'result': [dict(row.items()) for row in ar]}
            )
        except Exception as e:
            logging.error(exc_info=e)
            session.rollback()
            return jsonify(
                error='db error'
            )
        # finally:
        # session.close()


@app.route('/examples', methods=['GET'])
def get_examples():
    examples = []
    examps = {}

    try:
        for (_, _, files) in walk('static/examples'):
            for file in files:
                num = re.search('([0-9]+)', file)
                col = re.search('(c|bw)', file)
                if num[0] not in examps:
                    examps[num[0]] = {}
                examps[num[0]][col[0]] = f'/uploads/examples/{file}'

            for item in examps:
                examples.append(examps[item])

    except IOError:
        logging.error('Not found static/examples')

    return jsonify(
        examples=examples
    )


@app.route('/colorize', methods=['POST'])
def colorize():
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

            try:
                logging.info('add to queue')
                # job = queue.enqueue(colorizer.colorize_file, kwargs={
                #     'input_file': bw_name,
                #     'render_factor': 18
                # })
                job = queue.enqueue(colorize_file, kwargs={
                    'bw_name': bw_name,
                    'render_factor': 18
                })

                job.is_finished

                # colorizer.colorize_file(
                #     input_file=bw_name,
                #     render_factor=18
                # )

                return jsonify(
                    path=f'/uploads/cimages/{filename}'
                )
            except Exception as e:
                logging.error('queue error', exc_info=e)
    except:
        logging.error('file not found in request')

    return jsonify(
        error='server error'
    )


if __name__ == '__main__':
    context = ('cert.pem', 'key.pem')
    app.run(
        # host=HOST, port=PORT,
        ssl_context=context,
        # debug=True
    )
