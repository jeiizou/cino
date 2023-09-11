import { Cino } from "cino-core";
import AppIconSvg from "./app.svg";

export const JuejinApp = Cino.createApp({
  id: "web-juejin",
  name: "掘金",
  config: {
    icon: {
      src: AppIconSvg,
    },
  },
  onInitialize: (app) => {
    // console.log('应用初始化');
  },
  onActivate: (app) => {
    const url = "https://juejin.cn";
    // 激活应用的时候创建一个窗口
    app.createView({
      title: `掘金(${url})`,
      renderType: "iframe",
      url: url,
      size: {
        width: 375,
        height: 670,
      },
    });
  },
});
