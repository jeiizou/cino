import React from 'react';
import { ConfigPanel } from 'cino-react-ui';

type SysSettingProps = {
  // HOLD
};

export default function SysSetting({}: SysSettingProps): React.ReactElement {
  return (
    <div style={{ backgroundColor: '#eee', width: '100%', height: '100%' }}>
      <ConfigPanel></ConfigPanel>
    </div>
  );
}
