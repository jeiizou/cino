import { Application } from './application';
import { ApplicationView, ApplicationViewInfo, ApplicationViewLifeCycle } from './application-view';

export class ApplicationViewSet {
  private viewMap: Map<string, ApplicationView> = new Map();
  private currentApp: Application | undefined;

  constructor() {
    this.viewMap = new Map();
  }

  createView(viewInfo: ApplicationViewInfo) {
    const newView = new ApplicationView(viewInfo);
    this.viewMap.set(newView.ID, newView);
    newView.setCurViewSet(this);
  }

  destroyView(viewID: string) {
    const view = this.viewMap.get(viewID);
    if (view) {
      view.setStatus(ApplicationViewLifeCycle.Destroyed);
      this.viewMap.delete(viewID);
    }
  }

  // 设置当前的APP对象
  setApp(app: Application) {
    this.currentApp = app;
  }

  getApp() {
    return this.currentApp;
  }
}
