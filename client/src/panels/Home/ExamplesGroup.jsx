import React, { useEffect, useState } from 'react';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import CompareSlider from '../../components/CompareSlider';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Photo from '../../utils/photo';
import Examples from '../../utils/examples';
import { useView } from '../../App';

import styles from './style.module.scss';

const ExamplesGroup = () => {

    const { useAlert } = useView();
    const [examples, setExamples] = useState([]);

    useEffect(() => {

        const getData = async () => {
            try {
                setExamples(await (new Examples()).getExamples());
            }
            catch (error) {
                useAlert.error('Ошибка при загрузке примеров', error)
            }
        }

        getData();
    }, [])

    return (
        <Group>
            <Title level='1' className={styles.examplesTitle}>Examples</Title>
            <ul className='pb-6'>
                {examples.map((photo, index) => (
                    <li key={index}>
                        <CompareSlider
                            firstImage={new Photo('https://via.placeholder.com/200x400/0000FF/808080?text=first')}
                            secondImage={new Photo('https://via.placeholder.com/200x400/FF0000/FFFFFF?text=second')}
                            className='mt-2'
                        />
                    </li>
                ))}
            </ul>
        </Group>
    )
}

export default ExamplesGroup;