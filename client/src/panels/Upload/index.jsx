import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import { FormItem } from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import File from '@vkontakte/vkui/dist/components/File/File';
import { Icon24Camera } from '@vkontakte/icons';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import PhotoEditor from '../../utils/photoEditor';
import ErrorAlert from '../../components/alerts/ErrorAlert';

import { useView } from '../../contexts/ViewContext';

const Upload = ({ id }) => {

    const { setActivePanel, setPoput } = useView();
    const [photoPreview, setPhotoPreview] = useState(null)
    const photoEditor = new PhotoEditor;

    const handlePhotoChange = async (e) => {
        try{
            await photoEditor.setPhoto(e.target.files);
            setPhotoPreview(photoEditor.getPhotoPreview());
        }
        catch(error){
            setPoput(
                <ErrorAlert 
                    header='Ошибка при загрузке фотографии'
                    text={error}
                />
            )
        }
    }

    return (
        <Panel id={id}>
            <PanelHeader left={
                <PanelHeaderBack onClick={() => setActivePanel('home')} />
            }>
                Upload photo
            </PanelHeader>
            <FormLayout>
                <Group>
                    <Div>
                        <Text>Culpa ipsum aliqua enim eiusmod pariatur labore ipsum dolor pariatur ipsum.</Text>
                    </Div>
                    <FormItem top='Adipisicing tempor ullamco dolore esse.'>
                        <File
                            controlSize='l'
                            before={<Icon24Camera />}
                            onChange={handlePhotoChange}
                            accept='.png, .jpg, .jpeg'
                        >
                            Select file
                        </File>
                    </FormItem>
                    {photoPreview && 
                        <img src={photoPreview.getSrc()} alt='test' />
                    }
                </Group>
            </FormLayout>
        </Panel>
    )
}

Upload.propTypes = {
    id: PropTypes.string.isRequired,
}

export default Upload;