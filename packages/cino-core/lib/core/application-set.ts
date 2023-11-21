import { AsyncSingleton } from '../base/async-singleton';
import { Application } from './application';
import { CinoCore } from './cino-core';

export interface ApplicationRuntimeInfo {}

export const DEFAULT_RUNTIME_INFO: ApplicationRuntimeInfo = {};

/**
 * 应用集
 */
export class ApplicationSet extends AsyncSingleton {
  static getInstance(initialize?: () => void | Promise<void>) {
    return super.getInstance(initialize) as Promise<ApplicationSet>;
  }

  private curCino: CinoCore | undefined;

  private constructor() {
    super();
  }

  // 应用集合
  private appMap = new WeakMap<Symbol, Application>();

  /**
   * 应用的注册
   */
  async register(app: Application) {
    this.appMap.set(app.ID, app);
    app.setCurSet(this);
  }

  setCurCino(cino: CinoCore) {
    this.curCino = cino;
  }
}
