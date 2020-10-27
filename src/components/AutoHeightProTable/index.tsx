import { ParamsType } from '@ant-design/pro-provider';
import ProTable, { ProTableProps } from '@ant-design/pro-table';
import React, { useEffect, useRef, useState } from 'react';
import { useFullscreen } from 'ahooks';
import { useWindowSize } from 'react-use'
import styles from './style.less';

interface Props<T, U extends ParamsType = {}> extends ProTableProps<T, U> {

}

function AutoHeightProTable<T, U extends ParamsType = {}>(props: Props<T, U>) {
  const { formRef, search, showHeader = true, pagination, options, ...rests } = props;
  const [collapsed, setCollapsed] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [isFullscreen, { toggleFull }] = useFullscreen(wrapperRef);
  const {height} = useWindowSize();
  useEffect(() => {
    if (wrapperRef.current) {
      const headerForm = wrapperRef.current.querySelector('.ant-pro-table-search');
      const tableHead = wrapperRef.current.querySelector('.ant-table-thead');
      const tableAction = wrapperRef.current.querySelector('.ant-pro-table-list-toolbar');
      const wrapperHeight = isFullscreen ? height : wrapperRef.current.getBoundingClientRect().height;
      let nextScrollY = wrapperHeight;
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
  }, [wrapperRef, formRef, collapsed, showHeader, pagination, isFullscreen, height]);
  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <ProTable<T, U>
        formRef={formRef}
        showHeader={showHeader}
        pagination={pagination}
        options={{
          fullScreen: toggleFull,
          setting: true,
          reload: true,
          density: true
        }}
        {...rests}
        search={search ? {
          ...search,
          collapsed,
          onCollapse: (val) => {
            setCollapsed(val);
            if (search.onCollapse) {
              search.onCollapse(val);
            }
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
