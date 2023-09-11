import { Cino, CinoEventsName, ViewInfo } from "cino-core";
import { CinoModel } from "@/hooks/use-cino";
import React, { useEffect, useMemo, useState } from "react";
import WindowBox from "../window-box";
import IframeRender from "../app-render/iframe-render";
import AppIcon from "../app-icon";
import { EVENT_TYPE, WindowModel } from "../window-layout/window-model";

type WindowViewsProps = {
  // HOLD
};

export default function WindowViews({}: WindowViewsProps): React.ReactElement {
  const { cino } = CinoModel.useContext();
  const { emit$ } = WindowModel.useContext();
  const [views, setViews] = useState<Record<string, ViewInfo>>({});

  useEffect(() => {
    if (cino) {
      // 获取当前已经注册的views
      const views = cino?.getViews();
      if (views) {
        const newViews: Record<string, ViewInfo> = {};
        Object.keys(views).forEach((key) => (newViews[key] = views.get(key)!));
        setViews(newViews);
      }
      cino.events.on(CinoEventsName.RegisterView, ({ viewId, info }) => {
        setViews((oldViews) => {
          oldViews[viewId] = info;
          return {
            ...oldViews,
          };
        });
        setTimeout(() => {
          emit$(EVENT_TYPE.WIN_FOCUS, {
            id: viewId,
          });
        }, 500);
      });
      cino.events.on(CinoEventsName.DestroyView, ({ viewId }) => {
        setViews((oldViews) => {
          delete oldViews[viewId];
          return {
            ...oldViews,
          };
        });
      });
    }
  }, [cino]);

  const closeView = (viewKey: string, viewInfo: ViewInfo) => {
    const app = cino?.getAppByAppId(viewInfo.appId);
    // 移除该view
    app?.removeView(viewKey);
  };

  return (
    <React.Fragment>
      {Object.keys(views).map((viewKey) => {
        const viewInfo = views[viewKey];
        const Container = viewInfo?.config?.container;
        const ContainerProps = viewInfo?.config?.containerProps ?? {};
        return (
          <WindowBox
            windowName={viewInfo.config.title}
            key={viewKey}
            windowId={viewKey}
            viewInfo={viewInfo}
            onClose={() => closeView(viewKey, viewInfo)}
          >
            {viewInfo.config.renderType === "iframe" && viewInfo.config.url && (
              <IframeRender url={viewInfo.config.url} />
            )}
            {viewInfo.config.renderType === "react" && Container && (
              <Container {...ContainerProps} AppContainer={AppIcon} />
            )}
          </WindowBox>
        );
      })}
    </React.Fragment>
  );
}
