import {SetStateAction, useState} from 'react';
import {Tabs} from 'antd';

import './achievements-section.css';
import {tabsAchievementsItem} from "./tab-achievements-item.tsx";

export const AchievementsSection = () => {
    const [section, setSection] = useState('');

    const onSectionChange = (value: SetStateAction<string>) => setSection(value);

    const items = tabsAchievementsItem(section);

    return (
        <div className="achievements_section_container">
            <div>
                <Tabs defaultActiveKey="1" items={items} onChange={onSectionChange}
                      className='achievements_tab' destroyInactiveTabPane={true}/>
            </div>
        </div>
    );
};
