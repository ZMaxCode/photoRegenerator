import Photo from './photo';

class PhotoEditor extends Photo {

    constructor(src, photoFile){
        super(src)
        this.photoFile = photoFile;
    }

    getPhotoFile(){
        return this.photoFile;
    }

    async sendPhoto(){
        return new Promise(resolve => setTimeout(() => {
            resolve(0);
        }, 2000))
    }

}

export default PhotoEditor;