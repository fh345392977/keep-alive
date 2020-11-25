import { FormInstance } from 'antd/lib/form';
import { TablePaginationConfig } from 'antd/lib/table';
import { useEffect, useState } from 'react';

export type useScrollYType = [
  React.RefObject<HTMLDivElement>,
  boolean,
  (
    | React.MutableRefObject<FormInstance | undefined>
    | ((actionRef: FormInstance) => void)
    | undefined
  ),
  boolean,
  false | TablePaginationConfig | undefined,
  boolean,
  number,
  number | undefined,
];
// TODO: 还要计算rowSelection
export default ([
  wrapperRef,
  formCollapsed,
  formRef,
  showHeader,
  pagination,
  isFullscreen,
  height,
  dynamicHeight,
]: useScrollYType) => {
  const [scrollY, setScrollY] = useState<number>(0);
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
      setScrollY(nextScrollY);
    }
  }, [
    wrapperRef,
    formCollapsed,
    formRef,
    showHeader,
    pagination,
    isFullscreen,
    height,
    dynamicHeight,
  ]);
  return scrollY;
};
