import { ConfigPanel } from '@/index';
import React from 'react';
import backgroundSchema from './schema/background-schema.json';

type DemosProps = {
  // HOLD
};

export default function Demos({}: DemosProps): React.ReactElement {
  return (
    <div
      style={{
        padding: 16
      }}
    >
      Demos
      <div
        style={{
          border: '1px solid #aaa',
          height: 300
          // overflow: 'auto'
        }}
      >
        <ConfigPanel
          config={[
            {
              groupId: 'background',
              groupName: '背景配置',
              formilySchema: backgroundSchema
            },
            {
              groupId: 'functions',
              groupName: '功能模式',
              formilySchema: backgroundSchema
            },
            {
              groupId: 'group-3',
              groupName: '功能模式22',
              formilySchema: backgroundSchema
            }
          ]}
          scope="demo"
        />
      </div>
    </div>
  );
}
