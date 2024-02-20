import React, { ReactNode } from 'react';

interface LabelProps {
    children?: ReactNode;
    htmlFor: string;
}

export function Label({ children, htmlFor }: LabelProps) {
    return <label htmlFor={htmlFor} className="font-medium">{children}</label>;
}
