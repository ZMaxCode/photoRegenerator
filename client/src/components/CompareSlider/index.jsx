import React from 'react';
import PropTypes from 'prop-types';
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import Photo from '../Photo';
import bridge from '@vkontakte/vk-bridge';
import IconButton from '@vkontakte/vkui/dist/components/IconButton/IconButton';
import { Icon24MoreVertical } from '@vkontakte/icons';
import { useView } from '../../App';
import ActionSheet from '@vkontakte/vkui/dist/components/ActionSheet/ActionSheet';
import ActionSheetItem from '@vkontakte/vkui/dist/components/ActionSheetItem/ActionSheetItem';
import PhotoObj from '../../utils/photo';

import styles from './style.module.scss';

const CompareSlider = ({ firstImage, secondImage, className }) => {

    const { setPoput } = useView();

    const openImage = (index) => {
        bridge.send('VKWebAppShowImages', {
            images: [firstImage.getSrc(), secondImage.getSrc()],
            start_index: index
        })
    };

    const handleOpenMenu = () => {
        setPoput(
            <ActionSheet onClose={() => setPoput(null)}>
                <ActionSheetItem 
                    autoclose
                    onClick={() => firstImage.downloadPhoto()}
                >
                    Сохранить оригинал
                </ActionSheetItem>
                <ActionSheetItem 
                    autoclose
                    onClick={() => secondImage.downloadPhoto()}
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
                        photo={firstImage}
                        onClick={() => openImage(0)}
                    />}
                itemTwo={
                    <Photo
                        photo={secondImage}
                        onClick={() => openImage(1)}
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
    firstImage: PropTypes.instanceOf(PhotoObj).isRequired,
    secondImage: PropTypes.instanceOf(PhotoObj).isRequired,
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
}

export default CompareSlider;