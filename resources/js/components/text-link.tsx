import { Link } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type Props = ComponentProps<typeof Link>;

export default function TextLink({
    className = '',
    children,
    ...props
}: Props) {
    return (
        <Link
            className={cn(
                'font-medium text-brass underline decoration-brass/40 underline-offset-4 transition-colors duration-300 ease-out hover:text-timber hover:decoration-current! dark:text-brass-bright dark:decoration-brass-bright/40 dark:hover:text-rope',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
