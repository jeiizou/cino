import React from 'react';

export interface SysSettingsProps {
    title?: string;
}

export function SysSettings({ title }: SysSettingsProps): React.ReactElement {
    return <div>SysSettings {title}</div>;
}
