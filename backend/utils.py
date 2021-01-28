import os
from uuid import uuid4


def generate_file_name(directory1, directory2, extension):
    filename = f'{uuid4()}.{extension}'
    name1 = os.path.join(directory1, filename)
    name2 = os.path.join(directory2, filename)

    return name1, name2, filename
