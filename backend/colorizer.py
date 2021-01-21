from DeOldify.deoldify import device
from DeOldify.deoldify.device_id import DeviceId
from DeOldify.deoldify.visualize import *
import warnings
import torch
import logging


class Colorizer:
    def __init__(
            self,
            model='artistic'
    ):
        device.set(device=DeviceId.GPU0)

        logging.basicConfig(format='%(asctime)s [%(levelname)s] : %(message)s', stream=sys.stdout, level=logging.INFO)

        if torch.cuda.is_available():
            torch.backends.cudnn.benchmark = True
            os.environ['CUDA_VISIBLE_DEVICES'] = '0'
            logging.info('GPU available')
        else:
            del os.environ['CUDA_VISIBLE_DEVICES']
            logging.error('GPU not available')

        warnings.filterwarnings('ignore', category=UserWarning, message='.*?Your .*? set is empty.*?')

        if model == 'artistic':
            self.colorizer = get_artistic_image_colorizer(
                root_folder=Path('../DeOldify'),
                results_dir='static/cimages'
            )
        else:
            self.colorizer = get_stable_image_colorizer(
                root_folder=Path('../DeOldify'),
                results_dir='static/cimages'
            )

    def colorize_from_url(
            self,
            url,
            render_factor,
            watermarked=True
    ):
        logging.info(f'Start colorizing {url}')
        image_path = self.colorizer.plot_transformed_image_from_url(url=url, render_factor=render_factor,
                                                                    compare=True, watermarked=watermarked,
                                                                    path='static/examples/example_1_bw.png',
                                                                    results_dir=Path('static/cimages'))
        logging.info('End colorizing')
        return image_path
