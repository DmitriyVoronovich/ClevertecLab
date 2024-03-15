import './home-section.css';
import {data} from "../../../data/data.ts";
import {Fragment} from "@components/fragment/Fragment.tsx";

export const HomeSection = () => {
    return (
        <section className={'main_section_container'} >
            <p className={'section_block1'}>
                С CleverFit ты сможешь:<br/>
                — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;<br/>
                — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с
                нормами и рекордами;<br/>
                — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о
                тренировках;<br/>
                — выполнять расписанные тренировки для разных частей тела, следуя подробным
                инструкциям и советам профессиональных тренеров.
            </p>
            <div className={'section_block2'}>
                <p className={'section_block2_text'}>
                    CleverFit — это не просто приложение, а твой личный помощник в мире
                    фитнеса.
                    Не откладывай на завтра — начни тренироваться уже сегодня!
                </p>
                <div className={'section_block2_fragment'}>
                    {data.map(item => (
                        <Fragment key={item.id} description={item.description} title={item.title} icon={item.icon} callback={item.callback} dataId={item.dataId}/>
                    ))}
                </div>
            </div>
        </section>
    );
};
