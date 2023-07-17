import { CinoApplication } from "cino-core";
import { AppIcon } from "cino-react-ui";
import React from "react";
import style from "./app.module.scss";

type AppBootProps = {
  // HOLD
  appMap: Record<string, CinoApplication>;
};

export default function AppBoot({ appMap }: AppBootProps): React.ReactElement {
  return (
    <div className={style.appBoot}>
      {Object.keys(appMap).map((key) => {
        return (
          <div className={style.appBootBlock}>
            <AppIcon showName={true} size="large" app={appMap[key]} />
          </div>
        );
      })}
    </div>
  );
}
