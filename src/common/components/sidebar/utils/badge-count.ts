import {NavigationMenuDataProps} from '@components/sidebar/types/types.ts';

import {InviteParams} from '../../../../features/invite/api/types/types.ts';

export const badgeCount = (item: NavigationMenuDataProps, inviteList: InviteParams[] ) => item.title === 'Тренировки' ? inviteList.length : 0;
