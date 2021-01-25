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
                root_folder=Path('DeOldify'),
                results_dir='static/cimages'
            )
        else:
            self.colorizer = get_stable_image_colorizer(
                root_folder=Path('DeOldify'),
                results_dir='static/cimages'
            )

    def colorize_from_url(
            self,
            url,
            render_factor,
            watermarked=True
    ):
        logging.info(f'Start colorizing {url}')
        image_path = self.colorizer.plot_transformed_image_from_url(
            url=url, render_factor=render_factor,
            compare=False, watermarked=watermarked,
            # path='static/examples/example_1_bw.png',
        )
        logging.info('End colorizing')
        return image_path

    def colorize_file(
            self,
            input_file,
            render_factor,
            watermarked=True
    ):
        logging.info(f'Start colorizing {input_file}')
        try:
            self.colorizer.plot_transformed_image(
                path=input_file,
                render_factor=render_factor,
                watermarked=watermarked,
                display_render_factor=False,
                figsize=(20, 20),
                compare=False
            )
        except:
            self.convert_to_JPG(input_file)
            self.colorizer.plot_transformed_image(
                path=input_file,
                render_factor=render_factor,
                watermarked=watermarked,
                display_render_factor=False,
                figsize=(20, 20),
                compare=False
            )
        logging.info('End colorizing')

    def compress_image(self, image, path_original):
        size = 1920, 1080
        width = 1920
        height = 1080

        name = os.path.basename(path_original).split('.')
        first_name = os.path.join(os.path.dirname(path_original), name[0] + '.jpg')

        if image.size[0] > width and image.size[1] > height:
            image.thumbnail(size, Image.ANTIALIAS)
        elif image.size[0] > width:
            wpercent = (width / float(image.size[0]))
            height = int((float(image.size[1]) * float(wpercent)))
            image = image.resize((width, height), Image.ANTIALIAS)
        elif image.size[1] > height:
            wpercent = (height / float(image.size[1]))
            width = int((float(image.size[0]) * float(wpercent)))
            image = image.resize((width, height), Image.ANTIALIAS)

        image.save(first_name, quality=85)

    def convert_to_JPG(self, path_original):
        img = Image.open(path_original)

        if img.format == "JPEG":
            image = img.convert('RGB')
        elif img.format == "GIF":
            i = img.convert("RGBA")
            bg = Image.new("RGBA", i.size)
            image = Image.composite(i, bg, i)
        elif img.format == "PNG":
            try:
                image = Image.new("RGB", img.size, (255, 255, 255))
                image.paste(img, img)
            except ValueError:
                image = img.convert('RGB')
        elif img.format == "BMP":
            image = img.convert('RGB')

        self.compress_image(image, path_original)
        img.close()
