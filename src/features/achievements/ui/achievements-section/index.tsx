import {SetStateAction, useState} from 'react';
import {Tabs} from 'antd';

import {tabsAchievementsItem} from './tab-achievements-item.tsx';

import './achievements-section.css';

export const AchievementsSection = () => {
    const [section, setSection] = useState('');
    const items = tabsAchievementsItem(section);

    const onSectionChange = (value: SetStateAction<string>) => setSection(value);

    return (
        <div className="achievements_section_container">
            <div>
                <Tabs defaultActiveKey="1" items={items} onChange={onSectionChange}
                      className='achievements_tab' destroyInactiveTabPane={true}/>
            </div>
        </div>
    );
};
