import Photo from './photo';

const checkPhotoAndGetSrc = async (photoFile) => {
    return new Promise(resolve => {

        if (!photoFile || !photoFile.length) 
            throw ('Выберите фотографию для обработки')
        else {
            const photo = photoFile[0];
            const fileFormat = photo.name.split(".").pop();
            if (fileFormat !== "jpg" && fileFormat !== "jpeg" && fileFormat !== "png")
                throw ('Выбранный файл не является фотографией')
            
            
            const reader = new FileReader();
            reader.onload = (e) => resolve([e.target.result, photo]);
            reader.readAsDataURL(photo);
        }
    })
}

const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const convertPhotosListToObject = (photos) => {
    return photos.map(el => [new Photo(el.bw), new Photo(el.c)]);
}

export {
    checkPhotoAndGetSrc,
    isMobile,
    convertPhotosListToObject
}