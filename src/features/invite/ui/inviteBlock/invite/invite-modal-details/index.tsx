import {Modal} from 'antd';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {BadgeComponent} from '@components/badge-component';
import './invite-modal-details.css'
import {PeriodicitySelectorData} from '@data/data.ts';
import {formateDate} from '../../../../../calendar/ui/drawer-modal/utils/formate-date.ts';
import {ExerciseItem} from '../../../../../calendar/ui/workout-edit-form/types/types.ts';
import {useIsMobile} from '@utils/useIsMobile.ts';
import {InviteModalDetailsProps} from './types/types.ts';

export const InviteModalDetails = ({user, onCloseModal, modalStyle}: InviteModalDetailsProps) => {
    const trainList = useAppSelector((state) => state.calendar.trainingList);
    const trainName = trainList.find((item) => item.name === user.training.name);
    const periodName = PeriodicitySelectorData.find((item) =>
        item.key === user.training.parameters.period);
    const isMobile = useIsMobile();

    return (
        <Modal maskClosable={false}
               className='modal'
               style={ modalStyle }
               mask={false}
               footer={false}
               open={true}
               width={isMobile ? 288 : 312}
               data-test-id='joint-training-review-card'
               onCancel={onCloseModal}>
            <div className='invite_modal_header'>
                <BadgeComponent name={trainName?.name} color={trainName?.color} index={1}
                                fontWeight="400" fontSize="14px"/>
            </div>
            <div className='invite_information_wrapper'>
                <div className='invite_information_block'>
                    <span className='invite_information_period'>{periodName?.title}</span>
                    <span className='invite_information_date'>{formateDate(user.training.date)}</span>

                </div>
                {user.training.exercises.map((item: ExerciseItem) => (
                        <div className='invite_information_block'>
                            <span className='invite_exercises_name'>{item.name}</span>
                            <span className='invite_exercises'>
                                {item.replays} x ({item.weight === 0 ? item.approaches : item.weight} {item.weight === 0 ? '' : 'кг'})
                            </span>
                        </div>
                    ))}
            </div>
        </Modal>
    );
};
