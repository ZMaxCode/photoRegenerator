import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import Photo from '../Photo';
import bridge from '@vkontakte/vk-bridge';
import IconButton from '@vkontakte/vkui/dist/components/IconButton/IconButton';
import { Icon24MoreVertical } from '@vkontakte/icons';
import { useView } from '../../App';
import ActionSheet from '@vkontakte/vkui/dist/components/ActionSheet/ActionSheet';
import ActionSheetItem from '@vkontakte/vkui/dist/components/ActionSheetItem/ActionSheetItem';

import styles from './style.module.scss';

const CompareSlider = ({ firstImage, secondImage, className }) => {

    const { setPoput } = useView();

    const [firstPhotoObject, setFirstPhotoObject] = useState(null);
    const [secondPhotoObject, setSecondPhotoObject] = useState(null);

    const openImage = (index) => {
        bridge.send('VKWebAppShowImages', {
            images: [firstImage, secondImage],
            start_index: index
        })
    };

    const handleOpenMenu = () => {
        setPoput(
            <ActionSheet onClose={() => setPoput(null)}>
                <ActionSheetItem 
                    autoclose
                    onClick={() => firstPhotoObject.downloadPhoto()}
                >
                    Сохранить оригинал
                </ActionSheetItem>
                <ActionSheetItem 
                    autoclose
                    onClick={() => secondPhotoObject.downloadPhoto()}
                >
                    Сохранить копию
                </ActionSheetItem>
            </ActionSheet>
        )
    }

    return (
        <div className={styles.compareSliderBlock}>
            <ReactCompareSlider
                itemOne={
                    <Photo
                        src={firstImage}
                        alt="Image one"
                        onClick={() => openImage(0)}
                        callback={(photo) => setFirstPhotoObject(photo)}
                    />}
                itemTwo={
                    <Photo
                        src={secondImage}
                        alt="Image two"
                        onClick={() => openImage(1)}
                        callback={(photo) => setSecondPhotoObject(photo)}
                    />}
                onlyHandleDraggable={true}
                className={`${styles.compareSlider} ${className}`}
                handle={
                    <ReactCompareSliderHandle
                        buttonStyle={{ border: 0, backdropFilter: 'none', boxShadow: 'none' }}
                        linesStyle={{ opacity: 0 }}
                    />
                }
            />
            <IconButton
                icon={<Icon24MoreVertical />}
                onClick={handleOpenMenu}
                className={styles.download}
            />
        </div>

    )
}

CompareSlider.propTypes = {
    firstImage: PropTypes.string.isRequired,
    secondImage: PropTypes.string.isRequired,
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
}

export default CompareSlider;