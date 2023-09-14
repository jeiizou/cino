import React from 'react';
import { ConfigProvider, theme } from 'antd';

type AntdThemeProps = {
  children: React.ReactNode;
};

function AntdTheme({ children }: AntdThemeProps): React.ReactElement {
  return (
    <ConfigProvider
      theme={{
        token: {
          //   colorPrimary: '#4f556b',
          //   colorInfo: '#4f556b',
          //   colorError: '#7c191e',
          //   colorSuccess: '#4f6f46',
          //   colorWarning: '#c67915',
          //   colorLink: '#303133',
          //   fontSize: 14,
          //   sizeStep: 4,
          //   sizeUnit: 4,
          //   borderRadius: 12,
          //   wireframe: false,
          //   boxShadow:
          //     '      0 6px 12px 0 rgba(0, 0, 0, 0.08),      0 3px 6px -4px rgba(0, 0, 0, 0.12),      0 9px 28px 8px rgba(0, 0, 0, 0.05)    ',
          //   boxShadowSecondary:
          //     '      0 6px 12px 0 rgba(0, 0, 0, 0.08),      0 3px 6px -4px rgba(0, 0, 0, 0.12),      0 9px 28px 8px rgba(0, 0, 0, 0.05)    '
        },
        algorithm: [theme.compactAlgorithm]
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdTheme;
