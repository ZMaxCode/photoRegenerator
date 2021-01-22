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

export {
    checkPhotoAndGetSrc
}