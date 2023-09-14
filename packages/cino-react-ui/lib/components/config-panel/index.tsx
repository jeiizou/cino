import React, { useState } from 'react';
import { ConfigPanelGroup } from './config-panel.type';
import { Anchor } from 'antd';
import FormilyRender from '../formily-render';

export interface ConfigPanelProps {
  // 配置项
  config: ConfigPanelGroup[];
  /**
   * 默认的配置组ID
   */
  defaultGroupId?: string;
  /**
   * 配置面板唯一KEY
   */
  scope: string;
}
export function ConfigPanel({ config }: ConfigPanelProps): React.ReactElement {
  return (
    <div className="flex">
      <div className="w-12 flex-shrink-0">
        <Anchor
          items={config.map((group) => ({
            key: group.groupId,
            href: `#group-${group.groupId}`,
            title: group.groupName
          }))}
        ></Anchor>
      </div>
      <div className="w-full ">
        {config.map((group) => (
          <div key={group.groupId}>
            {group.formilySchema && <FormilyRender formSchema={group.formilySchema} />}
          </div>
        ))}
      </div>
    </div>
  );
}
