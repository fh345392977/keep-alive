import { ColumnPropertyConfig } from '@/metadata/meta';
import { useEffect, useState } from 'react';
import { ColumnShow } from './useColumnState';

export type useScrollXType<T> = [ColumnPropertyConfig<T>[] | undefined, ColumnShow, number];

export default <T>([columns, columnsStateMap, extraScrollX]: useScrollXType<T>) => {
  const [scrollX, setScrollX] = useState<string | number>('100%');
  useEffect(() => {
    if (columns) {
      let isPercent = false;
      const columnScrollX = columns.reduce((pre, cur) => {
        if (
          cur.width &&
          cur.key &&
          (!columnsStateMap[cur.key] || columnsStateMap[cur.key].show !== false)
        ) {
          if (typeof cur.width === 'string') {
            isPercent = true;
            return pre + parseInt(cur.width.replace('%', ''), 10);
          }
          return pre + cur.width;
        }
        return pre;
      }, 0);
      if (columnScrollX === 0) {
        setScrollX('100%');
      } else {
        setScrollX(isPercent ? `${columnScrollX.toString()}%` : columnScrollX + extraScrollX);
      }
    }
  }, [columns, columnsStateMap, extraScrollX]);
  return scrollX;
};
