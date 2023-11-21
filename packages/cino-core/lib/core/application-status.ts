export enum ApplicationStatusInfo {
  /** 应用默认的初始状态 */
  Initialize = '200',

  /** 应用正在运行中 */
  Running = '1000',

  /** 应用已停止运行 */
  Stopped = '2000',

  /** 应用已暂停运行 */
  Paused = '3000',

  /** 应用处于空闲状态 */
  Idle = '4000',

  /** 应用处于活跃状态，正在被用户使用 */
  Active = '5000',

  /** 应用在关闭进程中 */
  ShuttingDown = '6000',

  /** 应用在启动进程中 */
  StartingUp = '7000',

  /** 应用已准备好，可供用户使用 */
  Ready = '8000',

  /** 应用当前处于非活动状态，未被用户使用 */
  Inactive = '10001',

  /** 应用崩溃 */
  Crashed = '20000',

  /** 应用正在加载中 */
  Loading = '30000',

  /** 应用正在初始化 */
  Initializing = '40000',

  /** 应用正在更新 */
  Updating = '50000'
}

/**
 * 应用状态控制
 */
export class ApplicationStatus {
  status: ApplicationStatusInfo;
  lastStatus: ApplicationStatusInfo | null = null;
  constructor(defaultStatus: ApplicationStatusInfo = ApplicationStatusInfo.Initialize) {
    this.status = defaultStatus;
  }

  transition(nextStatus: ApplicationStatusInfo) {
    this.lastStatus = this.status;
    this.status = nextStatus;
  }
}
