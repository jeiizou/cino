/**
 * @ Author: zhoujie.x
 * @ Create Time: 2023-07-17 14:39:57
 * @ Modified by: zhoujie.x
 * @ Modified time: 2023-09-11 16:29:11
 * @ Description: AppBoot 应用启动器
 */
import { CinoApplication } from "cino-core";
import React from "react";
import style from "./app.module.scss";

type AppBootProps = {
  appMap?: Record<string, CinoApplication>;
  AppContainer?: (props: any) => React.ReactElement;
};

export default function AppBoot({
  appMap = {},
  AppContainer,
}: AppBootProps): React.ReactElement {
  return (
    <div className={style.appBoot}>
      {Object.keys(appMap).map((key) => {
        return (
          <div className={style.appBootBlock} key={key}>
            {AppContainer && <AppContainer app={appMap[key]} showName={true} />}
          </div>
        );
      })}
    </div>
  );
}
