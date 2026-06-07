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
                'font-medium text-sky-700 underline decoration-sky-300 underline-offset-4 transition-colors duration-300 ease-out hover:text-sky-600 hover:decoration-current! dark:text-sky-400 dark:decoration-sky-700 dark:hover:text-sky-300',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
