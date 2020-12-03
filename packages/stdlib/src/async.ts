export function wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function throttle(fn, timeout: number) {
    const args = { current: null };
    let timerId: number;

    return function () {
        args.current = Array.prototype.slice.apply(arguments);

        if (!timerId) {
            timerId = window.setTimeout(function () {
                timerId = null;
                fn.apply(this, args.current);
            }, timeout);
        }
    }
}

export function debaunce(fn: (...args: any[]) => any, ms: number) {
    let timer: number;

    const value = function (...args: any[]) {
        window.clearTimeout(timer);
        timer = window.setTimeout(fn, ms, args);
    };

    (value as any).cancel = () => {
        window.clearTimeout(timer);
    }

    return value;
}