import React from 'react';
import { ConfigPanel } from 'cino-react-ui';

import backgroundSchema from './setting-schema/background-schema.json';

type SysSettingProps = {
  // HOLD
};

export default function SysSetting({}: SysSettingProps): React.ReactElement {
  return (
    <div style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <ConfigPanel
        config={[
          {
            groupId: 'background',
            groupName: '背景配置',
            formilySchema: backgroundSchema
          }
        ]}
        scope="sys-setting"
        onSaveConfig={(values) => {
          console.log('values', values);
        }}
      ></ConfigPanel>
    </div>
  );
}
