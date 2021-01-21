import os
from flask import Flask, jsonify

from backend.colorizer import Colorizer
from backend.settings import HOST, PORT

app = Flask(__name__)


@app.route('/', methods=['GET'])
def test():
    return jsonify(
        test='ok'
    )


if __name__ == '__main__':
    colorizer = Colorizer()

    app.run(host=HOST, port=PORT)
