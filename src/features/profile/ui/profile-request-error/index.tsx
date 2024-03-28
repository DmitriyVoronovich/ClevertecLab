import {RequestProfileStatus} from '@enums/enums.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {Button, Modal} from 'antd';

import error from '../../../../accets/calendar-page/add_error.svg';
import {setProfileStatus} from '../../model/profileSlice.ts';

import './profile-request-error.css';

export const ProfileRequestError = () => {
    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(setProfileStatus({profileStatus: RequestProfileStatus.Idle}));
    }

    return (
        <Modal
            open={true}
            footer={null}
            className="profile_error_modal_container"
            onCancel={onClose}
            centered={true}
            style={{ width: '416px' }}
            closable={false}
            maskClosable={false}
        >
            <div className="profile_error_content_wrapper">
                <img src={error} alt="error" className="add_error_img" />
                <div className="profile_error_wrapper_text">
                    <h4
                        className="profile_error_text_title"
                    >
                        При сохранении данных произошла ошибка
                    </h4>
                    <p
                        className="profile_error_text"
                    >
                        Придется попробовать ещё раз
                    </p>
                </div>
            </div>
            <Button
                className="profile_error_button"
                onClick={onClose}
                data-test-id='big-file-error-close'
            >
                Закрыть
            </Button>
        </Modal>
    );
};
