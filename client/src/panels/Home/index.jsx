import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';

import styles from './style.module.scss';

const Home = ({ id }) => (
	<Panel id={id}>
		<PanelHeader>PhotoEditor</PanelHeader>
		<Div>
			<img src='https://via.placeholder.com/200?text=logo' alt='logo' className={styles.logo}/>
			<Title level='2' className={styles.title} weight='regular'>In velit do minim nostrud nisi pariatur cupidatat nulla irure consectetur eiusmod sit qui incididunt.</Title>
		</Div>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired
};

export default Home;
