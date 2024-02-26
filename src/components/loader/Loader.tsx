import Lottie from 'react-lottie';
import animationData from '../../loader.json';
import './loader.css'

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className={'loader'} data-test-id='loader'>
            <Lottie options={defaultOptions} height={350} width={350} />
        </div>
    );
};

export default Loader;
