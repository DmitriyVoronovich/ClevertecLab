import {useState} from "react";
import {Button, Modal, Select} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import './addTrainingModal.css';

export const AddTrainingModal = () => {
    const trainingList = useAppSelector(state => state.calendar.trainingList)
    const [open, setOpen] = useState(true);

    const arr = []

    const handleOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };

    // const handleCancel = () => {
    //     setOpen(false);
    // };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <Modal
            className={'add_training_modal'}
            open={open}
            onOk={handleOk}
            // onCancel={handleCancel}
            width={264}
            mask={false}
            closable={false}
            footer={[
                <Button key="submit" type="default" onClick={handleOk}
                        className={'add_training_modal_button'}>
                    Добавить упражнение
                </Button>,
                <Button  type="default" onClick={handleOk} disabled={true}
                        className={'save_training_modal_button'}>
                    Сохранить
                </Button>
            ]}
        >
            <div className={'add_training_header_wrapper'}>
                <ArrowLeftOutlined style={{width: '14px', height: '14px'}}/>
                <Select
                    className={'add_training_selector'}
                    defaultValue={'Выбор типа тренировки'}
                    onChange={handleChange}
                    style={{width: '100%'}}
                    options={trainingList.map((item) => ({
                        value: item.key,
                        label: item.name,
                    }))}
                />

            </div>
            <div className={'add_training_modal_list_wrapper'}>
                {arr.length === 0 ?
                    <div className={'add_training_modal_none_list'}></div> : <ul></ul>}
            </div>
        </Modal>
    );
};
