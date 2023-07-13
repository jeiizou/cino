import React from 'react';
import { DesktopBackGround } from '../background/type';
import Background from '../background';
import ModeSwitcher from '../mode-switcher';

import windowSvg from '@/assets/window.svg';
import gridSvg from '@/assets/grid.svg';
import WindowLayout from '../window-layout';
import ContextMenu from '../contextmenu';
import WindowDocker from '../window-docker';
import WindowViews from '../window-views';

type DesktopProps = {
    /**
     * 背景设置
     */
    background?: DesktopBackGround;
};

export default function Desktop({
    background,
}: DesktopProps): React.ReactElement {
    return (
        <Background background={background}>
            <ModeSwitcher
                modes={[
                    {
                        icon: windowSvg,
                        key: 'window',
                        name: '窗口',
                    },
                    {
                        icon: gridSvg,
                        key: 'grid',
                        name: '网格',
                    },
                ]}
            />
            <WindowLayout>
                <WindowViews />
                <WindowDocker />
            </WindowLayout>
            {/* 右键菜单 */}
            <ContextMenu />
        </Background>
    );
}
