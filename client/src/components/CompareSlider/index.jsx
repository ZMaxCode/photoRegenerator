import React from 'react';
import PropTypes from 'prop-types';
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';


const CompareSlider = ({ firstImage, secondImage, className }) => {
    return (
        <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={firstImage} alt="Image one" />}
            itemTwo={<ReactCompareSliderImage src={secondImage} alt="Image two" />}
            onlyHandleDraggable={true}
            style={{height: 300}}
            className={className}
            handle={
                <ReactCompareSliderHandle
                    buttonStyle={{ border: 0, backdropFilter: 'none', boxShadow: 'none' }}
                    linesStyle={{ opacity: 0 }}
                />
            }
        />
    )
}

CompareSlider.propTypes = {
    firstImage: PropTypes.string.isRequired,
    secondImage: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default CompareSlider;