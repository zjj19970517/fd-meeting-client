import { useMemo, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;

/**
 * useCallback 的优化版本
 * @param fn
 * @returns
 */
function useMemoizedFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<PickFunction<T>>();
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as T;
}

export default useMemoizedFn;
