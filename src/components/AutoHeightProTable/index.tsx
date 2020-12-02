import { ParamsType } from '@ant-design/pro-provider';
import ProTable, { ProTableProps } from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import { useFullscreen } from 'ahooks';
import { useWindowSize } from 'react-use';
import { ColumnPropertyConfig } from '@/metadata/meta';
import useTableCount, {
  onCountSuccessType,
  TableCount,
  TableCountOptionsProps,
} from '@/hooks/useTableCount';
import { Badge } from 'antd';
import useScrollX from '@/hooks/useScrollX';
import useColumnState from '@/hooks/useColumnState';
import useScrollY from '@/hooks/useScrollY';
import { useHistory, useLocation } from 'react-router-dom';
import useInitialValues from '@/hooks/useInitialValues';
import useMenu from '@/hooks/useMenu';
import { GetRowKey } from 'antd/lib/table/interface';
import styles from './style.less';

export interface AutoHeightProTableProps<T = any, U extends ParamsType = {}>
  extends ProTableProps<T, U> {
  /**
   * 表格id，用于做各种缓存
   */
  id: string;

  /**
   * 动态计算的额外高度
   */
  dynamicHeight?: number;

  /**
   * 列
   */
  columns?: ColumnPropertyConfig<T>[];

  /**
   * 未设置width的column所需要的宽度
   */
  extraScrollX?: number;

  /**
   * 角标配置
   */
  menuOptions?: TableCountOptionsProps;

  /**
   * 是否要将参数写入url search
   */
  setParamsToRoute?: boolean;
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

export default <T, U extends ParamsType = {}>(props: AutoHeightProTableProps<T, U>) => {
  const {
    id: tableId,
    search,
    pagination,
    options,
    columns = [],
    dynamicHeight,
    extraScrollX = 0,
    request,
    menuOptions = {},
    toolbar = {},
    params = {},
    setParamsToRoute = false,
    form,
    rowSelection,
    onRow,
    ...rests
  } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [tabCount, setTabCount] = useState<TableCount>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string | number>>([]);
  const history = useHistory();
  const location = useLocation();
  const initialValues = useInitialValues(setParamsToRoute, form?.initialValues, columns);
  const initMenu = menuOptions?.defaultMenu ?? menuOptions?.menus?.first?.key ?? '';
  const [menu, setMenu] = useMenu(
    menuOptions?.menuKey,
    menuOptions?.menuFromRoute,
    initialValues,
    initMenu,
  );
  let tableParams = { ...params };
  if (menuOptions?.menuKey) {
    tableParams[menuOptions?.menuKey] = menu;
  }
  if (menuOptions?.paramsFormatter) {
    tableParams = {
      ...tableParams,
      ...menuOptions?.paramsFormatter(menu),
    };
  }
  const [columnsStateMap, setColumnsStateMap] = useColumnState(columns, tableId);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, { toggleFull }] = useFullscreen(wrapperRef);
  const { height } = useWindowSize();
  const scrollX = useScrollX([columns, columnsStateMap, extraScrollX]);
  const scrollY = useScrollY({
    wrapperRef,
    formCollapsed: collapsed,
    pagination,
    isFullscreen,
    height,
    dynamicHeight,
    selectedRowKeys,
  });

  const countOnSuccess: onCountSuccessType = (data) => {
    setTabCount(data);
    menuOptions?.onLoad?.(data);
  };
  const { run } = useTableCount({ ...menuOptions, onLoad: countOnSuccess });

  function onRowClick(
    record: T,
    index: number | undefined,
    rowKey: string | GetRowKey<T> | undefined,
    event: any,
  ) {
    if (rowKey && !(event.target as any).className.split(' ').contains('ant-checkbox-wrapper')) {
      const _rowKey = typeof rowKey === 'string' ? record[rowKey] : rowKey(record, index);
      if (selectedRowKeys.contains(_rowKey)) {
        setSelectedRowKeys(selectedRowKeys.remove(_rowKey));
      } else {
        setSelectedRowKeys([...selectedRowKeys, _rowKey]);
      }
    }
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <ProTable<T, U>
        columns={columns}
        pagination={pagination}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={setColumnsStateMap}
        params={tableParams as U}
        form={{
          initialValues,
          ...form,
        }}
        toolbar={{
          filter: false,
          menu: menuOptions?.menus
            ? {
                activeKey: menu,
                onChange: (activeKey = initMenu) => setMenu(activeKey),
                items: menuOptions.menus.map((i) => ({
                  key: i.key,
                  label: (
                    <span>
                      {i.label}
                      {renderBadge(tabCount[i.key])}
                    </span>
                  ),
                })),
              }
            : undefined,
          ...toolbar,
        }}
        request={
          request
            ? async (finalParams, sort, filter) => {
                if (setParamsToRoute) {
                  const urlParasm = Object.keys(finalParams).reduce((pre, queryKey) => {
                    if (finalParams[queryKey]) {
                      pre.append(queryKey, finalParams[queryKey].toString());
                    }
                    return pre;
                  }, new URLSearchParams());
                  history.replace(`${location.pathname}?${urlParasm.toString()}`);
                }
                run(finalParams);
                return request(finalParams, sort, filter);
              }
            : undefined
        }
        rowSelection={
          rowSelection
            ? {
                ...rowSelection,
                selectedRowKeys,
                onChange: (keys, rows) => {
                  setSelectedRowKeys(keys);
                  rowSelection.onChange?.(keys, rows);
                },
              }
            : undefined
        }
        options={{
          fullScreen: toggleFull,
          setting: true,
          reload: true,
          density: true,
        }}
        search={
          search
            ? {
                ...search,
                collapsed,
                onCollapse: (val) => {
                  setCollapsed(val);
                  search.onCollapse?.(val);
                },
              }
            : search
        }
        scroll={{
          scrollToFirstRowOnChange: true,
          y: scrollY,
          x: scrollX,
        }}
        onRow={(record, index) => {
          return onRow
            ? {
                ...onRow(record, index),
                onClick: rowSelection
                  ? (e) => {
                      onRowClick(record, index, rests.rowKey, e);
                      onRow(record, index).onClick?.(e);
                    }
                  : onRow(record, index).onClick,
              }
            : {
                onClick: rowSelection
                  ? (e) => {
                      onRowClick(record, index, rests.rowKey, e);
                    }
                  : undefined,
              };
        }}
        {...rests}
      />
    </div>
  );
};
