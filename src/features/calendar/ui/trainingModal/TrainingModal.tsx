import {Button, Modal} from "antd";
import {useState} from "react";
import icon from '../../../../accets/calendar-page/training_modal.svg'
import './trainingModal.css';

export const TrainingModal = () => {
    const [open, setOpen] = useState(true);

    const arr = []

    const handleOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal
            className={'training_modal'}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            width={264}
            mask={false}
            footer={[
                <Button key="submit" type="primary" onClick={handleOk} className={'training_modal_button'}>
                    Создать тренировку
                </Button>,
            ]}
        >
            <div className={'training_header_wrapper'}>
                <h5 className={'training_header_title'}>Тренировка на</h5>
                {arr.length === 0 ? <p className={'training_header_description'}>Нет активных тренировок</p> : <span></span>}
            </div>
            <div className={'training_modal_list_wrapper'}>
                {arr.length === 0 ? <img className={'training_modal_icon'} src={icon} alt={'icon'}/> : <ul></ul>}
            </div>
        </Modal>
    );
};
