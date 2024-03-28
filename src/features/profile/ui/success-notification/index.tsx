import {Alert} from 'antd';

import './success_notification.css';

export const SuccessNotification = () => {

        return (
            <Alert
                data-test-id='alert'
                message="Данные профиля успешно обновлены"
                type="success"
                showIcon={true}
                closable={true}
            />

    );
};
