import {useEffect} from 'react';
import {ArrowLeftOutlined, EditOutlined} from '@ant-design/icons';
import {AddTrainingStatus} from '@enums/enums.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useIsMobile} from '@utils/useIsMobile.ts';
import {Button, Modal} from 'antd';

import {TableModalProps} from '../types/types.ts';


export const TableModal = ({onModalClose, train, modalStyle, onEditDrawerOpen}: TableModalProps) => {
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
    const addTrainingStatus = useAppSelector((state) => state.calendar.addTrainingStatus);
    const isMobile = useIsMobile();

    const element = trainingList.find((item) => item.name === train.name)

    useEffect(() => {
        if (addTrainingStatus === AddTrainingStatus.Success) {
            onModalClose();
        }
    }, [addTrainingStatus, onModalClose]);

    const handleOk = () => onEditDrawerOpen(train);

    const handleCancel = () => onModalClose();

    return (
        <Modal
            className="add_training_modal"
            open={true}
            width={isMobile ? 253 : 253}
            mask={false}
            maskClosable={false}
            closable={false}
            style={isMobile ? { top: '25%' } : modalStyle }
            footer={[
                <Button
                    key='save'
                    type='default'
                    onClick={handleOk}
                    className="add_training_modal_button additional_button_style"
                >
                    Добавить упражнения
                </Button>,
            ]}
        >
            <div className="add_training_header_wrapper" style={{ borderBottom: `2px solid ${element?.color}`}}>
                <ArrowLeftOutlined
                    style={{ width: '14px', height: '14px' }}
                    onClick={handleCancel}
                />
                <span className='modal_header_title'>{train.name}</span>
            </div>
            <div className="add_training_modal_list_wrapper">
                {!train.exercises.length ? (
                    <div className="add_training_modal_none_list" />
                ) : (
                    <ul className="add_training_modal_list">
                        {train.exercises.map((item) => (
                            <li key={item.name} className="add_training_modal_list_item">
                                <div className="add_training_modal_title">
                                    {item.name}
                                </div>
                                <Button onClick={() => onEditDrawerOpen(train)} className='edit_button'>
                                    <EditOutlined
                                        className="edit_svg"
                                    />
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Modal>
    );
};
