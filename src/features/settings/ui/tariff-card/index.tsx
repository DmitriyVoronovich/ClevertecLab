import {CheckOutlined} from '@ant-design/icons';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Button} from 'antd';

import free from '@image/settings-page/free_tarif.png';
import pro_dis from '@image/settings-page/pro_dis.png';
import pro from '@image/settings-page/pro_tariff.png';
import {formatMonth} from '../../../calendar/ui/drawer-modal/utils/formate-date.ts';

import {TariffCardProps} from './types/types.ts';

import './tariff-card.css';

export const TariffCard = ({tariff, onDrawerOpen}: TariffCardProps) => {
    const meInformation = useAppSelector(state => state.profile.meInformation);

    const tariffNameFree = tariff.name === 'FREE';

    return (
        <div className='tariff_card_conteiner' data-test-id={tariffNameFree ? 'pro-tariff-card' : ''}>
            <div className='traffic_card_header'>
                <h5 className='traffic_card_title'>{tariff.name}<span>tarif</span></h5>
                <span className='traffic_card_item' onClick={() => onDrawerOpen(tariff)}>Подробнее</span>
            </div>
            {tariffNameFree
                ? <img src={free} alt='free tariff'/>
                : <img src={meInformation.tariff ? pro : pro_dis} alt='free tariff'/>}
            <div className={meInformation.tariff && !tariffNameFree ? 'tariff_status_wrapper_active' : 'tariff_status_wrapper'}>
                {tariffNameFree || meInformation.tariff
                    ? <>
                        <span className='tariff_status'>активен</span>
                        {meInformation.tariff && !tariffNameFree
                            ? <span className='tariff_status' >до {formatMonth(meInformation.tariff.expired)}</span>
                            : <CheckOutlined/>} </>
                    : <Button type="primary"
                              data-test-id='activate-tariff-btn'
                              onClick={() => onDrawerOpen(tariff)}
                              className='tariff_status_button'>Активировать</Button>}
            </div>
        </div>
    );
};
