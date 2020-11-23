import { ParamsType } from '@ant-design/pro-provider';
import ProTable, { ColumnsState, ProTableProps } from '@ant-design/pro-table';
import React, { useEffect, useRef, useState } from 'react';
import { useFullscreen } from 'ahooks';
import { useWindowSize } from 'react-use';
import { ColumnPropertyConfig } from '@/metadata/meta';
import useTableCount, { TableCount, TableCountOptionsProps } from '@/hooks/useTableCount';
import { Badge } from 'antd';
import { ListToolBarMenuItem } from '@ant-design/pro-table/lib/component/ListToolBar/HeaderMenu';
import styles from './style.less';

export interface ColumnShow {
  [key: string]: ColumnsState;
}

interface Props<T, U extends ParamsType = {}> extends ProTableProps<T, U> {
  dynamicHeight?: number; // 动态计算的额外高度
  columns?: ColumnPropertyConfig<T>[];
  extraScrollX?: number; // 未设置width的column所需要的宽度
  countOptions?: Pick<TableCountOptionsProps<U>, 'api' | 'paramsFormatter'>; // 角标配置
  tabs?: ListToolBarMenuItem[]; // 表格tabs数组
}

const renderBadge = (count: number) => {
  return (
    <Badge
      count={count}
      style={{
        marginTop: -4,
        marginLeft: 4,
        color: '#999',
        backgroundColor: '#eee',
      }}
    />
  );
};

function AutoHeightProTable<T, U extends ParamsType = {}>(props: Props<T, U>) {
  const {
    formRef,
    search,
    showHeader = true,
    pagination,
    options,
    columns,
    dynamicHeight,
    extraScrollX = 0,
    request,
    countOptions = {},
    toolbar = {},
    tabs = [],
    ...rests
  } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [tab, setTab] = useState<React.Key>('todo');
  const [tabCount, setTabCount] = useState<TableCount>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [scrollX, setScrollX] = useState<string | number>('100%');
  const initColumnShow: ColumnShow = {};
  if (columns) {
    columns.forEach((i) => {
      if (i.show === false) {
        initColumnShow[i.dataIndex!.toString()] = {
          show: false,
        };
      }
    });
  }
  const [columnsStateMap, setColumnsStateMap] = useState<ColumnShow>(initColumnShow);
  const [isFullscreen, { toggleFull }] = useFullscreen(wrapperRef);
  const { run } = useTableCount<U>({ ...countOptions, onSuccess: setTabCount });
  const { height } = useWindowSize();
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

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <ProTable<T, U>
        formRef={formRef}
        columns={columns}
        showHeader={showHeader}
        pagination={pagination}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={(map) => setColumnsStateMap(map)}
        toolbar={{
          filter: false,
          menu: {
            activeKey: tab,
            onChange: (activeKey = 'todo') => setTab(activeKey),
            items: tabs.map((i) => ({
              key: i.key,
              label: (
                <span>
                  {i.label}
                  {renderBadge(tabCount[i.key])}
                </span>
              ),
            })),
          },
          ...toolbar,
        }}
        request={
          request
            ? async (params, sort, filter) => {
                run(params);
                return request(params, sort, filter);
              }
            : undefined
        }
        options={{
          fullScreen: toggleFull,
          setting: true,
          reload: true,
          density: true,
        }}
        {...rests}
        search={
          search
            ? {
                ...search,
                collapsed,
                onCollapse: (val) => {
                  setCollapsed(val);
                  if (search.onCollapse) {
                    search.onCollapse(val);
                  }
                },
              }
            : search
        }
        scroll={{
          scrollToFirstRowOnChange: true,
          y: scrollY,
          x: scrollX,
        }}
      />
    </div>
  );
}

export default AutoHeightProTable;
