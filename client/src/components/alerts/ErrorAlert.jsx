import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert';

import { useView } from '../../contexts/ViewContext';

const ErrorAlert = ({header = 'Error header', text = 'Error text'}) => {

    const { setPoput } = useView();

    return (
        <Alert
            header={header}
            text={text}
            onClose={() => setPoput(null)}
            actions={[{
                title: 'Ок',
                autoclose: true,
                mode: 'cancel'
            }]}
        />
    )
}

ErrorAlert.propTypes = {
    header: PropTypes.string,
    text: PropTypes.string,
}

export default ErrorAlert;