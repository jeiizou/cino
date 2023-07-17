import React from 'react';

export interface AppBootProps {
    title?: string;
}

export function AppBoot({ title }: AppBootProps): React.ReactElement {
    return <div>AppBoot: {title}</div>;
}
