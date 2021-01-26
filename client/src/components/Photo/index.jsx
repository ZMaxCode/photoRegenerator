import React from 'react';
import PropTypes from 'prop-types';
import PhotoObj from '../../utils/photo';

import styles from './style.module.scss';

const Photo = ({ photo, onClick }) => {

    return (
        <div className={styles.photoBlock}>
            <img
                src={photo.getSrc()}
                alt={photo.getAlt()}
                className={styles.photoBlock__img}
                onClick={onClick}
            />
        </div>

    )
}

Photo.propTypes = {
    photo: PropTypes.instanceOf(PhotoObj).isRequired,
    downloadable: PropTypes.bool,
    onClick: PropTypes.func,
    ref: PropTypes.func
}

export default Photo;