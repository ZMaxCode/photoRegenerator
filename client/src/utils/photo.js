import { isMobile } from './helpers';
import bridge from '@vkontakte/vk-bridge';

class Photo {

    constructor(src, alt = 'photo') {
        this.src = src;
        this.alt = alt;
    }

    getSrc() {
        return this.src;
    }

    getAlt(){
        return this.alt;
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