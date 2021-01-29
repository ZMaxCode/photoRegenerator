import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import ExamplesGroup from './ExamplesGroup';
import InfoGroup from './InfoGroup';

const Home = ({ id }) => {

	return (
		<Panel id={id}>
			<PanelHeader>PhotoEditor</PanelHeader>
			<InfoGroup />
			{/* <ExamplesGroup /> */}
		</Panel>
	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Home;
