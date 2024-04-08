import {CheckCircleFilled} from "@ant-design/icons";
import {TrainingSelectedMenu} from "@enums/enums.ts";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import avatar from "@image/feedback-page/default_avatar.svg";
import {Avatar, Button, Modal} from "antd";

import {inviteThunks} from "../../../invite/model/invite-slice.ts";
import {setSelectedMenuItem} from "../../model/training-slice.ts";
import {TrainingPals} from "../../model/types/types.ts";

import './user-information-modal.css';

type UserInformationModalProps = {
    onCloseModal: () => void
    user: TrainingPals
}

export const UserInformationModal = ({onCloseModal, user}: UserInformationModalProps) => {
const dispatch = useAppDispatch()
    const name = user.name.split(' ');
    const secondName = user.name.split(' ');

    const onRemoveTraining = () => {
        dispatch(inviteThunks.removeInvite({id:user.inviteId}))
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.JointTraining}));
    }

    return (
        <Modal open={true}
               onCancel={onCloseModal}
               footer={false}
               centered={true}
               maskClosable={false}
               data-test-id='partner-modal'>
            <div className='user_information_modal_container'>
                <div className='user_information_section'>
                    <div className='card_header_wrapper'>
                        <Avatar size={42} src={user.imageSrc ? user.imageSrc : avatar}/>
                        <h6 className='card_header_title'>
                            {name[0]}
                            {secondName[1] && <br/>}
                            {secondName[1] && secondName[1]}
                        </h6>
                    </div>
                    <div className='card_footer_description'>
                        <span className='card_footer_description_text'>тренировка одобрена</span>
                        <CheckCircleFilled style={{color: '#52C41A'}} size={14}/>
                    </div>
                </div>
                <div className='user_information_section'>
                    <div className='card_information_wrapper'>
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
                    <Button className='card_button' onClick={onRemoveTraining}>
                        Отменить тренировку
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

