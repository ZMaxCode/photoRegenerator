import React from 'react';
import PropTypes from 'prop-types';
import PhotoEditor from '../../utils/photoEditor';

import Group from '@vkontakte/vkui/dist/components/Group/Group';
import { FormItem } from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Photo from '../../components/Photo';

import { useView } from '../../App';

const SendPhotoGroup = ({photoEditor}) => {

    const { useAlert } = useView();

    const handlePhotoSend = async () => {
        try {
            if (!photoEditor || !photoEditor.getPhotoFile()) throw ('Вы не выбрали фотографию')

            useAlert.showAlert( 'Фотография отправлена на обработку', 
                                'Ipsum excepteur id in Lorem ex sint fugiat labore amet et.');

            await photoEditor.sendPhoto();
            
            if(useAlert.isAlertShow) useAlert.hideAlert();
        }
        catch (error) { 
            useAlert.showAlert('Ошибка при отправке фотографии', error.toString()) 
        }
    }

    return (
        <>
            {photoEditor &&
                <Group>
                    <Photo src={photoEditor.getSrc()} />
                    <FormItem>
                        <Button
                            size='l'
                            stretched
                            onClick={handlePhotoSend}
                        >
                            Send
                    </Button>
                    </FormItem>
                </Group>
            }
        </>
    )
}

SendPhotoGroup.propTypes = {
    photoEditor: PropTypes.instanceOf(PhotoEditor)
}

export default SendPhotoGroup;