import {Avatar, Button} from 'antd';
import avatar from '@image/feedback-page/default_avatar.svg';
import {formateDate} from '../../../../calendar/ui/drawer-modal/utils/formate-date.ts';
import {InviteProps} from './types/types.ts';

export const Invite = ({user, onRejectedInvite, onAcceptedInvite, onOpenModalWithDetails}: InviteProps) => (
        <div className='invite_block_wrapper'>
            <div className='invite_block_user_section'>
                <Avatar size={42}
                        src={user.from.imageSrc ? user.from.imageSrc : avatar}/>
                <div className='invite_user_name_wrapper'>
                    <span className='card_header_title'>{user.from.firstName}</span>
                    <span className='card_header_title'>{user.from.lastName}</span>
                </div>
            </div>
            <div className='invite_block_information_section'>
                <span className='invite_date'>{formateDate(user.training.date)}</span>
                <p className='invite_information'>Привет, я ищу партнёра для совместных тренировок.
                    Ты хочешь присоединиться ко мне на следующих тренировках?
                </p>
                <div className='invite_details' onClick={(e) => onOpenModalWithDetails(e, user)}>
                    Посмотреть детали тренировки
                </div>
            </div>
            <div className='invite_button_section'>
                <Button className='invite_button_acced'
                        onClick={() => onAcceptedInvite(user)}>
                    Тренироваться вместе
                </Button>
                <Button className='invite_button'
                        onClick={() => onRejectedInvite(user)}>
                    Отклонить запрос
                </Button>
            </div>
        </div>
    );
