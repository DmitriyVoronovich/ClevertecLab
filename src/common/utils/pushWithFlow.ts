import { push } from 'redux-first-history';

export const pushWithFlow = (to: string) => push(to, { flowRedirect: true });
