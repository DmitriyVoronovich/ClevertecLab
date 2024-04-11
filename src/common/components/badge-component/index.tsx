import { BadgeProps } from '@components/badge-component/types/types.ts';
import Badge from 'antd/lib/badge';

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
