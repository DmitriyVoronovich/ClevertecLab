import {useState} from 'react';
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined
} from '@ant-design/icons';
import {TariffComparisonData} from '@data/data.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useIsMobile} from '@utils/useIsMobile.ts';
import {Button, Drawer, Radio, RadioChangeEvent} from 'antd';

import {formatMonth} from '../../../calendar/ui/drawer-modal/utils/formate-date.ts';
import {settingsThunks} from '../../model/settings-slice.ts';

import {DrawerTariffComparisonProps} from './types/types.ts';

import './drawer-tariff-comparison.css';


export const DrawerTariffComparison = ({onDrawerClose, tariff}: DrawerTariffComparisonProps) => {
    const dispatch = useAppDispatch();
    const meInformation = useAppSelector(state => state.profile.meInformation);
    const trafficList = useAppSelector((state) => state.settings.trafficList);
    const [value, setValue] = useState(1);
    const [disadledButton, setDisadledButton] = useState(true);
    const isMobile = useIsMobile();

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        setDisadledButton(false)
    };

    const newArray = trafficList[0].periods.map(item => {
        return {
            text: item.text,
            cost: item.cost.toString().replace('.', ','),
            days: item.days
        }
    });

    const onBuyTariff = () => {
        const selectTariff = tariff.periods.find((item) => item.cost === value)

        dispatch(settingsThunks.addTariff({
            tariffId: tariff._id,
            days: selectTariff?.days
        }))
    };

    return (
        <Drawer
            data-test-id='tariff-sider'
            title='Сравнить тарифы'
            placement={isMobile ? 'bottom' : 'right'}
            height={isMobile ? 555 : '100%'}
            width={408}
            open={true}
            onClose={onDrawerClose}
            mask={false}
            maskClosable={false}
            className="drawer_container"
            closeIcon={<CloseOutlined/>}
            footer = {
                !meInformation.tariff && <Button className="drawer_tariff_button"
                                                 disabled={disadledButton}
                                                 onClick={onBuyTariff}
                                                 data-test-id='tariff-submit'>Выбрать и оплатить</Button>
            }
        >
            <div className='drawer_tariff_container'>
                {meInformation.tariff && <div className='drawer_pro_active'>Ваш PRO tarif активен до {formatMonth(meInformation.tariff.expired)}</div>}
                <div className='drawer_tariff_wrapper'>
                    <div className='drawer_tariff_name'>
                        <div className='tariff_free'>FREE</div>
                        <div className='tariff_pro'>PRO {meInformation.tariff && <CheckCircleOutlined style={{color: '#52C41A'}}/>}</div>
                    </div>
                    {TariffComparisonData.map((item) => {
                        return (
                            <div key={item.id} className='functional_wrapper'>
                                <span className='functional_title'>{item.title}</span>
                                <div className="functionality_benefits">
                                    {item.free
                                        ? <CheckCircleFilled style={{fontSize: '16px'}}/>
                                        : <CloseCircleOutlined
                                            style={{fontSize: '16px', color: '#BFBFBF'}}/>}
                                    {item.pro
                                        ? <CheckCircleFilled style={{fontSize: '16px'}}/>
                                        : <CloseCircleOutlined
                                            style={{fontSize: '16px', color: '#BFBFBF'}}/>}
                                </div>
                            </div>
                        )
                    })}
                    {!meInformation.tariff && <div className='select_tariff_period_wrapper'>
                        <h5 className='select_tariff_period_title'>Стоимость тарифа</h5>
                        <Radio.Group value={value} onChange={onChange}
                                     data-test-id='tariff-cost'
                                     className='select_tariff_container'>
                            {newArray.map((item) => {
                                return (
                                    <div key={item.cost} className='select_tariff_wrapper' >
                                        <span className='select_tariff_title'>{item.text}</span>
                                        <div className='select_tariff_cost_wrapper'>
                                            <span
                                                className='select_tariff_cost_title'>{item.cost.replace('.', ',')} $</span>
                                            <Radio value={parseInt(item.cost, 10)}data-test-id={`tariff-${parseInt(item.cost, 10)}`}/>
                                        </div>
                                    </div>
                                )
                            })}
                        </Radio.Group>
                    </div>}
                </div>
            </div>
        </Drawer>
    );
};
