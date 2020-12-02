import { TablePaginationConfig } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useAliveController } from 'umi';

export type useScrollYType = {
  wrapperRef: React.RefObject<HTMLDivElement>;
  formCollapsed: boolean;
  pagination: false | TablePaginationConfig | undefined;
  isFullscreen: boolean;
  height: number;
  dynamicHeight: number | undefined;
  selectedRowKeys: Array<string | number>;
};
// TODO: 还要计算rowSelection
export default ({
  wrapperRef,
  formCollapsed,
  pagination,
  isFullscreen,
  height,
  dynamicHeight,
  selectedRowKeys,
}: useScrollYType) => {
  const [scrollY, setScrollY] = useState<number>(0);
  const { getCachingNodes } = useAliveController();
  const cachingNodes = getCachingNodes();
  useEffect(() => {
    if (wrapperRef.current) {
      const tableBody = wrapperRef.current.querySelector('.ant-table-body');
      const wrapperSize = wrapperRef.current.getBoundingClientRect();
      let nextScrollY = isFullscreen ? height : wrapperSize.height;
      if (dynamicHeight && !Number.isNaN(dynamicHeight)) {
        nextScrollY -= dynamicHeight;
      }
      if (tableBody) {
        nextScrollY -= tableBody?.getBoundingClientRect().top - wrapperSize.top;
      }
      if (pagination !== false) {
        nextScrollY -= 56;
      }
      console.log('nextScrollY', nextScrollY);
      setScrollY(nextScrollY);
    }
  }, [
    wrapperRef,
    formCollapsed,
    pagination,
    isFullscreen,
    height,
    dynamicHeight,
    selectedRowKeys,
    cachingNodes,
  ]);
  return scrollY;
};
