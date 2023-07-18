import { CinoApplication } from "cino-core";
import { AppIcon, WindowModel } from "cino-react-ui";
import React from "react";
import style from "./app.module.scss";

type AppBootProps = {
  appMap?: Record<string, CinoApplication>;
};

export default function AppBoot({
  appMap = {},
}: AppBootProps): React.ReactElement {
  const { emit$, windowMap } = WindowModel.useContext();

  return (
    <div className={style.appBoot}>
      {Object.keys(appMap).map((key) => {
        return (
          <div className={style.appBootBlock} key={key}>
            <AppIcon showName={true} size="large" app={appMap[key]} />
          </div>
        );
      })}
    </div>
  );
}
