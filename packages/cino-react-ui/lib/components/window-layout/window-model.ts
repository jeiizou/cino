import { ViewInfo } from '@/core/cino.type';
import { createModel } from '@/ui/hooks/basic/use-model';
import { useEventEmitter } from 'ahooks';
import { useState } from 'react';

export enum EVENT_TYPE {
  WIN_REGIS = 'win_regis',
  WIN_POSITION = 'win_position',
  WIN_MIN = 'win_min',
  WIN_CLOSE = 'win_close',
  WIN_RESIZE = 'win_resize',
  WIN_FOCUS = 'win_focus',
  CANVAS_LEAVE = 'canvas_leave',
  CANVAS_MOVING = 'canvas_moving',
  CANVAS_CLICK = 'canvas_click',
  BAR_SORT = 'bar_sort',
  BOOT_START = 'boot_start',
  APP_START = 'app_start',
  APP_INSTALLED = 'app_installed',
}

export type WindowInfo = {
  // 窗口是否可见
  visible: boolean;
  // 窗口名称
  name: string;
  // view info
  viewInfo?: ViewInfo;
};

export type WindowMapType = Record<
  string, // window key
  WindowInfo
>;

export const DESKTOP_CONFIG = {
  sortConfig: {
    gutter: [8, 8],
  },
};

function useWindowModel() {
  const event$ = useEventEmitter<{
    type: EVENT_TYPE;
    [key: string]: any;
  }>();

  const emit$ = (type: EVENT_TYPE, params: Record<string, any> = {}) => {
    event$.emit({
      type,
      ...params,
    });
  };

  const subscribe$ = (type: EVENT_TYPE, fn: (val?: Record<string, any>) => void) => {
    event$.useSubscription((val) => {
      if (val.type === type) {
        fn?.(val);
      }
    });
  };

  // window level array
  const [zlevelArr, setZLevelArr] = useState<string[]>([]);
  // active window id
  const [activeWindowId, setActiveWindowId] = useState();
  // window information map
  const [windowMap, setWindowMap] = useState<WindowMapType>({});
  const [containerSize, setContainerSize] = useState<SizeType>();

  subscribe$(EVENT_TYPE.WIN_FOCUS, (val) => {
    setZLevelArr((v) => {
      let index = v.indexOf(val?.id);
      if (~index) {
        v.splice(index, 1);
        v.unshift(val?.id);
        setActiveWindowId(val?.id);
        return [...v];
      } else {
        return v;
      }
    });

    if (!windowMap[val?.id]?.visible) {
      setWindowMap((map) => {
        if (map[val?.id]) {
          map[val?.id].visible = true;
        }
        return { ...map };
      });
    }
  });

  subscribe$(EVENT_TYPE.APP_START, (val) => {
    if (!val) return;
    if (windowMap[val.id]) {
      // 已存在
      console.info('application loaded');
    } else {
      setWindowMap((map) => {
        map[val.id] = {
          visible: true,
          name: val.name,
          viewInfo: val.viewInfo,
        };
        return { ...map };
      });

      setZLevelArr((v) => {
        if (~v.indexOf(val?.id)) {
          return v;
        }
        v.unshift(val?.id);
        return [...v];
      });
    }
  });

  // 窗口最小化
  subscribe$(EVENT_TYPE.WIN_MIN, (val) => {
    setWindowMap((map) => {
      if (map[val?.id]) {
        map[val?.id].visible = false;
      }
      return { ...map };
    });
  });

  return {
    emit$,
    subscribe$,
    containerSize,
    setContainerSize,
    activeWindowId,
    setActiveWindowId,
    zlevelArr,
    windowMap,
  };
}

export const WindowModel = createModel(useWindowModel);
