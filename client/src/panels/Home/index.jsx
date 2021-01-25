import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import CompareSlider from '../../components/CompareSlider';

import { useView } from '../../App';

import styles from './style.module.scss';

const Home = ({ id }) => {

	const {setActivePanel} = useView();

	return (
		<Panel id={id}>
			<PanelHeader>PhotoEditor</PanelHeader>
			<Group>
				<Div>
					<img src='https://via.placeholder.com/200?text=logo' alt='logo' className={styles.logo} />
					<Title level='2' className={styles.title} weight='regular'>In velit do minim nostrud nisi pariatur cupidatat nulla irure consectetur eiusmod sit qui incididunt.</Title>
					<Button
						mode='commerce'
						size='l'
						className={styles.button}
						onClick={() => setActivePanel('upload')}
					>
						try
					</Button>
					<Button
						mode='secondary'
						size='l'
						className={styles.button}
						onClick={() => setActivePanel('archive')}
					>
						archive
					</Button>
				</Div>
			</Group>
			<Group>
				<Title level='1' className={styles.examplesTitle}>Examples</Title>
				<CompareSlider
					firstImage='https://via.placeholder.com/200x400/0000FF/808080?text=first'
					secondImage='https://via.placeholder.com/200x400/FF0000/FFFFFF?text=second'
					className='mt-2'
				/>
			</Group>
		</Panel>
	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Home;
