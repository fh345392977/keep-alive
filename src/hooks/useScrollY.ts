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

export default ([
  wrapperRef,
  collapsed,
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
      const headerForm = wrapperRef.current.querySelector('.ant-pro-table-search');
      const tableHead = wrapperRef.current.querySelector('.ant-table-thead');
      const tableAction = wrapperRef.current.querySelector('.ant-pro-table-list-toolbar');
      const wrapperHeight = isFullscreen
        ? height
        : wrapperRef.current.getBoundingClientRect().height;
      let nextScrollY = wrapperHeight;
      if (dynamicHeight && !Number.isNaN(dynamicHeight)) {
        nextScrollY -= dynamicHeight;
      }
      if (tableHead) {
        if (showHeader) {
          nextScrollY -= tableHead.getBoundingClientRect().height;
        }
      }
      if (pagination !== false) {
        nextScrollY -= 56;
      }
      if (headerForm) {
        const headerFormMargin = 16;
        const headerFormHeight = headerForm.getBoundingClientRect().height;
        nextScrollY -= headerFormMargin + headerFormHeight;
      }
      if (tableAction) {
        nextScrollY -= tableAction.getBoundingClientRect().height;
      }
      setScrollY(nextScrollY);
    }
  }, [wrapperRef, collapsed, formRef, showHeader, pagination, isFullscreen, height, dynamicHeight]);
  return scrollY;
};
