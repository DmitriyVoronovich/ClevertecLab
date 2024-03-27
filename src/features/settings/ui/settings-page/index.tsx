import {useState} from 'react';
import { goBack } from 'redux-first-history';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {RequestSettingsStatus} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';

import {setSettingsStatus, TrafficList} from '../../model/settings-slice.ts';
import {DrawerTariffComparison} from '../drawer-tariff-comparison';
import {InformationModal} from '../information-modal';
import {SettingsSection} from '../settings-section';

import './settings-page.css';

export const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const settingsStatus = useAppSelector((state) => state.settings.settingsStatus);
    const [tariff, setTariff] = useState({} as TrafficList);

    const onDrawerClose = () => {
       dispatch(setSettingsStatus({settingsStatus: RequestSettingsStatus.Idle}))
    };

    const onDrawerOpen = (tariff: TrafficList) => {
        dispatch(setSettingsStatus({settingsStatus: RequestSettingsStatus.Selected}));
        setTariff(tariff)
    };

    return (
        <>
            <div className="settings_container">
                <div className="settings_header_container">
                    <div className="settings_header_container_title" onClick={() => dispatch(goBack())} data-test-id='settings-back'>
                        <ArrowLeftOutlined style={{fontSize: '14px'}} />
                        Настройки
                    </div>
                </div>
                <SettingsSection onDrawerOpen={onDrawerOpen}/>
            </div>
            {settingsStatus === RequestSettingsStatus.Selected && <DrawerTariffComparison tariff={tariff} onDrawerClose={onDrawerClose}/>}
            {settingsStatus === RequestSettingsStatus.Succeeded && <InformationModal />}
        </>)
};
