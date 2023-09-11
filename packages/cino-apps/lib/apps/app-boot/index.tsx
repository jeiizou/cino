import { Cino, CinoEventsName } from "cino-core";
import AppBoot from "./components/App";
import AppSVG from "./components/app.svg";

export const AppBootstrapApp = Cino.createApp({
  id: "app-bootstrap",
  name: "应用启动器",
  config: {
    icon: {
      src: AppSVG,
    },
    boot: [
      {
        type: "docker",
        persistence: true,
      },
    ],
  },
  appMap: {},
  onInitialize(app) {
    const event = app.context.getEvent();
    event.on(CinoEventsName.AppInstall, ({ id, app: curApp }) => {
      if (curApp.getId() == app.self.getId()) {
        return;
      }
      // 排除所有在docker中的应用
      if (curApp.getConfig().boot?.find((i) => i.type === "docker")) {
        return;
      }
      this.appMap[curApp.getId()] = curApp;
    });
  },
  onActivate(app) {
    // 激活应用的时候创建一个窗口
    app.createView({
      title: "应用启动器",
      container: AppBoot,
      containerProps: {
        appMap: this.appMap,
      },
      renderType: "react",
      size: {
        width: 800,
        height: 400,
      },
    });
  },
});
