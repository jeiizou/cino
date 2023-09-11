import React from "react";

type IframeRenderProps = {
  url: string;
};

export default function IframeRender({
  url,
}: IframeRenderProps): React.ReactElement {
  return (
    <iframe
      style={{
        width: "100%",
        height: "100%",
        padding: 0,
        border: 0,
      }}
      src={url}
    ></iframe>
  );
}
