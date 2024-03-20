export const onValidatePassword = (
    setIsPasswordValid: (value: ((prevState: boolean) => boolean) | boolean) => void,
) => {
    return (password: string) => {
        const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const isValid = re.test(password);
        setIsPasswordValid(isValid);
        return isValid;
    };
};
