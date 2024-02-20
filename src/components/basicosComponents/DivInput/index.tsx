import React, { ReactNode } from 'react';

interface DivInputProps {
    children?: ReactNode;
    className?: string;
}

export function DivInput({ children, className, ...props }: DivInputProps) {
    return (
        <div className={`flex flex-col justify-center w-full gap-1 ${className}`} {...props}>
            {children}
        </div>
    );
}
