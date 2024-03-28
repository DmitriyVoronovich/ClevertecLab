export type File = {
    uid: string,
    name: string,
    status: string,
    url?: string,
};

export type AvatarProps = {
    onModalOpen: () => void
    onButtonDisablet: () => void
};
