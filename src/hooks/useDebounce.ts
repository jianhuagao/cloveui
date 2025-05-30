/**
 * @module useDebounce
 */

import { useMemo } from 'react';

import useLatestRef from './useLatestRef';
import { debounce } from 'throttle-debounce';

export interface Options {
  // 是否前置调用
  atBegin?: boolean;
}

export interface Callback<TArgs extends unknown[] = unknown[], TResult = unknown> {
  (this: unknown, ...args: TArgs): TResult;
}

/**
 * @function useDebounce
 * @description [hook] 防抖函数
 * @param callback 目标回调函数
 * @param delay 延迟的时间
 * @param options 防抖模式配置
 */
export default function useDebounce<C extends Callback>(callback: C, delay: number, options: Options = {}): debounce<C> {
  const { atBegin } = options;
  const callbackRef = useLatestRef(callback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => debounce<Callback>(delay, (...args) => callbackRef.current(...args), options), [delay, atBegin]);
}
