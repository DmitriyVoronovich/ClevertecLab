import Lottie from 'react-lottie';
import {defaultOptions} from '@components/loader/constant.ts';

import './loader.css';

export const Loader = () => (
    <div className="loader" data-test-id='loader'>
        <Lottie options={defaultOptions} height={350} width={350}/>
    </div>
);
