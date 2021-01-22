import React from 'react';
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert';

import { useView } from '../../contexts/ViewContext';

const useOneButtonAlert = () => {

    const { setPoput } = useView();

    const useOneButtonAlertParams = {
        isAlertShow: false,

        hideAlert(){
            setPoput(null);
            this.isAlertShow = false;
        },

        showAlert(header = 'Error header', text = 'Error text'){
            const parentContext = this;
            setPoput(
                <Alert
                    header={header}
                    text={text}
                    onClose={this.hideAlert.bind(parentContext)}
                    actions={[{
                        title: 'Ок',
                        autoclose: true,
                        mode: 'cancel'
                    }]}
                />
            )
            this.isAlertShow = true;
        }
    }

    return useOneButtonAlertParams;
}

export default useOneButtonAlert;