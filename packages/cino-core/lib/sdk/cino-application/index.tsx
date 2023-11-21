import { Application, ApplicationParams } from '../../core/application';
import { CinoCore } from '../../core/cino-core';

/**
 * 应用创建方法
 */
export class ApplicationHandle {
  constructor(private cino: CinoCore) {}

  /**
   * 创建一个APP应用
   * @param appParams
   */
  createApp(appParams: ApplicationParams) {
    // 创建一个应用对象
    const app = new Application(appParams);
    // 将对象注册到cino中
    this.cino.applicationSet?.register(app);
  }
}
