import {useState} from 'react';
import {RequestProfileStatus} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Button} from 'antd';

import {DEFAULT_PERIOD} from '../../../../data/constant.ts';
import {feedbackThunks} from '../../../feedback/model/feedback-slice.ts';
import {FeedbackForm} from '../../../feedback/ui';
import {ProfileRequestError} from '../../../profile/ui/profile-request-error';
import {SwitchGroup} from '../switch-group';
import {TariffCard} from '../tariff-card';

import {SettingsSectionProps} from './types/types.ts';

import './settings-section.css';



export const SettingsSection = ({onDrawerOpen}: SettingsSectionProps) => {
    const dispatch = useAppDispatch();
    const profileStatus = useAppSelector(state => state.profile.profileStatus);
    const trafficList = useAppSelector((state) => state.settings.trafficList);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onCancelModalForm = () => setIsModalOpen(false);

    const showModalForm = () => setIsModalOpen(true);

    const freeTariff = {
        _id: trafficList._id,
        name: 'FREE',
        periods: trafficList?.[0]?.periods || DEFAULT_PERIOD
    }

    const onSubmittingReviewRequest = () => dispatch(feedbackThunks.getReviews());

    return (
        <>
            <div className="settings_section_container">
                <div className="settings_section_content">
                    <h3 className='settings_section_title'>Мой тариф</h3>
                    <div className='settings_card_wrapper'>
                        <TariffCard onDrawerOpen={onDrawerOpen} tariff={freeTariff}/>
                        {trafficList.map((item) => (
                            <TariffCard onDrawerOpen={onDrawerOpen} tariff={item}/>
                        ))}

                    </div>
                    <SwitchGroup/>
                    <div className='settings_review_group'>
                        <Button type="primary" className='settings_review_button' onClick={showModalForm}>Написать отзыв</Button>
                        <span className='settings_all_review_button' onClick={onSubmittingReviewRequest}>Смотреть все отзывы</span>
                    </div>
                </div>
            </div>
            {isModalOpen && <FeedbackForm onCancelModalForm={onCancelModalForm}/>}
            {profileStatus === RequestProfileStatus.Error && <ProfileRequestError/>}
        </>
    )
};
