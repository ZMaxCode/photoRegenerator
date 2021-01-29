import React, { useState, useEffect, useContext } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Upload from './panels/Upload';
import useAlertHook from './components/poputs/alert/useAlert';
import User from './utils/user';
import Archive from './panels/Archive';

import './styles/global.scss';

const ViewContext = React.createContext();

const useView = () => useContext(ViewContext);

const App = () => {

	const [activePanel, setActivePanel] = useState('home');
	const [poput, setPoput] = useState(null);
	const [user, setUser] = useState(null);

	const useAlert = useAlertHook(setPoput);

	useEffect(() => {

		const getData = async () => {
			try {
				const userInfo = await bridge.send('VKWebAppGetUserInfo');

				if (userInfo.error_type) throw new Error(userInfo.error_type);

				setUser(new User(userInfo));
			}
			catch (error) {
				useAlert.error('Ошбика', error)
			}
		}

		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});

		getData();
	}, []);

	const context = { setActivePanel, setPoput, user, useAlert };

	return (
		<ViewContext.Provider value={context}>
			<View activePanel={activePanel} popout={poput}>
				<Home id='home' />
				<Upload id='upload' />
				{/* <Archive id='archive' /> */}
			</View>
		</ViewContext.Provider>
	);
}

export default App;
export { useView }