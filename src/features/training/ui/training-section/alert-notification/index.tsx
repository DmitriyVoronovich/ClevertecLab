import {Alert} from 'antd';

import {AlertNotificationProps} from '../types/types.ts';

import './alert-notification.css'

export const AlertNotification = ({onClose, message, dataId}: AlertNotificationProps) => {

    return (
        <div className="alert-wrapper" data-test-id={dataId}>
                <Alert
                    message={message}
                    type="success"
                    closable={true}
                    onClose={onClose}
                    showIcon={true}
                />
        </div>
    );
};
