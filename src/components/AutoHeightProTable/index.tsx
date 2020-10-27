import { ParamsType } from '@ant-design/pro-provider';
import ProTable, { ProTableProps } from '@ant-design/pro-table';
import React, { useEffect, useRef, useState } from 'react';

function AutoHeightProTable<T, U extends ParamsType = {}>(props: ProTableProps<T, U>) {
  const { formRef, search, showHeader = true, ...rests } = props;

  const [collapsed, setCollapsed] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [wrapperH, setWrapperH] = useState<string>('100%');

  // 根据页面高度动态设置表格垂直出现滚动的高度
  useEffect(() => {
    if (wrapperRef.current) {
      const headerForm = wrapperRef.current.querySelector('.ant-pro-table-search');
      const tableHead = wrapperRef.current.querySelector('.ant-table-thead');
      const tableAction = wrapperRef.current.querySelector('.ant-pro-table-list-toolbar');
      const wrapperHeight = wrapperRef.current.getBoundingClientRect().height;
      setWrapperH(`${wrapperHeight}px`);
      let nextScrollY = wrapperHeight;
      if (tableHead) {
        nextScrollY -= tableHead.getBoundingClientRect().height;
        if (showHeader) {
          nextScrollY -= 56;
        }
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
  }, [wrapperRef, formRef, collapsed, showHeader]);
  console.log('scrollY', scrollY);
  return (
    <div ref={wrapperRef} style={{ height: wrapperH }}>
      <ProTable<T, U>
        formRef={formRef}
        showHeader={showHeader}
        {...rests}
        search={search ? {
          ...search,
          collapsed,
          onCollapse: (val) => {
            if (search.onCollapse) {
              search.onCollapse(val);
            }
            setCollapsed(val);
          },
        } : search}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: scrollY,
        }}
      />
    </div>
  );
}

export default AutoHeightProTable;
