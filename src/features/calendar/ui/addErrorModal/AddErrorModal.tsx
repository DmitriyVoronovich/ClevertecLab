import {Button, Modal} from "antd";
import error from '../../../../accets/calendar-page/add_error.svg'
import React from "react";
import {setAddTrainingStatus} from "../../model/calendarSlice.ts";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import './addErrorModal.css'

type AddErrorModalProps = {
    onClose: () => void
};

export const AddErrorModal: React.FC<AddErrorModalProps> = ({onClose}) => {
    const dispatch = useAppDispatch();


    const onCancelModal = () => {
        dispatch(setAddTrainingStatus({addTrainingStatus: 'idle'}))
        onClose()
    };

    return (
        <Modal open={true} footer={null} className={'add_error_modal_container'}
               onCancel={onCancelModal} centered style={{width: '416px'}} closable={false} maskClosable={false}>
            <div className={'add_error_content_wrapper'}>
                <img src={error} alt={'error'} className={'add_error_img'}/>
                <div className={'add_error_wrapper_text'}>
                    <h4 className={'add_error_text_title'} data-test-id='modal-error-user-training-title'>При сохранении данных произошла
                        ошибка</h4>
                    <p className={'add_error_text'}data-test-id='modal-error-user-training-subtitle'>Придётся попробовать ещё раз</p>
                </div>
            </div>
            <Button className={'add_error_button'} onClick={onCancelModal} data-test-id='modal-error-user-training-button'>Закрыть</Button>
        </Modal>
    );
};
