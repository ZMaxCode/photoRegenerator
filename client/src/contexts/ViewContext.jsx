import React, { useContext, useState } from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';

const ViewContext = React.createContext();

const useView = () => useContext(ViewContext);

const ViewContextProvider = ({children}) => {

    const [activePanel, setActivePanel] = useState('home');
    const [poput, setPoput] = useState(null);

    const context = { setActivePanel, setPoput }

    return (
        <ViewContext.Provider value={context}>
            <View activePanel={activePanel} popout={poput}>
                {children}
            </View>
        </ViewContext.Provider>
    )
}

export { useView };
export default ViewContextProvider;