import { WindowModel } from "cino-react-ui";
import React from "react";

type DemoProps = {
  // HOLD
};

export default function Demo({}: DemoProps): React.ReactElement {
  const { emit$, windowMap } = WindowModel.useContext();

  console.log("windowMap", windowMap);

  return <div></div>;
}
