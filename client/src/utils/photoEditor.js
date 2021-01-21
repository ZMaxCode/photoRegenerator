import UploadedPhoto from './uploadedPhoto';
import Photo from './photo.js';

class PhotoEditor {

    async setPhoto(photo) {

        if (photo && photo.length) {
            const uploadedPhoto = new UploadedPhoto(photo[0]);
            await uploadedPhoto.loadPhoto();
            this.photoPreview = new Photo(uploadedPhoto.getUploadedPhoto());
            this.photoFile = uploadedPhoto.getPhotoFile();
        }
    }

    getPhotoPreview(){
        return this.photoPreview;
    }

    getPhotoFile(){
        return this.photoFile;
    }

}

export default PhotoEditor;