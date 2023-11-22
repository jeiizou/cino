import { AsyncSingleton } from '../base/async-singleton';
import { Application } from './application';
import { CinoCore } from './cino-core';

export interface ApplicationRuntimeInfo {}

export const DEFAULT_RUNTIME_INFO: ApplicationRuntimeInfo = {};

/**
 * 应用集
 */
export class ApplicationSet {
  curCino: CinoCore | undefined;
  // 应用集合
  private appMap: Map<Symbol, Application> | undefined;

  constructor() {
    this.appMap = new Map();
  }

  /**
   * 应用的注册
   */
  async register(app: Application) {
    this.appMap?.set(app.ID, app);
    app.setCurSet(this);
  }

  setCurCino(cino: CinoCore) {
    this.curCino = cino;
  }

  findAppByID(appID: Symbol) {
    return this.appMap?.get(appID);
  }
}
