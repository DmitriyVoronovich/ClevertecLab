export const onValidateEmail = (
    setIsRepeatButtonDisabled: (value: ((prevState: boolean) => boolean) | boolean) => void,
) => (email: string) => {
        const re = /\S+@\S+\.\S+/;

        if (re.test(email)) {
            setIsRepeatButtonDisabled(false);
        }

        return re.test(email);
    };
