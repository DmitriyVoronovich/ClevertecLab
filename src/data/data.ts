import heard from '../accets/image/heard.svg';
import cal from '../accets/image/cal.svg';
import prof from '../accets/image/prof.svg';
import icprof from '../accets/image/svg-menu/icon-prof.svg';
import icdos from '../accets/image/svg-menu/icon-dos.svg';
import icrasp from '../accets/image/svg-menu/icon-rasp.svg';
import icheard from '../accets/image/svg-menu/icon-heard.svg';
import {calendarThunks} from "../features/calendar/model/calendarSlice.ts";

export const NavigationCardData = [
    {
        id: 1,
        title: 'Тренировки',
        icon: heard,
        description: 'Расписать тренировки',
        callback: () => {
            console.log()
        },
        dataId: 'menu-button-calendar1'
    },
    {
        id: 2,
        title: 'Календарь',
        icon: cal,
        description: 'Назначить календарь',
        callback: calendarThunks.training,
        dataId: 'menu-button-calendar1'
    },
    {
        id: 3, title: 'Профиль',
        icon: prof,
        description: 'Заполнить профиль',
        callback: () => {
            console.log()
        }, dataId: 'menu-button-calendar1'
    },
];

export const NavigationMenuData = [
    {
        id: 1,
        title: 'Календарь',
        icon: icrasp,
        callback: calendarThunks.training,
        dataId: 'menu-button-calendar'
    },
    {
        id: 2, title: 'Тренировки', icon: icheard, callback: () => {
            console.log()
        }, dataId: 'menu-button-calendar1'
    },
    {
        id: 3, title: 'Достижения', icon: icdos, callback: () => {
            console.log()
        }, dataId: 'menu-button-calendar1'
    },
    {
        id: 4, title: 'Профиль', icon: icprof, callback: () => {
            console.log()
        }, dataId: 'menu-button-calendar1'
    }
];
