import { useMemo } from 'react';

/**
 * 合并默认 Props
 * @param componentProps 组件属性
 * @param defaultProps 默认属性
 * @returns
 */
export function useMergeProps<PropsType>(
  componentProps: PropsType,
  defaultProps: Partial<PropsType>
): PropsType {
  const props = useMemo(() => {
    const cloneProps = { ...componentProps };
    for (const propName in defaultProps) {
      if (cloneProps[propName] === undefined) {
        cloneProps[propName] = defaultProps[propName]!;
      }
    }
    return cloneProps;
  }, [componentProps, defaultProps]);

  return props;
}
