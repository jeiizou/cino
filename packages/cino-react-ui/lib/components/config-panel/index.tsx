import React, { useEffect, useRef, useState } from 'react';
import { ConfigPanelGroup } from './config-panel.type';
import { Anchor, Button } from 'antd';
import FormilyRender from '../formily-render';
import { Form, createForm } from '@formily/core';

import styles from './index.module.scss';

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
  /**
   * 保存的时候触发的事件
   * @param values
   * @returns
   */
  onSaveConfig?: (values: Record<string, StoreValue>) => void;
  /**
   * 各个表单项的默认值
   */
  defaultValue?: Record<string, StoreValue>;
}
export function ConfigPanel({
  config,
  scope,
  onSaveConfig,
  defaultValue
}: ConfigPanelProps): React.ReactElement {
  const panelRef = useRef<HTMLDivElement>(null);
  const [formMap, setFormMap] = useState<Record<string, Form>>({});

  useEffect(() => {
    if (config && Array.isArray(config)) {
      const forms: Record<string, Form> = {};
      for (let i = 0; i < config.length; i++) {
        const group = config[i];
        const formInstance = createForm();
        forms[group.groupId] = formInstance;
      }
      setFormMap(forms);
    }
  }, [config]);

  const onSave = async () => {
    let values: Record<string, StoreValue> = {};
    for (const formKey of Object.keys(formMap)) {
      const formValue = await formMap[formKey].submit();
      values[formKey] = formValue;
    }
    onSaveConfig?.(values);
  };

  return (
    <div className={styles['config-panel']}>
      <div className={styles['config-panel-items']}>
        <Anchor getContainer={() => panelRef.current ?? document.body}>
          {config.map((group) => (
            <Anchor.Link
              key={group.groupId}
              href={`#${scope}-${group.groupId}`}
              title={group.groupName}
            ></Anchor.Link>
          ))}
        </Anchor>
      </div>
      <div ref={panelRef} className={styles['config-panel-schema']}>
        <div className={styles['config-panel-tools']}>
          <Button size="small" onClick={onSave}>
            保存
          </Button>
        </div>

        {config.map((group) => (
          <div
            key={group.groupId}
            className={styles['config-panel-schema-item']}
            id={`${scope}-${group.groupId}`}
          >
            <div>{group.groupName}</div>
            {group.formilySchema && formMap[group.groupId] && (
              <FormilyRender
                // defaultValue={defaultValue?.[group.groupId]}
                form={formMap[group.groupId]}
                formSchema={group.formilySchema}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
