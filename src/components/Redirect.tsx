import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IRedirectProps {
    redirectPath: string;
}

export const Redirect = ({ redirectPath }: IRedirectProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(redirectPath);
    }, []);

    return <div>Redirected...</div>;
};
