import {useState} from 'react';
import {TrainingSelectedMenu} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import avatar from '@image/feedback-page/default_avatar.svg';
import {Avatar, Button} from 'antd';

import {formateDate} from '../../../calendar/ui/drawer-modal/utils/formate-date.ts';
import {setSelectedMenuItem} from '../../../training/model/training-slice.ts';
import {InviteParams} from '../../api/invite-api.ts';
import {inviteThunks} from '../../model/invite-slice.ts';

import {InviteModalDetails} from './invite-modal-details';

import './invite.css';

const Invite = () => {
    const dispatch = useAppDispatch()
    const inviteList = useAppSelector((state) => state.invite.inviteList)
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [modalStyle, setModalStyle] = useState({left: 0, top: 0});
    const [userInvite, setUserInvite] = useState({} as InviteParams);

    const onOpenModalWithDetails = (e: any, user: InviteParams) => {
        setOpenDetailsModal(true);
        const rect = e.currentTarget.getBoundingClientRect();

        setUserInvite(user);
        setModalStyle({left: rect.x, top: rect.y});
    }

    const onCloseModalWithDetails = () => {
        setOpenDetailsModal(false);
    }

    const onAcceptedInvite = (item: InviteParams) => {
        dispatch(inviteThunks.resToInvite({arg: {id: item._id, status: 'accepted'}}))
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.MyTrainingPartner}));
    }

    const onRejectedInvite = (item: InviteParams) => {
        dispatch(inviteThunks.resToInvite({arg: {id: item._id, status: 'rejected'}}))
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.JointTraining}));
    }

    return (
        <>
            <div className='invite_container'>
                <p className='invite_notification'>Новое сообщение ({inviteList.length})</p>
                {inviteList.map((item) => (<div className='invite_block_wrapper'>
                        <div className='invite_block_user_section'>
                            <Avatar size={42}
                                    src={item.from.imageSrc ? item.from.imageSrc : avatar}/>
                            <span className='card_header_title'>{item.from.firstName}</span>
                            <span className='card_header_title'>{item.from.lastName}</span>
                        </div>
                        <div className='invite_block_information_section'>
                            <span className='invite_date'>{formateDate(item.training.date)}</span>
                            <p className='invite_information'>Привет, я ищу партнёра для совместных
                                тренировок.
                                Ты хочешь присоединиться ко мне на следующих тренировках?
                            </p>
                            <div className='invite_details' onClick={(e) => onOpenModalWithDetails(e, item)}>
                                Посмотреть детали тренировки
                            </div>
                        </div>
                        <div className='invite_button_section'>
                            <Button style={{color: '#ffffff', background: '#2f54eb'}}
                                    className='invite_button'
                            onClick={() => onAcceptedInvite(item)}>
                                Тренироваться вместе
                            </Button>
                            <Button className='invite_button'
                                    onClick={() => onRejectedInvite(item)}>
                                Отклонить запрос
                            </Button>
                        </div>
                    </div>))
                })
            </div>
            {openDetailsModal &&
                <InviteModalDetails user={userInvite} onCloseModal={onCloseModalWithDetails}
                                    modalStyle={modalStyle}/>}
        </>
    );
};

export default Invite;
