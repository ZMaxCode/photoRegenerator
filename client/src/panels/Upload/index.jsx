import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';

import ChangePhotoGroup from './ChangePhotoGroup';

import { useView } from '../../App';
import SendPhotoGroup from './SendPhotoGroup';

const Upload = ({ id }) => {

    const { setActivePanel } = useView();
    const [photoEditor, setPhotoEditor] = useState(null);

    return (
        <Panel id={id}>
            <PanelHeader left={
                <PanelHeaderBack onClick={() => setActivePanel('home')} />
            }>
                Upload photo
            </PanelHeader>
            <FormLayout>
                <ChangePhotoGroup setPhotoEditor={setPhotoEditor} />
                <SendPhotoGroup photoEditor={photoEditor} />
            </FormLayout>
        </Panel>
    )
}

Upload.propTypes = {
    id: PropTypes.string.isRequired,
}

export default Upload;