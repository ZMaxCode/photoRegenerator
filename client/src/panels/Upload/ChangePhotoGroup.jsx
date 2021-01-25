import React from 'react';
import PropTypes from 'prop-types';

import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import File from '@vkontakte/vkui/dist/components/File/File';
import { Icon24Camera } from '@vkontakte/icons';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import { FormItem } from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import { useView } from '../../App';
import PhotoEditor from '../../utils/photoEditor';
import { checkPhotoAndGetSrc } from '../../utils/helpers';

const ChangePhotoGroup = ({setPhotoEditor}) => {

    const { useAlert } = useView();

    const handlePhotoChange = async (e) => {
        try {
            const photoEditor = new PhotoEditor(...await checkPhotoAndGetSrc(e.target.files))
            setPhotoEditor(photoEditor)
        }
        catch (error) { 
            useAlert.showAlert('Ошибка при загрузке фотографии', error.toString()) 
        }
    }

    return (
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
    )
}

ChangePhotoGroup.propTypes = {
    setPhotoEditor: PropTypes.func.isRequired
}

export default ChangePhotoGroup;