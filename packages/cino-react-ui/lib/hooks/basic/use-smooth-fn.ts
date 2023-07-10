import { useLatest, useUnmount } from 'ahooks';
import { useMemo } from 'react';

type noop = (...args: StoreValue) => StoreValue;

const rafThrottle = (callback: noop) => {
    let requestId: number | null = null;

    let lastArgs: StoreValue;

    const later = (context: StoreValue) => () => {
        requestId = null;
        callback.apply(context, lastArgs);
    };

    const throttled = function (
        this: StoreValue,
        ...args: Parameters<StoreValue>
    ) {
        lastArgs = args;
        if (requestId === null) {
            requestId = requestAnimationFrame(later(this));
        }
    };

    throttled.cancel = () => {
        if (requestId) {
            cancelAnimationFrame(requestId);
        }
        requestId = null;
    };

    return throttled;
};

export function useSmoothFn<T extends noop>(fn: T) {
    const fnRef = useLatest(fn);

    const throttled = useMemo(
        () =>
            rafThrottle((...args: Parameters<T>): ReturnType<T> => {
                return fnRef.current(...(args as unknown[]));
            }),
        [],
    );

    useUnmount(() => {
        throttled.cancel();
    });

    return {
        run: throttled,
        cancel: throttled.cancel,
    };
}
