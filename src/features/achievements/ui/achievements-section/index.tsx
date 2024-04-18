import {useState} from 'react';
import {Tabs, TabsProps} from 'antd';

import {AchievementsForTheMonth} from '../achievements-for-the-month';
import {AchievementsForTheWeek} from '../achievements-for-the-week';

import './achievements-section.css';

export const AchievementsSection = () => {
    const [section, setSection] = useState('');

    const onSectionChange = (value) => setSection(value);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'За неделю',
            children: <AchievementsForTheWeek section={section}/>,
        },
        {
            key: '2',
            label: 'За месяц',
            children: <AchievementsForTheMonth section={section}/>,
        },
        {
            key: '3',
            label: 'За все время (PRO)',
            children: 'Content of Tab Pane 3',
            disabled: true,
        },
    ];

    return (
        <div className="training_section_container">
            <div>
                <Tabs defaultActiveKey="1" items={items} onChange={onSectionChange}
                      className='achievements_tab' destroyInactiveTabPane={true}/>
            </div>
        </div>
    );
};
