import { ApplicationViewSet } from './application-view-set';

export enum ApplicationViewLifeCycle {
  // 0 表示创建阶段
  Created = 0,
  // 1 表示初始化阶段
  Initialized = 1,
  // 2 表示开始显示阶段
  Started = 2,
  // 3 表示恢复到活动状态阶段
  Resumed = 3,
  // 4 表示暂停阶段
  Paused = 4,
  // 5 表示停止显示阶段
  Stopped = 5,
  // 6 表示销毁阶段
  Destroyed = 6
}

export interface ApplicationViewInfo {
  // view id, 全局唯一
  id: string;
  // view 配置信息
  params: {
    [key: string]: any;
    /**
     * 视图名称
     */
    name: string;
  };
  // view 状态
  status: ApplicationViewLifeCycle;
}

/**
 * 应用视图
 */
export class ApplicationView {
  private curViewSet: ApplicationViewSet | undefined;
  constructor(private viewInfo: ApplicationViewInfo) {}

  get ID() {
    return this.viewInfo.id;
  }

  setStatus(nextStatus: ApplicationViewLifeCycle) {
    this.viewInfo.status = nextStatus;
  }

  setCurViewSet(viewSet: ApplicationViewSet) {
    this.curViewSet = viewSet;
  }

  getCurViewSet() {
    return this.curViewSet;
  }
}
