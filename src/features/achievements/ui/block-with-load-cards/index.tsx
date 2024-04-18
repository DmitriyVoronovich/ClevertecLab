import {Card, Statistic} from 'antd';

import {BlockWithLoadCardsProps} from './types/types.ts';

import './block-with-load-cards.css';
import {useIsMobile} from "@utils/useIsMobile.ts";

export const BlockWithLoadCards = ({filterTraining, training}: BlockWithLoadCardsProps) => {
    const isMobile = useIsMobile();

    const totalLoad = training.reduce((accum, item) => accum += item.load, 0);
    const loadPerDay = totalLoad / training.length;
    const numberOfRepetitions = filterTraining.reduce((accum, item) => {
        const repetition = item.exercises.reduce((acc, item) => acc += item.replays, 0);

        accum += repetition;

        return accum
    }, 0)
    const approaches = filterTraining.reduce((accum, item) => {
        const approache = item.exercises.reduce((acc, item) => acc += item.approaches, 0);

        accum += approache;

        return accum
    }, 0)

    return (
        <div className='block_load_card_container'>
            <Card style={isMobile ? {width: 328} : {width: 156}} className='load_card_wrapper'>
                <Statistic title="Общая нагрузка, кг" value={totalLoad}/>
            </Card>
            <Card style={isMobile ? {width: 328} : {width: 156}} className='load_card_wrapper'>
                <Statistic title="Нагрузка в день, кг" value={loadPerDay} precision={1}/>
            </Card>
            <Card style={isMobile ? {width: 328} : {width: 156}} className='load_card_wrapper'>
                <Statistic title="Количество повторений, раз" value={numberOfRepetitions}/>
            </Card>
            <Card style={isMobile ? {width: 328} : {width: 156}} className='load_card_wrapper'>
                <Statistic title="Подходы, раз" value={approaches}/>
            </Card>
        </div>
    );
};
