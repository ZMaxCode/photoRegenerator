from colorizer import Colorizer

colorizer = Colorizer()

def colorize_file(bw_name, render_factor=18):
    colorizer.colorize_file(
        input_file=bw_name,
        render_factor=render_factor
    )
    return True
