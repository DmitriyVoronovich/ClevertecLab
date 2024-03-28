import Badge from 'antd/lib/badge';

import { BadgeProps } from './types/types.ts';

export const BadgeComponent = ({
    name,
    fontSize,
    fontWeight,
    color,
    index,
    colorText,
    className,
}: BadgeProps) => (
        <Badge
            key={index}
            color={color}
            text={name}
            style={{
                fontWeight,
                fontSize,
                lineHeight: '130%',
                color: colorText,
            }}
            className={className}
        />
    );
