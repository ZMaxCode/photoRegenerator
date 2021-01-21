class UploadedPhoto {

    constructor(photoFile) {
        this.photoFile = photoFile;
    }

    loadPhoto() {
        return new Promise(resolve => {
            const reader = new FileReader();

            reader.onload = async (e) => {
                this.uploadedPhoto = e.target.result;
                resolve()
            }

            reader.readAsDataURL(this.photoFile);
        })
    }

    getUploadedPhoto() {
        return this.uploadedPhoto;
    }

    getPhotoFile() {
        return this.photoFile;
    }

}

export default UploadedPhoto;