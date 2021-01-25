import { isMobile } from './helpers';
import bridge from '@vkontakte/vk-bridge';

class Photo {

    constructor(src) {
        this.src = src;
    }

    getSrc() {
        return this.src;
    }

    async downloadPhoto() {
        if (isMobile()) {
            bridge.send('VKWebAppDownloadFile', {
                url: this.getSrc(),
                filename: 'photo.jpg'
            })
        }
        else {
            const link = document.createElement("a");
            link.download = 'photo.jpg';
            link.href = this.getSrc();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

}

export default Photo;