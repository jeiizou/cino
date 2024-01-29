import { CinoLog } from '../base/cino-log';
import { Application } from './application';
import { ApplicationSet } from './application-set';
import { CinoEventBus } from './cino-events';

/**
 * 核心对象
 */
export class CinoCore {
  /**
   * 应用对象集合
   */
  applicationSet: ApplicationSet | null = null;
  /**
   * 内置事件总线
   */
  event: CinoEventBus<string, any> | null = null;

  constructor() {
    // 初始化事件总线
    this.event = new CinoEventBus();
    // 初始化 应用对象组
    this.applicationSet = new ApplicationSet();
    this.applicationSet.setCurCino(this);
  }

  /**
   * @public 安装一个应用
   * @param app
   */
  installApp(app: Application) {
    this.applicationSet?.register(app);
  }

  /**
   * @public 获取一个已经安装的应用
   * @param appId
   */
  getApp(appId: Symbol) {
    const app = this.applicationSet?.findAppByID(appId);
    if (app) {
      return app;
    } else {
      CinoLog.warn('target appid is not installed');
      return null;
    }
  }
}
