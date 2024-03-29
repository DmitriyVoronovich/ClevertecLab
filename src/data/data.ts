import cal from '@image/image/cal.svg';
import heard from '@image/image/heard.svg';
import prof from '@image/image/prof.svg';
import icdos from '@image/image/svg-menu/icon-dos.svg';
import icheard from '@image/image/svg-menu/icon-heard.svg';
import icprof from '@image/image/svg-menu/icon-prof.svg';
import icrasp from '@image/image/svg-menu/icon-rasp.svg';
import {pushWithFlow} from '@utils/pushWithFlow.ts';
import { calendarThunks } from '../features/calendar/model/calendar-slice.ts';

export const NavigationCardData = [
    {
        id: 1,
        title: 'Тренировки',
        icon: heard,
        description: 'Расписать тренировки',
        callback: () => {
            console.log();
        },
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
