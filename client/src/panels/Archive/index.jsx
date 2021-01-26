import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import CompareSlider from '../../components/CompareSlider';
import Photo from '../../utils/photo';

import { useView } from '../../App';

const Archive = ({ id }) => {

    const { setActivePanel, user } = useView();
    const [ archive, setArchive ] = useState([]);

    useEffect(() => {

        const getData = async () => {
            setArchive(await user.getArchive());
        }

        getData();
    }, [])

    return (
        <Panel id={id}>
            <PanelHeader left={
                <PanelHeaderBack onClick={() => setActivePanel('home')} />
            }>
                Archive
            </PanelHeader>
            <Group>
                <ul>
                    {archive.map(el => (
                        <li>
                            <CompareSlider
                                firstImage={new Photo('https://via.placeholder.com/200x400/0000FF/808080?text=first')}
                                secondImage={new Photo('https://via.placeholder.com/200x400/FF0000/FFFFFF?text=second')}
                                className='mt-2'
                            />
                        </li>
                    ))}
                </ul>
            </Group>
        </Panel>
    )
}

Archive.propTypes = {
    id: PropTypes.string.isRequired
}

export default Archive;