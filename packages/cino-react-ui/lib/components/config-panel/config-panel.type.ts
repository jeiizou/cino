export enum ItemType {
  string = 'string',
  number = 'number',
  color = 'color'
}

export interface ConfigPanelItem {
  name: string;
  type: ItemType;
  dataSource?: { label: string; value: string }[];
  [key: string]: any;
}

export interface ConfigPanelGroup {
  groupName: string;
  groupId: string;
  //   静态配置
  configItem?: ConfigPanelItem[];
  //   formily render
  formilySchema?: any;
}
