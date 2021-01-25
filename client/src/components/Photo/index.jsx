import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PhotoObj from '../../utils/photo';

import styles from './style.module.scss';

const Photo = ({ src, alt = 'image', downloadable = true, onClick, callback }) => {

    const photo = new PhotoObj(src);

    useEffect(() => {
        if(callback) callback(photo);
    }, [])

    return (
        <div className={styles.photoBlock}>
            <img
                src={photo.getSrc()}
                alt={alt}
                className={styles.photoBlock__img}
                onClick={onClick}
            />
        </div>

    )
}

Photo.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    downloadable: PropTypes.bool,
    onClick: PropTypes.func,
    ref: PropTypes.func
}

export default Photo;