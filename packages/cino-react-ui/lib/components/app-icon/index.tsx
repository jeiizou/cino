import { CinoAppStatus, CinoApplication } from "cino-core";
import React, { useMemo } from "react";
import style from "./index.module.scss";
import classNames from "classnames";
import {
  EVENT_TYPE,
  WindowInfo,
  WindowModel,
} from "../window-layout/window-model";

type AppIconProps = {
  /**
   * 图标尺寸
   */
  size?: "small" | "medium" | "large";
  /**
   * 应用数据
   */
  app: CinoApplication;
  /**
   * 是否展示应用名称
   */
  showName?: boolean;
};

/**
 * App Icon 组件
 * @param param0
 * @returns
 */
export default function AppIcon({
  app,
  size = "medium",
  showName = false,
}: AppIconProps): React.ReactElement {
  const windowModelContext = WindowModel.useContext();
  const { emit$, windowMap } = windowModelContext ?? {};

  const iconSrc = useMemo(() => {
    return app.getConfig()?.icon?.src;
  }, [app]);

  // 当前app的所有窗口
  const windowList = useMemo(() => {
    if (!windowMap) {
      return [];
    }

    const lWindowList: (WindowInfo & { winKey: string })[] = [];
    const keys = Object.keys(windowMap);
    keys.forEach((key) => {
      const widowInfo = windowMap[key];
      if (widowInfo?.viewInfo?.appId === app.getId()) {
        lWindowList.push({
          ...widowInfo,
          winKey: key,
        });
      }
    });
    return lWindowList;
  }, [windowMap, app]);

  /**
   * 至少一个窗口被最小化
   */
  const isHidden = useMemo(() => {
    return windowList.some((w) => !w.visible);
  }, [windowList]);

  const onIconClick = () => {
    if (app.status !== CinoAppStatus.activate) {
      // 激活该APP
      app.activate();
    }

    // app 已激活, 执行聚焦操作
    windowList.forEach((w) => {
      if (w?.viewInfo?.appId === app.getId()) {
        emit$?.(EVENT_TYPE.WIN_FOCUS, { id: w.winKey });
      }
    });
  };

  return (
    <div className={style.app_icon__container}>
      <div
        className={classNames(style.app_icon, `${style.app_icon}--${size}`, {
          [style["app_icon--hidden"]]: isHidden,
        })}
        onClick={onIconClick}
      >
        <img src={iconSrc} alt={app.name} />
        <span className={style.app_icon__name}>{app.name}</span>
      </div>
      {showName && (
        <div className={style["app_icon_show-name"]}>{app.name}</div>
      )}
    </div>
  );
}
