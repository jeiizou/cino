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
    ApplicationSet.getInstance().then((res) => {
      this.applicationSet = res;
      this.applicationSet.setCurCino(this);
    });
  }
}
