import { ApplicationSet } from './application-set';
import { ApplicationStatus } from './application-status';
import { ApplicationViewSet } from './application-view-set';

/**
 * 创建一个应用所必须要的信息
 */
export interface ApplicationParams {
  /**
   * 应用唯一标记
   */
  id: Symbol;
  /**
   * 应用信息
   */
  info: {
    [key: string]: any;
    /**
     * 应用名称
     */
    name: string;
    /**
     * 应用描述
     */
    desc?: string;
  };
}

/**
 * 应用对象
 */
export class Application {
  private statusInfo: ApplicationStatus;
  private curSet: ApplicationSet | undefined;

  viewMap: ApplicationViewSet | null = null;

  constructor(private appParams: ApplicationParams) {
    this.statusInfo = new ApplicationStatus();
    // 创建view对象, 绑定当前实例
    this.viewMap = new ApplicationViewSet();
    this.viewMap.setApp(this);
  }

  get ID() {
    return this.appParams.id;
  }

  get status() {
    return this.statusInfo.status;
  }

  setCurSet(curSet: ApplicationSet) {
    this.curSet = curSet;
  }
}
