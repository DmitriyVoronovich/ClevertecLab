import {CheckCircleFilled} from '@ant-design/icons';
import {TrainingSelectedMenu} from '@enums/enums.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import avatar from '@image/feedback-page/default_avatar.svg';
import {useIsMobile} from '@utils/use-is-mobile.ts';
import {Avatar, Button, Modal} from 'antd';

import {inviteThunks} from '../../../invite/model/invite-slice.ts';
import {setSelectedMenuItem} from '../../model/training-slice.ts';

import {UserInformationModalProps} from './types/types.ts';

import './user-information-modal.css';


export const UserInformationModal = ({onCloseModal, user}: UserInformationModalProps) => {
    const dispatch = useAppDispatch();
    const isMobile = useIsMobile();

    const onRemoveTraining = () => {
        dispatch(inviteThunks.removeInvite({id: user.inviteId}))
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.JointTraining}));
    };

    return (
        <Modal open={true}
               onCancel={onCloseModal}
               footer={false}
               centered={true}
               maskClosable={false}
               data-test-id='partner-modal'
               width={isMobile ? 312 : 539}>
            <div className='user_information_modal_container'>
                <div className='user_information_section'>
                    <div className='card_header_wrapper'>
                        <Avatar size={42} src={user.imageSrc ? user.imageSrc : avatar}/>
                        <h6 className='card_header_title'>
                            {user.name}
                        </h6>
                    </div>
                    <div className='user_information_wrapper'>
                        <div className='card_description_wrapper'>
                            <span className='card_description_title'>Тип тренировки:</span>
                            <span className='card_description_text'>{user.trainingType}</span>
                        </div>
                        <div className='card_description_wrapper'>
                            <span className='card_description_title'>Средняя нагрузка:</span>
                            <span
                                className='card_description_text'>{user.avgWeightInWeek} кг/нед</span>
                        </div>
                    </div>
                </div>
                <div className='user_information_section_two'>
                    <div className='card_footer_description'>
                        <span className='card_footer_description_text'>тренировка одобрена</span>
                        <CheckCircleFilled style={{color: '#52C41A'}} size={14}/>
                    </div>
                    <Button className='user_information_button' onClick={onRemoveTraining}>
                        Отменить тренировку
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

