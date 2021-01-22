import React, { useState } from 'react';
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
import useOneButtonAlert  from '../../components/poputs/useOneButtonAlert';
import { checkPhotoAndGetSrc } from '../../utils/helpers';
import Button from '@vkontakte/vkui/dist/components/Button/Button';

import { useView } from '../../contexts/ViewContext';

const Upload = ({ id }) => {

    const { setActivePanel } = useView();
    const [photoEditor, setPhotoEditor] = useState(null);
    const useAlert = useOneButtonAlert();

    const handlePhotoChange = async (e) => {
        try { 
            setPhotoEditor(new PhotoEditor(...await checkPhotoAndGetSrc(e.target.files))) 
        }
        catch (error) { 
            useAlert.showAlert('Ошибка при загрузке фотографии', error.toString()) 
        }
    }

    const sendPhoto = async () => {
        try {
            if (!photoEditor || !photoEditor.getPhotoFile()) throw ('Вы не выбрали фотографию')

            useAlert.showAlert( 'Фотография отправлена на обработку', 
                                'Ipsum excepteur id in Lorem ex sint fugiat labore amet et.');

            await photoEditor.sendPhoto();
            
            if(useAlert.isAlertShow) useAlert.hideAlert();
        }
        catch (error) { useAlert.showAlert('Ошибка при отправке фотографии', error.toString()) }
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
                    <FormItem top='Adipisicing tempor ullamco dolore esse.' className='pb-0'>
                        <File
                            controlSize='l'
                            before={<Icon24Camera />}
                            onChange={handlePhotoChange}
                            accept='.png, .jpg, .jpeg'
                        >
                            Select file
                        </File>
                    </FormItem>

                </Group>
                {photoEditor &&
                    <Group>
                        <img
                            src={photoEditor.getSrc()}
                            alt='user photo'
                            className='fullHeightImage'
                        />
                        <FormItem>
                            <Button
                                size='l'
                                stretched
                                onClick={sendPhoto}
                            >
                                Send
                            </Button>
                        </FormItem>
                    </Group>
                }
            </FormLayout>
        </Panel>
    )
}

Upload.propTypes = {
    id: PropTypes.string.isRequired,
}

export default Upload;