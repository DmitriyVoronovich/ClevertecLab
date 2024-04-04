import cal from '@image/image/cal.svg';
import heard from '@image/image/heard.svg';
import prof from '@image/image/prof.svg';
import icdos from '@image/image/svg-menu/icon-dos.svg';
import icheard from '@image/image/svg-menu/icon-heard.svg';
import icprof from '@image/image/svg-menu/icon-prof.svg';
import icrasp from '@image/image/svg-menu/icon-rasp.svg';
import {pushWithFlow} from '@utils/pushWithFlow.ts';
import { calendarThunks } from '../features/calendar/model/calendar-slice.ts';
import {trainingThunks} from "../features/training/model/training-slice.ts";

export const NavigationCardData = [
    {
        id: 1,
        title: 'Тренировки',
        icon: heard,
        description: 'Расписать тренировки',
        callback: trainingThunks.getTraining(),
        dataId: 'menu-button-calendar1',
    },
    {
        id: 2,
        title: 'Календарь',
        icon: cal,
        description: 'Назначить календарь',
        callback: calendarThunks.training(),
        dataId: 'menu-button-calendar1',
    },
    {
        id: 3,
        title: 'Профиль',
        icon: prof,
        description: 'Заполнить профиль',
        callback: pushWithFlow('/profile'),
        dataId: 'menu-button-profile',
    },
];

export const NavigationMenuData = [
    {
        id: 1,
        title: 'Календарь',
        icon: icrasp,
        callback: calendarThunks.training,
        dataId: 'menu-button-calendar',
    },
    {
        id: 2,
        title: 'Тренировки',
        icon: icheard,
        callback: () => {
            console.log();
        },
        dataId: 'menu-button-calendar1',
    },
    {
        id: 3,
        title: 'Достижения',
        icon: icdos,
        callback: () => {
            console.log();
        },
        dataId: 'menu-button-calendar1',
    },
    {
        id: 4,
        title: 'Профиль',
        icon: icprof,
        callback: () => {
            console.log();
        },
        dataId: 'menu-button-calendar1',
    },
];

export const TariffComparisonData = [
    {
        id: 1, title: 'Статистика за месяц', free: true, pro: true
    },
    {
        id: 2, title: 'Статистика за все время', free: false, pro: true
    },
    {
        id: 3, title: 'Совместные тренировки', free: true, pro: true
    },
    {
        id: 4, title: 'Участие в марафонах', free: false, pro: true
    },
    {
        id: 5, title: 'Приложение iOS', free: false, pro: true
    },
    {
        id: 6, title: 'Приложение Android', free: false, pro: true
    },
    {
        id: 7, title: 'Индивидуальный Chat GPT', free: false, pro: true
    }
];

export const DaySelectorData = [
    {key: 1, title: 'Понедельник'},
    {key: 2, title: 'Вторник'},
    {key: 3, title: 'Среда'},
    {key: 4, title: 'Четверг'},
    {key: 5, title: 'Пятница'},
    {key: 6, title: 'Суббота'},
    {key: 7, title: 'Воскресенье'}
];

export const PeriodicitySelectorData = [
    {key: 1, title: 'Через 1 день'},
    {key: 2, title: 'Через 2 дня'},
    {key: 3, title: 'Через 3 дня'},
    {key: 4, title: 'Через 4 дня'},
    {key: 5, title: 'Через 5 дней'},
    {key: 6, title: 'Через 6 дней'},
    {key: 7, title: '1 раз в неделю'}
]

export const TableSelectorData = [
    {id: 1, title: 'Переодичность'},
    {id: 2, title: 'Сортировка по дате'},
    {id: 3, title: 'Сортировка по дням'},
    {id: 4, title: 'Сортировка по всему'}
]
