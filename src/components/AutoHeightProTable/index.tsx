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
import { ListToolBarMenuItem } from '@ant-design/pro-table/lib/component/ListToolBar/HeaderMenu';
import useScrollX from '@/hooks/useScrollX';
import useColumnState from '@/hooks/useColumnState';
import useScrollY from '@/hooks/useScrollY';
import { useHistory, useLocation } from 'react-router-dom';
import useInitialValues from '@/hooks/useInitialValues';
import useInitMenu from '@/hooks/useInitMenu';
import styles from './style.less';

interface Props<T, U extends ParamsType = {}> extends ProTableProps<T, U> {
  id: string; // 表格id，用于做各种缓存
  dynamicHeight?: number; // 动态计算的额外高度
  columns?: ColumnPropertyConfig<T>[];
  extraScrollX?: number; // 未设置width的column所需要的宽度
  countOptions?: TableCountOptionsProps<U>; // 角标配置
  menus?: ListToolBarMenuItem[]; // 表格tabs数组
  defaultMenu?: string; // 默认tab
  tabKey?: string; // tab 在接口中代表的参数
  tabParamsFormatter?: (tab: React.Key) => ParamsType; // tab的参数转换
  setParamsToSearch?: boolean; // 是否要将参数写入url search
  tabFromSearch?: (value: any) => string | undefined; // 从 url search 转换出tab
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
    id: tableId,
    formRef,
    search,
    showHeader = true,
    pagination,
    options,
    columns = [],
    dynamicHeight,
    extraScrollX = 0,
    request,
    countOptions = {},
    toolbar = {},
    menus = [],
    defaultMenu,
    params = {},
    tabKey,
    tabParamsFormatter,
    tabFromSearch,
    setParamsToSearch: setParamsToRoute = false,
    form,
    ...rests
  } = props;
  const [collapsed, setCollapsed] = useState(true);
  // 每次初始化时的默认menu，后续很可能跟在route后，做到参数的缓存
  const [tabCount, setTabCount] = useState<TableCount>({});
  const history = useHistory();
  const location = useLocation();
  const initialValues = useInitialValues(setParamsToRoute, form?.initialValues, columns);
  const initMenu = defaultMenu ?? menus.first?.key ?? '';
  const [tab, setTab] = useInitMenu(tabKey, tabFromSearch, initialValues, initMenu);
  let tableParams = { ...params };
  if (tabKey) {
    tableParams[tabKey] = tab;
  }
  if (tabParamsFormatter) {
    tableParams = {
      ...tableParams,
      ...tabParamsFormatter(tab),
    };
  }
  const [columnsStateMap, setColumnsStateMap] = useColumnState(columns, tableId);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, { toggleFull }] = useFullscreen(wrapperRef);
  const { height } = useWindowSize();
  const scrollX = useScrollX([columns, columnsStateMap, extraScrollX]);
  const scrollY = useScrollY([
    wrapperRef,
    collapsed,
    formRef,
    showHeader,
    pagination,
    isFullscreen,
    height,
    dynamicHeight,
  ]);

  const countOnSuccess: onCountSuccessType = (data) => {
    setTabCount(data);
    countOptions?.onLoad?.(data);
  };
  const { run } = useTableCount<U>({ ...countOptions, onLoad: countOnSuccess });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <ProTable<T, U>
        formRef={formRef}
        columns={columns}
        showHeader={showHeader}
        pagination={pagination}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={setColumnsStateMap}
        params={tableParams as U}
        onLoad={(data) => {
          console.log('onLoad', data);
        }}
        form={{
          initialValues,
          ...form,
        }}
        toolbar={{
          filter: false,
          menu: {
            activeKey: tab,
            onChange: (activeKey = initMenu) => setTab(activeKey),
            items: menus.map((i) => ({
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
      />
    </div>
  );
}

export default AutoHeightProTable;
