import React from 'react';

import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import { FormItem } from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import File from '@vkontakte/vkui/dist/components/File/File';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import styles from './style.module.scss';

import { useView } from '../../App';
import { Icon24Camera } from '@vkontakte/icons';

import PhotoEditor from '../../utils/photoEditor';
import { checkPhotoAndGetSrc } from '../../utils/helpers';

const InfoGroup = () => {

    const { useAlert } = useView();

    const handlePhotoChange = async (e) => {
        try {
            const photoEditor = new PhotoEditor(...await checkPhotoAndGetSrc(e.target.files))
            useAlert.showAlert('ok', 'ok');
        }
        catch (error) {
            useAlert.showAlert('Ошибка при загрузке фотографии', error.toString())
        }
    }

    return (
        <Div>
            <Group>
                <Title level='2' className={styles.title} weight='regular'>In velit do minim nostrud nisi pariatur cupidatat nulla irure consectetur eiusmod sit qui incididunt.</Title>

                <FormLayout>
                    <FormItem className='px-0'>
                        <File
                            controlSize='l'
                            before={<Icon24Camera />}
                            onChange={handlePhotoChange}
                            accept='.png, .jpg, .jpeg'
                            mode='commerce'
                            stretched
                        >
                            try
                    </File>
                    </FormItem>
                </FormLayout>

                {/* <Button
						mode='secondary'
						size='l'
						className={styles.button}
						onClick={() => setActivePanel('archive')}
					>
						archive
					</Button> */}
            </Group>
        </Div>
    )
}

export default InfoGroup;