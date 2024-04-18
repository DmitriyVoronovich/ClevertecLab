import {TabsProps} from "antd";
import {AchievementsForTheWeek} from "../achievements-for-the-week";
import {AchievementsForTheMonth} from "../achievements-for-the-month";

export const tabsAchievementsItem = (section: string) => {
    const items: TabsProps['items'] = [
        {
            key: 'За неделю',
            label: 'За неделю',
            children: <AchievementsForTheWeek section={section}/>,
        },
        {
            key: 'За месяц',
            label: 'За месяц',
            children: <AchievementsForTheMonth section={section}/>,
        },
        {
            key: 'За все время',
            label: 'За все время (PRO)',
            children: 'Content of Tab Pane 3',
            disabled: true,
        },
    ];
    return items;
}
